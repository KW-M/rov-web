import json
import asyncio
import datetime

from aiogoogle import Aiogoogle
from aiogoogle.auth.creds import ServiceAccountCreds

from sensors.sensors_datalog import SensorDataLog

class DataUpload:
    API_NAME = 'drive'
    API_VERSION = 'v3'
    SCOPES = ['https://www.googleapis.com/auth/drive']

    def __init__(self):
        self.current_time = datetime.datetime.now()
        self.filename = self.current_time.strftime("%Y-%m-%d") + ".csv"
        
        # Create an instance of SensorDataLog class
        self.sensor_log = SensorDataLog()

    def get_service_account_creds(self):
        service_account_key = json.load(open('test_service_account.json')) # make a more secure way to store this, file withheld
        return ServiceAccountCreds(
            scopes=self.SCOPES,
            **service_account_key
        )

    async def yield_file(self, file_path):
        with open(file_path, 'rb') as file:
            while True:
                chunk = file.read(16)
                if not chunk:
                    break
                yield chunk

    async def stream_upload_file(self, file_path):
        creds = self.get_service_account_creds()
        async with Aiogoogle(service_account_creds=creds) as aiogoogle:
            # Create API
            drive_v3 = await aiogoogle.discover(self.API_NAME, self.API_VERSION)

            print("Creating file:")
            req = drive_v3.files.create(
                pipe_from=self.yield_file(file_path),
                json={
                    'name': self.filename,  # Set the desired file name
                    'parents': ["1bA_ysLs5pjZQVGpzHrfja9GH0XoCbA4E"], # doesn't need to be hidden since it's just the folder ID, and it's public
                }
            )

            print("Upload file:")
            # Upload file
            upload_res = await aiogoogle.as_service_account(req)
            print(f"Uploaded stream file successfully.\nFile ID: {upload_res['id']}")

    # update the file with the latest data
    async def update_drive_file(self, file_id, file_path):
        creds = self.get_service_account_creds()
        async with Aiogoogle(service_account_creds=creds) as aiogoogle:
            # Create API
            drive_v3 = await aiogoogle.discover(self.API_NAME, self.API_VERSION)

            print("Updating file:")
            req = drive_v3.files.update(
                fileId=file_id,
                pipe_from=self.yield_file(file_path),
                json={
                    'name': self.filename,  # Set the desired file name
                }
            )

            print("Upload file:")
            # Upload file
            upload_res = await aiogoogle.as_service_account(req)
            print(f"Updated stream file successfully.\nFile ID: {upload_res['id']}")

    async def run_all_the_things(self):
        file_path = 'sensor_data/' + self.filename

        # Upload the initial CSV file
        await self.stream_upload_file(file_path)

        # Start the SensorDataLog
        self.sensor_log.start()

        while True:
            # Wait for 30 seconds
            await asyncio.sleep(30)

            # Update the CSV file and upload it
            self.sensor_log.update_csv_file(file_path)
            await self.stream_upload_file(file_path)

if __name__ == "__main__":
    data_upload = DataUpload()
    asyncio.run(data_upload.run_all_the_things())