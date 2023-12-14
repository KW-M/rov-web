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
