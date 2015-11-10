# Dogfeeder
<h3>Introduction</h3>
This is an automated dog feeder that uses a NodeMCU(Based on ESP8266) Lua DevKit to drive a Parallax Continuous Rotation Servo.  The NodeMCU Devkit drives the servo and has a mini web server that's always running on it.  Any get request to the chip with proper parameters can activate the servo.  This opens up the ability to turn on the dog feeder with a hacked amazon dash button, openhab, Tasker(android), or pebble watch.

<h3>Setup</h3>
I originally follow the setup by Dave Bryan at: http://drstrangelove.net/2013/12/raspberry-pi-power-cat-feeder-updates/ 
I made some changes for myself:<br>
-I switched it to the NodeMCU devkit because it was a lot cheaper ($4 on aliexpress.com) <br>
-I felt the raspberry pi was a bit overpowered and I would rather use it for other stuff (see below)<br>
-I used the raspberry pi to host an openhab server for home automation instead as well as hosting the nodejs script that listens for ARP requests from the dash button.<br>
<h4>Parts</h4>
-NodeMCU Lua Devkit - $4-$6 on aliexpress<br>
-Cereal Dispenser: http://www.amazon.com/Rosseto-EZ-SERV100-5-Gallon-Cereal-Dispenser/dp/B001LK792A/ref=pd_sim_79_2?ie=UTF8&dpID=41pck-gsGXL&dpSrc=sims&preST=_AC_UL160_SR107%2C160_&refRID=1C7RVGAM907F6YS5B3P9  (After building this I realized that there were other alternatives such as wall-mounted cereeal dispensers for cheaper prices).<br>
-raspberry pi (optional) - to host the nodejs script.  You can also use any computer that's always on.<br>
-Amazon Dash button (optional)<br>
-Pebble Watch (optional)<br>
-Tasker for Android (optional)<br>

1) Connect your nodemcu devkit by usb to your computer.<br>
2) Install the drivers and flash the firmware.  Instructions are here:<br> http://www.electrodragon.com/w/ESP8266_NodeMCU_Dev_Board
Nodemcu flasher: https://github.com/nodemcu/nodemcu-flasher<br>
3) Install Esplorer: http://esp8266.ru/esplorer/<br>
4) When you open Esplorer click on the Open button on the right as well as DTR and RTS.  Baudrate should be 9600.  Make sure you're on the right com port.  (COM5 for me).  You should see something that says "Port Open 9600 Communication with MCU... Got Answer! AutoDetect firmware..."  You may get some error messages and gibberish but the main thing is a connection has been established.<br>
5) To test it you can paste in (on the left window):

wifi.setmode(wifi.STATION)<br>
wifi.sta.config("[Insert SSID here]", "[Inser Wifi Pass here]")<br>

Then click Send to Esp on the bottom

Then erase everything and paste in:

print(wifi.sta.getip())

Your assigned ip address should show up.  If "nil" shows up, try running "print(wifi.sta.getip())" again (sometimes there's a lag time) and if it still gives you "nil" then there may be something wrong with your network credentials.

6) Create a New file in Esplorer and paste in the contents of "init.lua" (in the NodeMCU directory) and click save to esp.  This will setup a webserver on your nodemcu and you'll be able to see it at: http://your.nodemcu.ip.address

7) To get the servo hooked up paste in the contents of "servo.lua" (in the NodeMCU directory) into a new file and save it as "servo.lua"

8) On the Parallax Rotation Servo connect the black wire to Ground, Red wire to Power, and the White Wire to Pin 4.

9) Navigate to the website http://yournodemcuipaddress and click either "ON" button and the servo should spin.

Amazon Dash Setup (A little glitchy does not always work 100%):<br>
1) follow the instructions at: https://github.com/hortinstein/node-dash-button to install the node-dash-button module  
Follow the example to get the mac address of your dash button.<br>
2) Create a new .js file - sudo nano feeddash.js<br>
3) Paste in the contents of the feeddash.js file (In the Raspberry Pi directory- don't forget to put in your mac address)<br>
4) You can have it run in the background using this command: nohup sudo node feeddash.js &<br>

Pebble Watch setup:<br>
1) Setup an account at cloudpebble.net<br>
2) Create a new project, name it whatever you want, and select pebble.js for the project type<br>
3) paste in the contents of app.js into the app.js file. (Don't forget to set your url/ip on line 108)<br>
4) Click the run button on the top right.  (make sure it runs on phone and enable developer connection on your phone's pebble app)

Tasker setup:<br>
1) Create a new task <br>
2) Create a new Action and select Net -> HTTP Get<br>
3) Under server put in http://YourNodeMcuIp/?pin=ON1<br>
4) Assign any Profile to work with this.  I use the autovoice pro plugin so I can "ok google feed the dog" and it feeds the dog.
