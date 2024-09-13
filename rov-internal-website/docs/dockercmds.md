```sh
# Edit the dockerfile:
cd ~/rov-web; rm dockerfile || true; nano dockerfile

# Build the docker image:
cd ~/rov-web; docker build . -t kywm/rov-web:main --cache-from kywm/rov-web:latest

# Run the docker image to test:
docker run -it --rm --name kywm/rov-web:main --cgroup-parent=docker.slice --cgroupns host --tmpfs /tmp --tmpfs /run --tmpfs /run/lock -v /sys/fs/cgroup:/sys/fs/cgroup --privileged --network host rov-web-container

# Open a bash shell in the running container to use command prompt:
docker exec -it kywm/rov-web:main bash # type exit to exit the shell
# or via the extension name:
docker exec -it extension-kywmrovwebmain bash # type exit to exit the shell


# Push the image to docker hub:
docker push kywm/rov-web:main

# Cleanup leftovers:
# !!! make sure the BlueOS core & Bootstrap (especially) & any extension containers ARE RUNNING before doing this command (otherwise you will need to install them again) !!!:
docker system prune --all --volumes

# Stop the running container (must be run outside the container):
docker stop rov-web

# Alternative run commands:

docker run -it --rm --tmpfs /tmp --tmpfs /run -v /sys/fs/cgroup:/sys/fs/cgroup -p 9291:80 --name rov-web rov-web-container
docker run -it --rm --name systemd-debian --tmpfs /tmp --tmpfs /run --tmpfs /run/lock -v /sys/fs/cgroup:/sys/fs/cgroup:ro systest

docker run -it --rm --name rov-web --cgroup-parent=docker.slice --cgroupns host --tmpfs /tmp --tmpfs /run --tmpfs /run/lock -v /sys/fs/cgroup:/sys/fs/cgroup --privileged --network host rov-web-container

docker run -it --rm --name rov-web --volume /home/pi \
  --publish-all -p 80 \
  --privileged --cap-add SYS_ADMIN --security-opt seccomp=unconfined \
  --cgroup-parent=docker.slice --cgroupns private \
  --tmpfs /tmp --tmpfs /run --tmpfs /run/lock \
  rov-web




#https://rpi4cluster.com/docker/selenium/
#https://docs.docker.com/engine/api/v1.41/#tag/Container/operation/ContainerCreate
#https://serverfault.com/a/1087467
#https://ardupilot.org/dev/docs/mavlink-arming-and-disarming.html
#https://mavlink.io/en/mavgen_python/
#https://mavlink.io/en/messages/common.html#MAV_MODE_STABILIZE_ARMED



```
