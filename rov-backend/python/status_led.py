import logging
from gpio_interface import GPIO_ctrl, OUTPUT_PIN_MODE

###### setup logging #######
log = logging.getLogger(__name__)

class StatusLedController:
    """
    led_pin: The number of the raspberry pi pin going to the positive side of the led
    """

    def init(self, led_pin: int = 21):
        self.led_pin = led_pin
        GPIO_ctrl.set_pin_mode(self.led_pin, OUTPUT_PIN_MODE)
        self.off()

    def on(self):
        GPIO_ctrl.set_pin_high(self.led_pin)  # pin HIGH (on)

    def off(self):
         GPIO_ctrl.set_pin_low(self.led_pin)  # pin LOW (off)

status_led_ctrl = StatusLedController()
