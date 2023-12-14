// RUN this script in the browser console of the BlueOS.local extension page  (http://blueos.local/tools/extensions-manager) to install our extension

let permissions = {
    "ExposedPorts": {
        "80/tcp": {}
    },
    "PublishAllPorts": true,
    "HostConfig": {
        "Privileged": true,
        "Binds": [
            "/root/.config:/root/.config"
        ],
        "ExtraHosts": [
            "host.docker.internal:host-gateway"
        ],
        "Volumes": {
            "/home/pi": {}
        },
        "PortBindings": {
            "80/tcp": [
                {
                    "HostPort": ""
                }
            ]
        },
        "Tmpfs": {
            "/run": "rw",
            "/run/lock": "rw",
            "/tmp": "rw"
        },
        "CapAdd": [
            "SYS_ADMIN"
        ],
        "SecurityOpt": [
            "seccomp=unconfined"
        ],
        "CgroupParent": "docker.slice"
    }
}


let body = {
    "identifier": "kywm.rov-web",
    "name": "Example 2",
    "docker": "kywm/rov-web",
    "tag": "v1.0.1",
    "enabled": true,
    "permissions": JSON.stringify(permissions),
    "user_permissions": ""
}

fetch("http://blueos.local/kraken/v1.0/extension/install", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "es;q=0.9",
        "content-type": "application/json",
        "sec-gpc": "1"
    },
    "referrer": "http://blueos.local/tools/extensions-manager",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": JSON.stringify(body),
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
});
