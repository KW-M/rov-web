import asyncio
import pigpio

from utilities import is_raspberry_pi

class GPIOController:

    def init(self):
        self.pigpio_instance = pigpio.pi()
        self.stopped = False

    async def maintain_connection(self):
        while True:
            if self.stopped:
                break
            if not self.pigpio_instance.connected:
                self.pigpio_instance.stop()
                self.init()
            await asyncio.sleep(1)

    def set_pin_mode(self,pin_num: int, mode: int):
        self.pigpio_instance.set_mode(pin_num, mode)

    def set_pin_high(self,pin_num: int):
        self.pigpio_instance.write(pin_num, 1)

    def set_pin_low(self,pin_num: int):
        self.pigpio_instance.write(pin_num, 0)

    def set_pin_pwm(self,pin_num: int, duty_cycle: int):
        self.pigpio_instance.set_PWM_dutycycle(pin_num, duty_cycle)

    def set_pin_pwm_freq(self,pin_num: int, frequency: int):
        self.pigpio_instance.set_PWM_frequency(pin_num, frequency)

    def cleanup(self):
        """ Function to shut down the current pigpio instance. useful when turning off / exiting the rov program"""
        self.stopped = True
        self.pigpio_instance.stop()

class Mock_GPIOController:

    def init(self):
        pass

    async def maintain_connection(self):
        while True:
            await asyncio.sleep(1)

    def set_pin_mode(self,pin_num: int, mode: int):
       pass

    def set_pin_high(self,pin_num: int):
        pass

    def set_pin_low(self,pin_num: int):
        pass

    def set_pin_pwm(self,pin_num: int, duty_cycle: int):
        pass

    def set_pin_pwm_freq(self,pin_num: int, frequency: int):
        pass

    def cleanup(self):
        pass


OUTPUT_PIN_MODE = pigpio.OUTPUT
INPUT_PIN_MODE = pigpio.INPUT
if is_raspberry_pi():
    GPIO_ctrl = GPIOController()
else:
    GPIO_ctrl = Mock_GPIOController()
