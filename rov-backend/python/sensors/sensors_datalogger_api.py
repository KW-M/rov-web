from flask import Flask, request
from sensors_datalogger import SensorDataLogger

app = Flask(__name__)
dlogger = SensorDataLogger()

@app.route('/start_logging', methods=['POST'])
def start_logging():
    dlogger.start()
    return "Logging started."

@app.route('/stop_logging', methods=['POST'])
def stop_logging():
    dlogger.stop()
    return "Logging stopped."

if __name__ == '__main__':
    app.run()
