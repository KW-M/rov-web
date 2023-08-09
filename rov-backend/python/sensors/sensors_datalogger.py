import asyncio
import csv
import datetime
import os
import time
from pathlib import Path

from sensors_controller import SensorController

# Create a subfolder named 'sensor_data' if it doesn't exist
data_folder = Path("sensor_data")
data_folder.mkdir(parents=True, exist_ok=True)

class SensorDataLogger:
    def __init__(self):
        self.running = False
        self.task = None
        self.sensors_ctrl = SensorController()

    def create_csv_file(self, filename):
        header = ["Date", "Time", "Sensor1", "Sensor2", "Sensor3"]  # Modify with actual sensor names
        file_path = data_folder / filename

        # Write header if the file doesn't exist
        if not file_path.exists():
            with open(file_path, 'w', newline='') as csv_file:
                csv_writer = csv.writer(csv_file)
                csv_writer.writerow(header)

    def update_csv_file(self, filename, data):
        file_path = data_folder / filename

        with open(file_path, 'a', newline='') as csv_file:
            csv_writer = csv.writer(csv_file)
            csv_writer.writerow(data)

    async def run_logger(self):
        await self.sensors_ctrl.sensor_setup_loop()

        while self.running:
            current_time = datetime.datetime.now()
            date_str = current_time.strftime("%Y-%m-%d")
            file_name = f"{date_str}.csv"
            
            # Get sensor updates or all values, modify based on your requirement
            sensor_data = self.sensors_ctrl.get_sensor_updates()
            # sensor_data = self.sensors_ctrl.get_all_sensor_values()

            if sensor_data:
                data_to_write = [current_time.date(), current_time.time()] + [measurement.value for measurement in sensor_data]
                self.update_csv_file(file_name, data_to_write)

            await asyncio.sleep(30)  # Wait for 30 seconds

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
