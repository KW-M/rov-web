# This script previously used to replace the blueos-bootstrap container provided by blue robotics with our own due to a bug, but this
# has been fixed in the official blueos-bootstrap container - SO WE CAN NOW USE THE OFFICIAL ONE
docker container stop blueos-bootstrap
docker container rm blueos-bootstrap
docker create \
    -t \
    --restart unless-stopped \
    --name blueos-bootstrap \
    --net=host \
    -v $HOME/.config/blueos/bootstrap:/root/.config/bootstrap \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /var/logs/blueos:/var/logs/blueos \
    -e BLUEOS_CONFIG_PATH=$HOME/.config/blueos \
    kywm/blueos-bootstrap:master
