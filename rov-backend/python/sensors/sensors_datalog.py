import asyncio
import csv
import datetime
from pathlib import Path
from protobufs.rov_actions_proto import SensorMeasurmentTypes

from sensors.sensors_controller import sensor_ctrl

# Create a subfolder named 'sensor_data' if it doesn't exist
data_folder = Path("sensor_data")
data_folder.mkdir(parents=True, exist_ok=True)
# make file with date as name
current_time = datetime.datetime.now()
date_str = current_time.strftime("%Y-%m-%d")
filename = f"{date_str}.csv"

class SensorDataLog:
    def init(self):
        self.running = False
        self.task = None
        self.sensors_ctrl = sensor_ctrl

    def create_csv_file(self):
        measurement_header = self.sensors_ctrl.mock_get_all_sensor_values()
        header = ["Date", "Time"]  # Modify with actual sensor names
        # get sensor names from sensor controller
        header += [sensor_name.measurement_type for sensor_name in measurement_header]

        # mm = SensorMeasurmentTypes._member_map_  # Get all sensor names from proto file
        # header += [str(mm[measurement.measurement_type]) for measurement in measurement_header]
        

        file_path = data_folder / filename

        # Write header if the file doesn't exist
        if not file_path.exists():
            with open(file_path, 'w', newline='') as csv_file:
                csv_writer = csv.writer(csv_file)
                csv_writer.writerow(header)

    def update_csv_file(self, filename, data):
        file_path = "sensor_data/" + filename
        with open(file_path, 'a', newline='') as csv_file:
            csv_writer = csv.writer(csv_file)
            csv_writer.writerow(data)

    async def run_logger(self):
        # await self.sensors_ctrl.sensor_setup_loop()
        while self.running:
            current_time = datetime.datetime.now()
            current_time = current_time.strftime("%H:%M:%S")

            # Get sensor updates or all values, modify based on your requirement
            sensor_data = self.sensors_ctrl.get_all_sensor_values()
            # sensor_data = self.sensors_ctrl.mock_get_all_sensor_values()
            if sensor_data:
                data_to_write = [current_time.date(), current_time.time()] + [measurement.value for measurement in sensor_data]
                self.update_csv_file(filename, data_to_write)
            await asyncio.sleep(30)  # Wait for 30 seconds
            self.upload_to_drive()  # Upload to google drive

    def upload_to_drive(self):
        pass # TODO: Upload to google drive

    def start(self):
        if not self.running:
            self.running = True
            self.task = asyncio.create_task(self.run_logger())
            print("Sensor data logging started.")

    def stop(self):
        if self.running:
            self.running = False
            self.task.cancel()
            print("Sensor data logging stopped.")

sensor_log = SensorDataLog()