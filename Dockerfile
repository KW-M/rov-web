FROM nginxinc/nginx-unprivileged:stable-bookworm-perl@sha256:2fb21a078c77b325fa6184ded2f5926632a7778361d68404bb139cc40627a189

SHELL ["/bin/bash", "-c"]
USER root
RUN mkdir /run/dbus

# Install Packages:
COPY ./rov-python/requirements.txt /rov-web/rov-python/requirements.txt
COPY ./rov-tooling/container-setup-scripts/setup-container-pkgs.sh /rov-web/rov-tooling/container-setup-scripts/setup-container-pkgs.sh
RUN chmod +x /rov-web/rov-tooling/container-setup-scripts/setup-container-pkgs.sh && \
    /rov-web/rov-tooling/container-setup-scripts/setup-container-pkgs.sh

# Configure Python Virtual Environment Variables
ENV VIRTUAL_ENV=/env
ENV PATH=/env/bin:$PATH

# Copy Files:
COPY ./frontend/build /rov-web/frontend/build
COPY ./rov-internal-website/build /rov-web/rov-internal-website/build
COPY ./rov-tooling /rov-web/rov-tooling
COPY ./rov-python /rov-web/rov-python

# Setup Configs:
RUN chmod +x /rov-web/rov-tooling/container-setup-scripts/* && \
    chmod +x /rov-web/rov-tooling/container-runtime-scripts/* && \
    /rov-web/rov-tooling/container-setup-scripts/setup-container-config.sh

# local copy of internal website is served on port 8080
EXPOSE 8080/tcp
# exposed browser debugging port if enabled by setting BROWSER_DEBUGGING_PORT=9224
EXPOSE 9224/tcp

# supervisord will manage the components of the container and so is the main process
ENTRYPOINT ["supervisord", "-c", "/rov-web/rov-tooling/config-files/supervisord.conf"]
