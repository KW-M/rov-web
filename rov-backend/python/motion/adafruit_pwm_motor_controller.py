import logging
from gpio_interface import OUTPUT_PIN_MODE, GPIO_ctrl

###### setup logging #######
log = logging.getLogger(__name__)


class Adafruit_Pwm_Motor:
    """ for the Adafruit drv8871 single motor controller
    pin_in1: the raspberry pi pin going to in1 pin on the motor controller
    pin_in2: the raspberry pi pin going to in2 pin on the motor controller
    pigpio_instance: the pigpio library instance to use to drive the pwm / gpio signals from the pi
    """
    def __init__(self, pin_in1, pin_in2):
        self.pin_in1 = pin_in1
        self.pin_in2 = pin_in2
        GPIO_ctrl.set_pin_mode(self.pin_in1, OUTPUT_PIN_MODE)
        GPIO_ctrl.set_pin_mode(self.pin_in2, OUTPUT_PIN_MODE)
        self.set_speed(0) # Halt pwm / motor

    def set_speed(self, speed):
        """
        speed: the speed of the motor between -1 (full reverse) and 1 (full forward)
        """
        # https://abyz.me.uk/rpi/pigpio/python.html#set_PWM_dutycycle
        if (speed > 0):
            # 254 because 255 means breaking mode on the drv8871
            GPIO_ctrl.set_pin_low(self.pin_in1)  # pin LOW (off) # for real motor control these should be high?? becuz active breaking or something?
            GPIO_ctrl.set_pin_pwm(self.pin_in2, int(min(speed, 1) * 254)) # cap speed at 254 (max)
        elif (speed < 0):
             # cancel out negative speed value & cap speed at 254 (max)
            GPIO_ctrl.set_pin_pwm(self.pin_in1, int(min(-speed, 1) * 254))
            GPIO_ctrl.set_pin_low(self.pin_in2)  # pin LOW (off) # for real motor control these should be high?? becuz active breaking or something?
        else:
            GPIO_ctrl.set_pin_low(self.pin_in1)  # pin LOW (off)
            GPIO_ctrl.set_pin_low(self.pin_in2)  # pin LOW (off)
