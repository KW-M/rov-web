# script will be the custom text that shows when you open an ssh / terminal / serial terminal
# From: https://raspberrypi.stackexchange.com/questions/73681/raspberry-pi-custom-ssh-normal-login-message

echo "========================="
echo "Welcome to Raspberry ROV!"
echo "========================="
echo ""

# from: https://stackoverflow.com/questions/8529181/which-terminal-command-to-get-just-ip-address-and-nothing-else
echo " * ROV's IP addresses are: * "
echo "http://`hostname`.local - This is the pi's mDNS name, try it."
# list all local ip addresses
hostname --all-ip-addresses | xargs echo | sed 's/ /\n/g'
# try to get our external (internet facing) IP using the icanhazip service
PUBLIC_IP=$(wget --timeout=2 --tries=1 --quiet -O - http://icanhazip.com/ | tail)
if [ $PUBLIC_IP ]; then
    echo "Public IP: $PUBLIC_IP"
else
    echo "Public IP: No Internet Connection"
fi
echo ""
echo "========================="
echo "";
echo " * Networking Status: *";
echo "`ip addr list`";
echo "-------------------------"
echo "Bluetooth status: `rfkill list bluetooth`"
echo "WIFI status: `rfkill list wlan`"
echo "NOTE: Run 'rfkill unblock wlan' to enable wifi or 'rfkill block wlan' to disable wifi"
echo ""
echo "========================="
echo "";
echo " * Systemd Services Status: *"

#check if services are active, if not, show their status:
echo "------------------------"
if systemctl -q is-active rov_internal_web_browser.service; then
    echo "ACTIVE | rov_internal_web_browser.service"
else
    systemctl status --no-pager rov_internal_web_browser.service
fi
echo "------------------------"
if systemctl -q is-active rov_python_code.service; then
    echo "ACTIVE | rov_python_code.service"
else
    systemctl status --no-pager rov_python_code.service
fi
echo "------------------------"
if systemctl -q is-active nginx.service; then
    echo "ACTIVE | nginx.service"
else
    systemctl status --no-pager nginx.service
fi
echo "------------------------"
if systemctl -q is-active maintain_network.service; then
    echo "ACTIVE | maintain_network.service"
else
    systemctl status --no-pager maintain_network.service
fi
# echo "------------------------"
# if systemctl -q is-active bluetooth.service; then
#     echo "ACTIVE | bluetooth.service"
# else
#     systemctl status --no-pager bluetooth.service
# fi
# echo "------------------------"
# if systemctl -q is-active ngrok.service; then
#     echo "ACTIVE | ngrok.service"
# else
#     systemctl status --no-pager ngrok.service
# fi
# echo "------------------------"
# if systemctl -q is-active uv4l_raspicam.service; then
#     echo "ACTIVE | uv4l_raspicam.service"
# else
#     systemctl status --no-pager uv4l_raspicam.service
# fi
# echo "------------------------"
# if systemctl -q is-active rov_bluetooth_terminal.service; then
#     echo "ACTIVE | rov_bluetooth_terminal.service"
# else
#     systemctl status --no-pager rov_bluetooth_terminal.service
# fi
# echo "------------------------"
# if systemctl -q is-active netdata.service; then
#     echo "ACTIVE | netdata.service"
# else
#     systemctl status --no-pager netdata.service
# fi
echo "";
echo "========================="
echo "";
echo " * git status of the Internet ROV Code from Github: * ";
cd ~/rov-web/
GIT_HTTP_CONNECT_TIMEOUT=2 git fetch > /dev/null
git status;
echo "Last git commit: `git log -1 --pretty=format:"%h %s"`";
echo "";
echo "========================="
let upSeconds=$(/usr/bin/cut -d. -f1 /proc/uptime)
let secs=$((${upSeconds}%60))
let mins=$((${upSeconds}/60%60))
let hours=$((${upSeconds}/3600%24))
let days=$((${upSeconds}/86400))
UPTIME=`printf "%d days, %02dh%02dm%02ds" "$days" "$hours" "$mins" "$secs"`

# get the load averages
read one five fifteen rest < /proc/loadavg

echo "$(tput setaf 2)
   .~~.   .~~.    `date +"%A, %e %B %Y, %r"`
  '. \ ' ' / .'   `uname -srmo`$(tput setaf 1)
   .~ .~~~..~.
  : .~.'~'.~. :   Uptime.............: ${UPTIME}
 ~ (   ) (   ) ~  Memory.............: `cat /proc/meminfo | grep MemFree | awk {'print($2 * 0.001)'}`MB (Free) / `cat /proc/meminfo | grep MemTotal | awk {'print($2 * 0.001)'}`MB (Total)
( : '~'.~.'~' : ) Load Averages......: ${one}, ${five}, ${fifteen} (1, 5, 15 min)
 ~ .~ (   ) ~. ~  Running Processes..: `ps ax | wc -l | tr -d " "`
  (  : '~' :  )   Disk Space.........: `df -h | grep /dev/root | awk {'print $5'}` full (`df -h | grep /dev/root | awk {'print $3'}` used of `df -h | grep /dev/root | awk {'print $2'}`)
   '~ .~~~. ~'
       '~'
$(tput sgr0)"
echo "========================="
echo "";
