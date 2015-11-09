var UI = require('ui');
var ajax = require('ajax');
var vibe = require('ui/vibe');
var Vector2 = require('vector2');

var device_name = "Dog Feeder";


console.log(device_name + " app started");


var main_window = new UI.Window();


//static text for buttons
var txtOpenLabel = new UI.Text({
    position: new Vector2(0, 20),
    size: new Vector2(144, 30),
    font: 'Gothic 24',
    text: 'CW',
    textAlign: 'right',
    color: 'white'
});

var txtCloseLabel = new UI.Text({
    position: new Vector2(0, 105),
    size: new Vector2(144, 30),
    font: 'Gothic 24',
    text: 'CCW',
    textAlign: 'right',
    color: 'white'
});

var txtUpdateLabel = new UI.Text({
    position: new Vector2(0, 62),
    size: new Vector2(144, 30),
    font: 'Gothic 24',
    text: 'State',
    textAlign: 'right',
    color: 'white'
});

var txtHeaderLabel = new UI.Text({
    position: new Vector2(0, 0),
    size: new Vector2(144, 30),
    font: 'Gothic 18',
    text: 'Dog Feeder',
    textAlign: 'center',
    color: 'white'
});

var txtFooterLabel = new UI.Text({
    position: new Vector2(0, 130),
    size: new Vector2(144, 30),
    font: 'Gothic 18',
    text: 'Feed Fido',
    textAlign: 'center',
    color: 'white'
});




//initialization
UpdateMain('started');

//***************************
//*** FUNCTIONS *************
  

function UpdateMain(message){
  main_window.each(function(element) {
    main_window.remove(element);
  });
  main_window.each(function(element) {
    main_window.remove(element);
  });

  main_window.backgroundColor('black');

  var txtStatus = new UI.Text({
    position: new Vector2(5, 62),
    size: new Vector2(144, 10),
    font: 'Gothic 28 Bold',
    text: message,
    textAlign: 'left',
    color: 'white'
  });
  
  main_window.add(txtHeaderLabel);
  main_window.add(txtOpenLabel);
  main_window.add(txtStatus);
  main_window.add(txtUpdateLabel);  
  main_window.add(txtCloseLabel);
  main_window.add(txtFooterLabel);
   
  
  main_window.show();
}

function DoFeed(function_name,function_value){
  console.log("DoPost(): " + new Date().getTime());  
  
  //display card
  UpdateMain("Attempt");
  
  //make url based on function being called and device tokens
  var URL = 'http://[Your nodemcu url]/?pin=';
  
  //log data being used
  console.log("function_name: " + function_name);
  console.log("function_value: " + function_value);
  console.log("URL: " + URL);
  
  ajax(
    {
      type: "GET",
      url: URL + function_value,      
      success: function(data) {
      // Success
      console.log("Success: " + JSON.stringify(data));
      vibe.vibrate('short');
      // Show to user
      if(data.return_value===0){
        UpdateMain("Ready"); 
      }else if(data.return_value==1){
        UpdateMain("Ready");      
      }else{
        UpdateMain("UNKN:" + data.return_value);      
      } 
    }
    });  
  console.log("Comleted DoPost(): " + new Date().getTime());  
  UpdateMain("Ready");
}


//BUTTON ACTIONS
main_window.on('click', 'up', function(e) {
  console.log("click up");
  DoFeed('Clockwise','ON1');
});

main_window.on('click', 'down', function(e) {
  console.log("click up");
  DoFeed('State','ON2');
});


main_window.on('click', 'select', function(e) {
  console.log("click select");
  DoFeed('State','ON1');
});
