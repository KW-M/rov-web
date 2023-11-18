import axios from 'axios'
const API_URL = 'http://blueos.local/commander/v1.0'

export async function shutdownROV(shutdownType: 'reboot' | 'poweroff'): Promise<void> {
    return axios({
        method: 'post',
        url: `${API_URL}/shutdown`,
        timeout: 5000,
        params: {
            shutdown_type: shutdownType,
            i_know_what_i_am_doing: true,
        },
    }).then((response) => response.data)
        .catch((error) => {

            // Connection lost/timeout, normal when we are turning off/rebooting
            if (error.code === 'ECONNABORTED') {
                return
            }

            const message = `Could not execute shutdown: ${error.message ?? error.response?.data}.`
            console.warn(message)
            return message;
        })
}
