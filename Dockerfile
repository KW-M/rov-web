# FROM node:lts-slim as webpage-build-stage
# RUN corepack enable && corepack prepare pnpm@8.10.5
# RUN mkdir /rov-web/
# WORKDIR /rov-web
# COPY ./frontend ./frontend
# COPY ./rov-internal-website ./rov-internal-website
# WORKDIR /rov-web/rov-internal-website
# RUN pnpm install
# RUN pnpm run build

FROM nginxinc/nginx-unprivileged:stable-bullseye-perl

# COPY --from=webpage-build-stage /rov-web/rov-internal-website/dist /usr/share/nginx/html
# COPY ./rov-tooling/config-files/nginx.conf /etc/nginx/conf.d/default.conf
USER root
COPY . /rov-web
RUN chmod +x /rov-web/rov-tooling/prefix-log.sh
RUN chmod +x /rov-web/rov-tooling/setup-container.sh
RUN /rov-web/rov-tooling/setup-container.sh
ENV VIRTUAL_ENV /env                     # activating python environment
ENV PATH /env/bin:$PATH                  # activating python environment
COPY ./frontend/build /usr/share/nginx/html/
COPY ./rov-internal-website/build /usr/share/nginx/html/internal/
SHELL ["/bin/bash", "-c"]
ENTRYPOINT ["supervisord", "-c", "/rov-web/rov-tooling/config-files/supervisord.conf"]
# supervisord -c /rov-web/rov-tooling/config-files/supervisord.conf
# nano /rov-web/rov-python/playwright_test.py

# docker run -it --rm --ipc=host --privileged --user root -P -p 8020:8080 --security-opt seccomp=rov-tooling/seccomp_profile.json  --entrypoint /bin/bash sha256:e3a4646f294170c6648b1eb02e8f2dfdfb64ac5aee15abd42931d2b8fb960a80
# docker run --rm --ipc=host --privileged --user root -P -p 8020:8080 --security-opt seccomp=/home/pi/rov-web/rov-tooling/seccomp_profile.json sha256:07b1737f92d9058ff83c58a4271d2e2a8e7447ce1cc84b10d61ffb3c8f9a17c4
# docker run -it --rm --ipc=host --privileged --user root -P -p 8020:8080 --cap-add=SYS_ADMIN --security-opt seccomp=unconfined --entrypoint /bin/bash  sha256:07b1737f92d9058ff83c58a4271d2e2a8e7447ce1cc84b10d61ffb3c8f9a17c4
