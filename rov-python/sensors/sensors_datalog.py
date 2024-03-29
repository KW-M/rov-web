import asyncio
import csv
import datetime
from pathlib import Path
from protobufs.rov_actions_proto import SensorMeasurmentTypes

from sensors.sensors_controller import sensor_ctrl
from sensors.data_uploader import DataUpload

# Create a subfolder named 'sensor_data' if it doesn't exist
data_folder = Path("sensor_data")
data_folder.mkdir(parents=True, exist_ok=True)
# make file with date as name
current_time = datetime.datetime.now()
date_str = current_time.strftime("%Y-%m-%d")
filename = f"{date_str}.csv"

class SensorDataLog:
    def __init__(self):
        self.running = False
        self.task = None
        self.sensors_ctrl = sensor_ctrl

        # Create an instance of DataUpload class
        self.data_upload = DataUpload()

    def create_csv_file(self):
        measurement_header = self.sensors_ctrl.mock_get_all_sensor_values()
        header = ["Date", "Time"]  # Modify with actual sensor names
        # get sensor names from sensor controller
        header += [sensor_name.measurement_type for sensor_name in measurement_header]

        # mm = SensorMeasurmentTypes._member_map_  # Get all sensor names from proto file
        # header += [str(mm[measurement.measurement_type]) for measurement in measurement_header]

        file_path = data_folder / filename
        expandedPath = file_path.expanduser()

        # Write header if the file doesn't exist
        if not expandedPath.exists():
            with open(expandedPath, 'w', newline='') as csv_file:
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
            self.data_upload.update_drive_file()  # Update the file with the latest data

    def start(self):
        if not self.running:
            self.running = True
            self.task = asyncio.create_task(self.run_logger())
            self.data_upload.stream_upload_file()  # Upload to google drive
            print("Sensor data logging started.")

    def stop(self):
        if self.running:
            self.running = False
            self.task.cancel()
            print("Sensor data logging stopped.")

sensor_log = SensorDataLog()
