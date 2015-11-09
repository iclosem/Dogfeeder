dash_button=require('node-dash-button');
var dash=dash_button("[Insert Mac Address Here]");
var request=require("request");
dash.on("detected", function(){
        console.log("feed button detected");
        request("http://192.168.29.216/?pin=ON1", function(error, response, body) {
        console.log(body);
        });
});
