import asyncio
import logging

from config_reader import rov_config
from protobufs.rov_actions_proto import Measurement, SensorMeasurmentTypes #mock
from sensors.generic_sensor import GenericSensor
from utilities import is_raspberry_pi

all_possible_sensors: list[GenericSensor] = []
if is_raspberry_pi():
    from sensors.pressure import pressure_temp_sensor
    from sensors.compass import fused_compass_sensor
    all_possible_sensors = [fused_compass_sensor, pressure_temp_sensor]

###### setup logging #######
log = logging.getLogger(__name__)


class SensorController:

    connected_sensors: list[GenericSensor] = []

    def init(self):
        pass

    async def sensor_setup_loop(self):
        log.info("Setting Up Sensors...")
        enabledSensors = rov_config.get("EnabledSensors", [])
        self.connected_sensors = list(filter(lambda sensor: sensor.sensor_name in enabledSensors, all_possible_sensors))
        sensor_tasks = [sensor.start_sensor_loop() for sensor in self.connected_sensors]
        await asyncio.gather(*sensor_tasks)

    def get_sensor_updates(self):
        sensor_updates = []
        for sensor in self.connected_sensors:
            for i, measurement in enumerate(sensor.measurements):
                if sensor.measurement_updated_flags[i]:
                    # print("sensor update: ", i, measurement.measurement_type, measurement.value)
                    sensor.measurement_updated_flags[i] = False
                    sensor_updates.append(measurement)
        return sensor_updates

    def get_all_sensor_values(self):
        sensor_updates = []
        for sensor in self.connected_sensors:
            for measurement in sensor.measurements:
                sensor_updates.append(measurement)
        return sensor_updates

    def mock_get_all_sensor_values(self):
        mock_sensor_updates = []
        # spoof measurement
        mock_sensor_updates = [Measurement(SensorMeasurmentTypes.yaw_degrees, 10), Measurement(SensorMeasurmentTypes.pitch_degrees, 76), Measurement(SensorMeasurmentTypes.roll_degrees, 110), Measurement(SensorMeasurmentTypes.internal_temp_celsius, 9.2)]
        return mock_sensor_updates
        

    def cleanup(self):
        for sensor in self.connected_sensors:
            sensor.cleanup()

    # def get_sensor_column_names(self):
    #     output_column_names = ['date_time']

    # def get_sensor_values_row(self):
    #     rowString = ""
    #     for sensor in all_sensors:
    #         self.current_sensor_state[sensor.sensor_name] = sensor.measured_values

    # def update_all_sensors(self):
    #     for sensor in all_sensors:
    #         if(sensor.sensor_value_changed_flag.is_set()):
    #             sensor.sensor_value_changed_flag.clear()

    #                 self.current_sensor_state[sensor.measurement_names[sensor_index]] = sensor_value
    #             self.current_sensor_state[sensor.sensor_name] = sensor.measured_values

    #     # Read the orientation sensor values
    #     if self.orientation_sensor is not None:
    #         pass

    #     # Read the photoresistor (light sensor) values
    #     if self.light_sensor is not None:
    #         pass

    #     return self.sensor_values_have_changed_flag

    # def get_changed_sensor_values(self):
    #     self.sensor_values_have_changed_flag = False
    #     return self.current_sensor_state

    # def get_connected_sensor_column_names(self):
    #     output_column_names = ['date_time']
    #     if self.pressure_sensor:
    #         output_column_names.append('pressure')
    #         output_column_names.append('temp')
    #     if self.orientation_sensor:
    #         output_column_names.append('yaw')
    #         output_column_names.append('roll')
    #         output_column_names.append('pitch')
    #         output_column_names.append('accel_x')
    #         output_column_names.append('accel_y')
    #         output_column_names.append('accel_z')
    #     if self.light_sensor:
    #         output_column_names.append('light')
    #     return output_column_names
sensor_ctrl = SensorController()
