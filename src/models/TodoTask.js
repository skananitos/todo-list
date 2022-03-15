const mongoose = require('mongoose');
var attachments = require('mongoose-attachments-aws2js');

const todoTaskSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			maxLength: 2048
		}
	}
);

// The following code extends the 'todoTaskSchema' model to use attachments with a property called 'image' and three different styles.
// todoTaskSchema.plugin(attachments, {
  // directory: 'achievements',
  // storage: {
    // providerName: 'aws2js',
    // options: {
      // key: '<key>',
      // secret: '<secret>',
      // bucket: '<bucket>'
    // }
  // },
  // properties: {
    // image: {
      // styles: {
        // original: {
          // // keep the original file
        // },
        // small: {
          // resize: '150x150'
        // },
        // medium: {
          // resize: '120x120'
        // },
        // medium_jpg: {
          // '$format': 'jpg' // this one changes the format of the image to jpg
        // }
      // }
    // }
  // }
// });

const todoTaskListSchema = new mongoose.Schema(
	{
		name: {type: String},
		tasks: [todoTaskSchema]
	}
);
module.exports = mongoose.model('TodoTaskItem',todoTaskSchema);
module.exports = mongoose.model('TodoTask',todoTaskListSchema);