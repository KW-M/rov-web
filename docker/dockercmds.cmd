rm dockerfile || true; nano dockerfile
docker build . -t rov-web-container
docker run -it --rm --name rov-web --cgroup-parent=docker.slice --cgroupns host --tmpfs /tmp --tmpfs /run --tmpfs /run/lock -v /sys/fs/cgroup:/sys/fs/cgroup --privileged --network host rov-web-container
docker exec -it rov-web bash
docker stop rov-web


docker run -it --rm --tmpfs /tmp --tmpfs /run -v /sys/fs/cgroup:/sys/fs/cgroup -p 9291:80 --name rov-web rov-web-container
docker run -it --rm --name systemd-debian --tmpfs /tmp --tmpfs /run --tmpfs /run/lock -v /sys/fs/cgroup:/sys/fs/cgroup:ro systest

docker run -it --rm --name rov-web --cgroup-parent=docker.slice --cgroupns host --tmpfs /tmp --tmpfs /run --tmpfs /run/lock -v /sys/fs/cgroup:/sys/fs/cgroup --privileged --network host rov-web-container
docker run -it --rm --name systemd_test --volumes /home/pi \
  --privileged --cap-add SYS_ADMIN --security-opt seccomp=unconfined \
  --cgroup-parent=docker.slice --cgroupns private \
  --tmpfs /tmp --tmpfs /run --tmpfs /run/lock \
  systemd_test

docker run -it --rm --name systemd_test --volumes /home/pi \
  --publish-all -p 80 \
  --privileged --cap-add SYS_ADMIN --security-opt seccomp=unconfined \
  --cgroup-parent=docker.slice --cgroupns private \
  --tmpfs /tmp --tmpfs /run --tmpfs /run/lock \
  systemd_test


#https://rpi4cluster.com/docker/selenium/
#https://docs.docker.com/engine/api/v1.41/#tag/Container/operation/ContainerCreate
#https://serverfault.com/a/1087467
#https://ardupilot.org/dev/docs/mavlink-arming-and-disarming.html
#https://mavlink.io/en/mavgen_python/
#https://mavlink.io/en/messages/common.html#MAV_MODE_STABILIZE_ARMED
