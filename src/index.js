// Initializing the Server
const debug =require('debug')('server:debug');
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = express.Router();

process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
var config = require('config');

//models
const TodoTask = require("./models/TodoTask");
const TodoTaskItem = require("./models/TodoTask");

//attachments
var attachments = require('mongoose-attachments-localfs');

dotenv.config();

// access the css
app.use("/static",express.static("public"));

app.use(express.urlencoded({ extended: true }));

//connection to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {	
	console.log("Connected to db!");	
	app.listen(3000, () => {
		console.log("Server Up and running");
	});
});

// view engine configuration [views for front-end development]
app.set("view engine", "ejs");

//Load landing page
app.get('/',(req, res) => {
	 TodoTask.find({}, (err, tasks) => {
		if(err) throw err;
		res.render("index.ejs", { todoTasks: tasks });		
	 });
});

//CREATE Task List 
app.post('/',async (req, res) => {
	const todoTask = new TodoTask({
		name: req.body.content[0],
		tasks: []		
	});
	var todoTaskItem = new TodoTaskItem({
		name: ""
	});
	
	for (var i=1; i < req.body.content.length; i++) {
		todoTaskItem = {"name" : req.body.content[i]};
		// console.log(todoTaskItem);
		todoTask.tasks.push(todoTaskItem);
	}
	// console.log(todoTask);
	
	try {
		await todoTask.save();
		res.redirect("/");
	} catch (err) {
		res.redirect("/");
		console.log(err);
	}
});

//DELETE Task List
app.route("/remove/:id").get((req, res) => {
	const id = req.params.id;
	TodoTask.findByIdAndRemove(id, err => {
		if (err) return res.send(500, err);
		res.redirect("/");
	});
});

//DELETE Task Element
app.route("/remove-element/:id").get((req, res) => {
	const id = req.params.id;
	
	TodoTask.updateOne({},{ "$pull": { "tasks": { "_id": id } } }, function(err, numAffected) { 
        if(err){
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});	

//ADD Task Element
app.route("/add-element/:id").post((req, res) => {	
	TodoTask.updateOne({"_id": req.params.id},{ "$push": { "tasks": { "name" : req.body.content } } }, function(err, numAffected) { 
        if(err){
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

// Post with attachment
// app.route("/add-element/:id").post((req, res, next) => {
	// TodoTask.title = req.body.title;
	// TodoTask.description = req.body.description;	
	// TodoTask.updateOne({"_id": req.params.id},{ "$push": { "tasks": { "name" : req.body.content } } }, function(err, numAffected) { 
        // if(err){
            // console.log(err);
        // } else {
			// TodoTask.attach('image', { "tasks": { "attachments" : req.files.image } }, function(err) {
				// if(err) return next(err);
				// TodoTask.save(function(err) {
					// if(err) return next(err);
					// res.send('A new task item has been saved with an attached file!');
				// });
			// })
            // res.redirect("/");
        // }
    // });
// });		


//UPDATE Task Element
app
	.route("/edit-element/:id")
	.get((req, res) => {
		TodoTask.find({}, (err, tasks) => {
			res.render("todoEdit.ejs", { todoTasks: tasks, itemID: req.params.id });
		});
	})
	.post((req, res) => {
	TodoTask.updateOne({"tasks._id": req.params.id},  {"$set": {"tasks.$.name" : req.body.content }}, { upsert : true, returnNewDocument: true }, function(err, numAffected) { 
			if(err){
				console.log(err);
			} else {
				res.redirect("/");
			}
		});
});