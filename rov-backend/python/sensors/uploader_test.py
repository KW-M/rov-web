from googleapiclient.http import MediaFileUpload
from Google import Create_Service

CLIENT_SECRET_FILE = 'client_secret.json'
API_NAME = 'drive'
API_VERSION = 'v3'
SCOPES = ['https://www.googleapis.com/auth/drive']

service = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)

file_metadata = {
    #upload file keep original name
    'name': 'originalFilename',
    'parents': ['1OPCg-TSY3LlfSYzNrvmZfHTS0BNRzUsO']
}

media_content = MediaFileUpload('sensor_data/2023-08-15.csv', mimetype='text/csv', resumable=True)

file = service.files().create(
    body=file_metadata,
    media_body=media_content
).execute()

print(file)

# https://www.youtube.com/watch?v=Tislsz4XVuY
# Google Drive API issues getting stuff due to slow laptop