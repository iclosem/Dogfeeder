wifi.setmode(wifi.STATION)
wifi.sta.config("[Insert SSID Here]", "[Insert Wifi Password Here]")
print(wifi.sta.getip())
require("servo")
srv=net.createServer(net.TCP)
srv:listen(80,function(conn)
    conn:on("receive", function(client,request)
        local buf = "";
        local _, _, method, path, vars = string.find(request, "([A-Z]+) (.+)?(.+) HTTP");
        if(method == nil)then
            _, _, method, path = string.find(request, "([A-Z]+) (.+) HTTP");
        end
        local _GET = {}
        if (vars ~= nil)then
            for k, v in string.gmatch(vars, "(%w+)=(%w+)&*") do
                _GET[k] = v
            end
        end
        buf = buf.."<h1> ESP8266 Web Server</h1>";
        buf = buf.."<p>Clockwise<a href=\"?pin=ON1\"><button>ON</button></a></p>";
        buf = buf.."<p>Counter Clockwise <a href=\"?pin=ON2\"><button>ON</button></a></p>";
        local _on,_off = "",""
        if(_GET.pin == "ON1")then
              spinClockwise()
        elseif(_GET.pin == "ON2")then
              spinCClockwise();
        end
        client:send(buf);
        client:close();
        collectgarbage();
    end)
end)
