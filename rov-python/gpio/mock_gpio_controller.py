import asyncio


class Mock_GPIO_Controller:

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
