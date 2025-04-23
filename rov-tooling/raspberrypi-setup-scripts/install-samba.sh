# This script helps to set up samba on the Raspberry Pi for file sharing.
# It is useful mostly for debugging and development purposes to get files on & off of the raspberry pi.
sudo apt-get install -y samba samba-common-bin
mkdir /home/pi/shared
# samba config:
echo " \
[rovshared]
path = /home/pi/
writeable=Yes
create mask=0777
directory mask=0777
public=no
" | sudo tee -a /etc/samba/smb.conf
sudo smbpasswd -a pi
sudo systemctl restart smbd
