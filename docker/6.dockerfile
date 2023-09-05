FROM debian:bullseye-slim
# SOURCE: https://serverfault.com/a/1087467
# Using systemd in docker: https://systemd.io/CONTAINER_INTERFACE/
# Make sure cgroupv2 is enabled (should be by default). To check this run: cat /sys/fs/cgroup/cgroup.controllers
ENV container docker
ENV LC_ALL C
ENV DEBIAN_FRONTEND noninteractive
STOPSIGNAL SIGRTMIN+3
VOLUME [ "/tmp", "/run", "/run/lock" ]
WORKDIR /

RUN apt-get update \
    && apt-get install -y systemd systemd-sysv \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Remove unnecessary units
RUN rm -f /lib/systemd/system/multi-user.target.wants/* \
    /etc/systemd/system/*.wants/* \
    /lib/systemd/system/local-fs.target.wants/* \
    /lib/systemd/system/sockets.target.wants/*udev* \
    /lib/systemd/system/sockets.target.wants/*initctl* \
    /lib/systemd/system/sysinit.target.wants/systemd-tmpfiles-setup* \
    /lib/systemd/system/basic.target.wants/* \
    /lib/systemd/system/anaconda.target.wants/* \
    /lib/systemd/system/plymouth* \
    /lib/systemd/system/systemd-update-utmp*

# install needed packages
RUN apt-get update && apt-get install -y sudo git wget unzip nano

# # create user pi if it doesnt exist
RUN useradd -m -s /bin/bash pi
RUN usermod -aG sudo pi
RUN echo "pi ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers


# ---------- ROV Stuff ----------
USER pi
RUN cd $HOME && pwd && whoami
RUN cd $HOME && \
    mkdir rov-web && \
    cd rov-web && \
    wget "https://github.com/KW-M/rov-web/releases/latest/download/project.zip" -O project.zip && \
    unzip project.zip && \
    rm project.zip && \
    git init -b blueos-docker-containerization && \
    git remote add origin 'https://github.com/KW-M/rov-web.git'  && \
    git fetch && \
    git reset --hard origin/blueos-docker-containerization  && \
    git branch --set-upstream-to=origin/blueos-docker-containerization blueos-docker-containerization && \
    sudo systemctl daemon-reload || echo "failed to reload daemon" && \
    # cp ./tooling/rasberry_pi_setup_scripts/rov-python-code.service /lib/systemd/system/rov-python-code.service && \
    # sudo systemctl enable rov-python-code || echo "failed to enable rov-python-code" && \
    # sudo cp ./tooling/rasberry_pi_setup_scripts/new_config_files/rov_internal_web_browser.service /lib/systemd/system/rov_internal_web_browser.service && \
    # sudo systemctl enable rov_internal_web_browser || echo "failed to enable rov_internal_web_browser";
    # echo "blu" | sudo -S echo "hi" && \
    echo "\nblurov\n1234\nhttps://rov-web.livekit.cloud\nAPIHd7Boa9RUUiT\nOEnyn7xw5d0vKNqLlKDSD6UXaSvoVQ8uLDiZycjb8pH\nlive_939208839_F9qSqKO7lwAUOFybBDyYok0biD8tZ8" | ./tooling/rasberry_pi_setup_scripts/START_HERE.sh
# ---------- End ROV stuff ----------

# ---------- BlueOS Metadata ----------
LABEL authors='[\
    {\
    "name": "Kyle Worcester-Moore",\
    },\
    {\
    "name": "Ryan Anderson",\
    }\
    ]'
LABEL company='{\
    "about": "",\
    "name": "Oceans and Robotics Inc.",\
    "email": "(ssrovcamp)(at)(gmail.com)"\
    }'
LABEL type="other"
LABEL tags='[\
    "interaction"\
    ]'
LABEL readme='https://raw.githubusercontent.com/KW-M/rov-web/{tag}/README.md'
LABEL links='{\
    "website": "https://github.com/KW-M/rov-web/",\
    "support": "https://github.com/KW-M/rov-web/"\
    }'
LABEL requirements="core >= 1.1"
LABEL permissions='{ \
    "ExposedPorts": { \
    "2222/tcp": {} \
    }, \
    "HostConfig": { \
    "Privileged": true, \
    "NetworkMode": "host", \
    "Binds": [ \
    "/root/.config:/root/.config" \
    ], \
    "PortBindings": { \
    "22/tcp": [ \
    { \
    "HostPort": "2222" \
    } \
    ] \
    }, \
    "Tmpfs": { \
    "/run": "rw", \
    "/run/lock": "rw", \
    "/tmp": "rw" \
    }, \
    "CapAdd": [ \
    "SYS_ADMIN" \
    ], \
    "SecurityOpt": [ \
    "seccomp=unconfined" \
    ], \
    "CgroupParent": "docker.slice", \
    } \
    }'
# ---------- End BlueOS Metadata ----------

USER root
RUN cd $HOME && pwd && whoami
SHELL ["/bin/bash", "-c"]
CMD [ "/lib/systemd/systemd", "log-level=info", "unit=sysinit.target" ]
