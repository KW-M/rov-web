import axios from 'axios'
import { URL_PARAMS } from '../constsInternal'
const API_PATH = '/commander/v1.0'

export async function shutdownROV(shutdownType: 'reboot' | 'poweroff'): Promise<string> {
    return axios({
        method: 'post',
        url: `${URL_PARAMS.BLUEOS_APIS_ENDPOINT + API_PATH}/shutdown`,
        timeout: 5000,
        withCredentials: false,
        params: {
            shutdown_type: shutdownType,
            i_know_what_i_am_doing: true,
        },
    }).then((response) => response.data).then((data) => {
        return "Shutting Down... " + String(data)
    }).catch((error) => {

        // Connection lost/timeout, normal when we are turning off/rebooting
        if (error.code === 'ECONNABORTED') return "Shutting Down... ";

        const message = `Could not execute shutdown: ${error.code} - ${error.message} - ${error.message ?? error.response?.data}.`
        console.warn(message)
        throw new Error(message);
    })
}

// fetch("http://192.168.1.143/commander/v1.0/shutdown?shutdown_type=poweroff&i_know_what_i_am_doing=true", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "es",
//     "sec-gpc": "1"
//   },
//   "referrer": "http://192.168.1.143/vehicle/video-manager",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });



export async function poweroffArdupilot(shutdownType: 'reboot' | 'poweroff'): Promise<boolean> {
    // has cookie :
    // auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJsb2NhbGUiOiJlbiIsInZpZXdNb2RlIjoibGlzdCIsInNpbmdsZUNsaWNrIjpmYWxzZSwicGVybSI6eyJhZG1pbiI6ZmFsc2UsImV4ZWN1dGUiOnRydWUsImNyZWF0ZSI6dHJ1ZSwicmVuYW1lIjp0cnVlLCJtb2RpZnkiOnRydWUsImRlbGV0ZSI6dHJ1ZSwic2hhcmUiOnRydWUsImRvd25sb2FkIjp0cnVlfSwiY29tbWFuZHMiOltdLCJsb2NrUGFzc3dvcmQiOmZhbHNlLCJoaWRlRG90ZmlsZXMiOmZhbHNlLCJkYXRlRm9ybWF0IjpmYWxzZX0sImlzcyI6IkZpbGUgQnJvd3NlciIsImV4cCI6MTY5OTA2NjA0OCwiaWF0IjoxNjk5MDU4ODQ4fQ.A5uMy4sUr4p7VoxqoypKrGW7FAyQP7PWlNGWAJjAn2I
    return fetch("http://192.168.1.143/ardupilot-manager/v1.0/stop", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "es",
            "sec-gpc": "1"
        },
        "referrer": "http://192.168.1.143/vehicle/autopilot",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    }).then(response => response.json()).then((response) => {
        console.log(response)
        return true;
    }).catch((e) => {
        console.log(e)
        return false;
    });
}
