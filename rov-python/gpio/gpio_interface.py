from utilities import is_in_docker, is_raspberry_pi

OUTPUT_PIN_MODE = 0
INPUT_PIN_MODE = 1
if is_raspberry_pi() and not is_in_docker():
    try:
        import pigpio
        from gpio.pigpio_gpio_controller import Pigpio_GPIO_Controller
        GPIO_ctrl = Pigpio_GPIO_Controller()
        OUTPUT_PIN_MODE = pigpio.OUTPUT
        INPUT_PIN_MODE = pigpio.INPUT
    except ImportError:
        from gpio.rpio_gpio_controller import Rpio_GPIO_Controller
        GPIO_ctrl = Rpio_GPIO_Controller()
else:
    from gpio.mock_gpio_controller import Mock_GPIO_Controller
    GPIO_ctrl = Mock_GPIO_Controller()
