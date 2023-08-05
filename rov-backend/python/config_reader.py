import sys
import argparse
import json
import logging

SECONDS_IN_A_DAY = 86400

# default values for the rov-config.json
rov_config = {
    "LogLevel": "info",
    "RovName": "ROV_NAME_UNSET",
    "RovControlPassword": "SET PASSWORD IN: ~/rov-config.json",
    "PythonWebsocketPort": 8765,
    "InternalWebpageUrl": "http://localhost/internal/index.html",
    "InternalWebpageUrlQueryParams": {
        "LivekitCloudUrl": "SET URL IN: ~/rov-config.json",
        "LivekitApiKey": "SET LIVEKIT API KEY IN: ~/rov-config.json",
        "LivekitSecretKey": "SET LIVEKIT SECRET KEY IN: ~/rov-config.json",
        "TwitchStreamKey": "SET TWITCH STREAM KEY IN: ~/rov-config.json",
    },
    "AuthStateStorageFilepath": "./rov-auth-state.json",
    "AuthTokenTimeout": SECONDS_IN_A_DAY,
    "EnabledSensors": [], # list of sensor to enable by name (see "name" attribute of python classes in sensor folder)
}


def read_config_file():
    """
    Reads the json config file specified in the program arguments as a dictionary with the config values
    returns the rov_config dictionary.
    """

    # parse the command line arguments
    programArgsParser = argparse.ArgumentParser()
    programArgsParser.add_argument('--config-file',
                                   metavar='FILE_PATH',
                                   type=str,
                                   required=True,
                                   help='Path to the config file.')
    args = programArgsParser.parse_args(sys.argv[1:])

    # get the config file path from the program arguments or use the default
    config_file_path = args.config_file

    # open and read the config file:
    with open(config_file_path, 'r', encoding="utf-8") as f:
        file_config_dict = json.load(f)
        for key in rov_config:
            if key in file_config_dict:
                rov_config[key] = file_config_dict[key]

    # return the parsed config dictionary
    return rov_config


def get_log_level(log_level_string):
    levels = {
        'critical': logging.CRITICAL,
        'error': logging.ERROR,
        'warn': logging.WARNING,
        'warning': logging.WARNING,
        'info': logging.INFO,
        'debug': logging.DEBUG
    }
    return levels.get(log_level_string.lower())
