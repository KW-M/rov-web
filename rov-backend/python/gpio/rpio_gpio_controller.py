import asyncio
import RPIO
from RPIO import PWM

class Rpio_GPIO_Controller:

    def init(self):
        self.servo = PWM.Servo()
        self.stopped = False

    async def maintain_connection(self):
        while True:
            if self.stopped:
                break
            await asyncio.sleep(1)

    def set_pin_mode(self,pin_num: int, mode: int):
        RPIO.setup(pin_num, mode)

    def set_pin_high(self,pin_num: int):
        RPIO.output(pin_num, 1)

    def set_pin_low(self,pin_num: int):
        RPIO.output(pin_num, 0)

    def set_pin_pwm(self,pin_num: int, duty_cycle: int):
        self.servo.set_servo(pin_num, duty_cycle)

    def cleanup(self):
        """ Function to shut down the current pigpio instance. useful when turning off / exiting the rov program"""
        self.stopped = True
