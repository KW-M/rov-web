FROM debian:bullseye

ENV container docker
ENV LC_ALL C
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update \
    && apt-get install -y systemd systemd-sysv \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN cd /lib/systemd/system/sysinit.target.wants/ \
    && rm $(ls | grep -v systemd-tmpfiles-setup)

RUN rm -f /lib/systemd/system/multi-user.target.wants/* \
    /lib/systemd/system/*.wants/* \
    /lib/systemd/system/local-fs.target.wants/* \
    /lib/systemd/system/sockets.target.wants/*udev* \
    /lib/systemd/system/sockets.target.wants/*initctl* \
    /lib/systemd/system/basic.target.wants/* \
    /lib/systemd/system/anaconda.target.wants/* \
    /lib/systemd/system/plymouth* \
    /lib/systemd/system/systemd-update-utmp*

# # install packages
RUN apt-get update && apt-get install -y sudo git wget unzip nano
# #python3 python3-pip  chromium-driver

# # create user pi if it doesnt exist
RUN useradd -m -s /bin/bash pi
RUN usermod -aG sudo pi
RUN echo "pi ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
USER pi
RUN cd ~ && pwd && whoami

# ---------- ROV Stuff ----------
RUN cd ~ && \
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
    sudo cp ./tooling/rasberry_pi_setup_scripts/new_config_files/rov_internal_web_browser.service /lib/systemd/system/rov_internal_web_browser.service && \
    sudo systemctl enable rov_internal_web_browser || echo "failed to enable rov_internal_web_browser";
# echo "blu" | sudo -S echo "hi" && \
# echo "\nblurov\n1234\nhttps://rov-web.livekit.cloud\nAPIHd7Boa9RUUiT\nOEnyn7xw5d0vKNqLlKDSD6UXaSvoVQ8uLDiZycjb8pH\nlive_939208839_F9qSqKO7lwAUOFybBDyYok0biD8tZ8" | ./tooling/rasberry_pi_setup_scripts/START_HERE.sh
# ---------- End ROV stuff ----------


VOLUME [ "/sys/fs/cgroup" ]

CMD ["/lib/systemd/systemd"]
