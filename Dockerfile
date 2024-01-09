# FROM node:lts-slim as webpage-build-stage
# RUN corepack enable && corepack prepare pnpm@8.10.5
# RUN mkdir /rov-web/
# WORKDIR /rov-web
# COPY ./frontend ./frontend
# COPY ./rov-internal-website ./rov-internal-website
# WORKDIR /rov-web/rov-internal-website
# RUN pnpm install
# RUN pnpm run build

# FROM nginxinc/nginx-unprivileged:stable-bullseye-perl
FROM nginxinc/nginx-unprivileged:stable-bullseye-perl@sha256:700ea2fcb7f1b5637e859883d89c4e4a9799f73eb864e0dd2f8a3e552d6b632e

# COPY --from=webpage-build-stage /rov-web/rov-internal-website/dist /usr/share/nginx/html

USER root
SHELL ["/bin/bash", "-c"]
RUN mkdir /run/dbus

# Install Packages:
COPY ./rov-python/requirements.txt /rov-web/rov-python/requirements.txt
COPY ./rov-tooling/container-setup-scripts/setup-container-pkgs.sh /rov-web/rov-tooling/container-setup-scripts/setup-container-pkgs.sh
RUN chmod +x /rov-web/rov-tooling/container-setup-scripts/setup-container-pkgs.sh && \
    /rov-web/rov-tooling/container-setup-scripts/setup-container-pkgs.sh
ENV VIRTUAL_ENV /env                     # activating python environment
ENV PATH /env/bin:$PATH                  # activating python environment

# Copy Files:
COPY ./frontend/build /rov-web/frontend/build
COPY ./rov-internal-website/build /rov-web/rov-internal-website/build
COPY ./rov-tooling /rov-web/rov-tooling
COPY ./rov-python /rov-web/rov-python

# Setup Configs:
RUN chmod +x /rov-web/rov-tooling/container-setup-scripts/* && \
    chmod +x /rov-web/rov-tooling/container-runtime-scripts/* && \
    /rov-web/rov-tooling/container-setup-scripts/setup-container-config.sh

EXPOSE 8080/tcp
# VOLUME [ "/rov-web" ]
ENTRYPOINT ["supervisord", "-c", "/rov-web/rov-tooling/config-files/supervisord.conf"]
# supervisord -c /rov-web/rov-tooling/config-files/supervisord.conf
# nano /rov-web/rov-python/playwright_test.py

# docker run -it --rm --ipc=host --privileged --user root -P -p 8020:8080 --security-opt seccomp=rov-tooling/seccomp_profile.json  --entrypoint /bin/bash sha256:e3a4646f294170c6648b1eb02e8f2dfdfb64ac5aee15abd42931d2b8fb960a80
# docker run --rm --ipc=host --privileged --user root -P -p 8020:8080 --security-opt seccomp=/home/pi/rov-web/rov-tooling/seccomp_profile.json sha256:07b1737f92d9058ff83c58a4271d2e2a8e7447ce1cc84b10d61ffb3c8f9a17c4
# docker run -it --rm --ipc=host --privileged --user root -P -p 8020:8080 --cap-add=SYS_ADMIN --security-opt seccomp=unconfined --entrypoint /bin/bash rov-web
# docker run -it --rm --ipc=host --privileged --user root -P -p 8020:8080 --cap-add=SYS_ADMIN --security-opt seccomp=unconfined rov-web
