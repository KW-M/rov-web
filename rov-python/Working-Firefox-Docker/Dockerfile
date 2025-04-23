FROM nginxinc/nginx-unprivileged:stable-bookworm
USER root

# Set non-interactive mode to avoid prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install necessary packages
RUN apt-get update && apt-get install -y \
    psmisc \
    procps \
    wget \
    xdg-utils \
    xvfb \
    ffmpeg \
    curl \
    bash \
    software-properties-common \
    dbus-x11 \
    dbus-user-session \
    x11vnc \
    x11-utils \
    vlc \
    pipewire \
    pipewire-pulse \
    wireplumber \
    pipewire-audio-client-libraries \
    pulseaudio-utils \
    libportaudio2 \
    nano \
    pipewire-libcamera \
    firefox-esr
RUN apt-get install -y rtkit dbus-tests python3

# Set up the working directory
WORKDIR /app

# Copy the project files
COPY . .
COPY libcamera /usr/lib/arm-linux-gnueabihf/libcamera

# Set up the runtime directory for PipeWire
#RUN mkdir -p /run/user/1000 && chmod 700 /run/user/1000

# Create pi user:
RUN groupadd pi --gid 1000 || true
RUN useradd --uid 1000 --gid 1000 --groups nginx,video,audio,users --home /home/pi --create-home --shell /bin/bash --comment "pi user for running ROV code as a non-root user and compatibility with raspberry pi defaults"  pi

# Set up the environment
ENV DISPLAY=:99

# Create entrypoint script
COPY entrypoint.sh entrypoint.sh
RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]

# BUILD: sudo docker build -t docker-w-pipewire .
# RUN: docker run -it -v /run/user/1000:/run/user/1000  -p 9224:9224 --user 1000:1000 --rm docker-w-pipewire
# RUN (DOESN"T WORK): docker run -it -v /run/user/1000/pipewire-0:/run/user/1000/pipewire-0 -v /run/user/1000/dconf:/run/user/1000/dconf  -p 9224:9224 --user 1000:1000 --rm docker-w-pipewire
