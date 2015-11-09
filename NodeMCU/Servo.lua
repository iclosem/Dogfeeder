function spinClockwise()
    gpio.mode(4, gpio.OUTPUT)
    for i=50,1,-1
        do
            gpio.write(4, gpio.HIGH)
            tmr.delay(900)
            gpio.write(4, gpio.LOW)
            tmr.delay(20000)
        end
    for i=10,1,-1
        do
            gpio.write(4, gpio.HIGH)
            tmr.delay(2100)
            gpio.write(4, gpio.LOW)
            tmr.delay(20000)
        end
    for i=50,1,-1
        do
            gpio.write(4, gpio.HIGH)
            tmr.delay(900)
            gpio.write(4, gpio.LOW)
            tmr.delay(20000)
        end
end
function spinCClockwise()
    gpio.mode(4, gpio.OUTPUT)
    for i=50,1,-1
        do
            gpio.write(4, gpio.HIGH)
            tmr.delay(2100)
            gpio.write(4, gpio.LOW)
            tmr.delay(20000)
        end
    for i=10,1,-1
        do
            gpio.write(4, gpio.HIGH)
            tmr.delay(900)
            gpio.write(4, gpio.LOW)
            tmr.delay(20000)
        end
    for i=50,1,-1
        do
            gpio.write(4, gpio.HIGH)
            tmr.delay(2100)
            gpio.write(4, gpio.LOW)
            tmr.delay(20000)
        end
end
