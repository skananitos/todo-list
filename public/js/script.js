$(document).ready(function() {
var max_fields      = 10; //maximum input boxes allowed
var wrapper   		= $(".input_fields_wrap"); //Fields wrapper
var add_button      = $(".add_field_button"); //Add button ID

var x = 1; //initlal text box count
$(add_button).click(function(e){ //on add input button click
e.preventDefault();
    if(x < max_fields){ //max input box allowed
        x++; //text box increment
        $(wrapper).append('<div class="input_fields_wrap"><input type="text" name="content" placeholder="Type the name of your task..." required><button class="remove_field"><span class="fa fa-remove"></span></button><br/><br/></div>'); //add input box
    }
});

$(wrapper).on("click",".remove_field", function(e){ //user click on remove text
    e.preventDefault(); $(this).parent('div').remove(); x--;
    })
});