# Minimal Arch Linux Installation Guide: Get Ready In Half An Hour 
*Created: 2019-02-01*

- *Edit* 20191226: Manuall installation linux kernel, nano and dhcpcd
- *Edit* 20190809: Installation of `base-devel` not required for minimal setup
- *Edit* 20190318: Typo: sudoer => sudoers
- *Edit* 20190208: Added:  Solution if `pacstrap -i` does not run properly due to invalid packet data (invalid or corrupted package (PGP signature)
- *Edit* 20190205: Added: `loadkeys` during installation
___

Step by step guide to install a minimal Arch Linux OS with graphical user interface, a terminal emulator and a browser in just 20 - 30 minutes. But of course: 

- "Minimal" means one partition, no swap and no special driver requirements.

If you want to try it, I would recommend you to install it first on a virtual machine, so you can't break anything.

___
__The default console keymap is US. Available layouts can be listed with:__

```bash
ls /usr/share/kbd/keymaps/**/*.map.gz
```

Then load your prefered layout:

```bash
loadkeys <lang-code>
```

For example:

```bash
loadkeys de-latin1
```
___
__Are you connected to the Internet? You absolutely need Internet for the installation! If your computer is connected to a LAN cable, that shouldn't be a problem unless you're using completely exotic hardware.__

- `-c`: n tries

```bash
ping -c 3 google.com
```
___
If you are not connected to the Internet, check your available network interfaces...

- `link`: Manage and display the state of all network interfaces
```bash
ip link
```
Output could something like this:
```bash
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: enp0s25: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether xxxxxxxxxxxxxxxxx brd xxxxxxxxxxxxxxxxx
3: wlp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DORMANT group default qlen 1000
    link/ether xxxxxxxxxxxxxxxxx brd xxxxxxxxxxxxxxxxx
```
...and try to configure your favorite one with DHCP:
```bash
dhcpd <INTERFACE>
```
For example:
```bash
dhcpd enp0s25
```
___
Or use your WLAN interface to connect to the Internet:
```bash
wifi-menu
```
___
__Update the package repository:__

- `-Syy`: Synchronizing package databases without upgrading them
```bash
pacman -Syy
```
___
__Install the reflector package which generates an optimized mirror list based on the given country name. (In this case for Germany):__

- `-S`: Install (S)pecific or (S)ingle package(s)
```bash
pacman -S reflector
```

- `-c`: Country in quotes
- `-f`: The fastest n
- `-l`: Limit the list to the n most recently synchronized servers
- `-n`: Return at most n mirrors
- `--save`: And save it to ...

```bash
reflector -c "Germany" -f 12 -l 10 -n 12 --save /etc/pacman.d/mirrorlist
```
___
__Have a look at the available hard disks and their partitions. The partitions are not important now, but it can make it easier to identify your disks and reduce the risk of overwriting the wrong one:__

- `-l`: List the partition tables for the  specified  devices

```bash
fdisk -l
```
___
__Run cfdisk on your selected hard drive and create a primary and bootable partition. It is important not to apply cfdisk to a partition, but to the disk itself. /dev/sda != /dev/sda1__

- `X`: Disk letter

```bash
cfdisk /dev/sdX
```
___
__After you have created the partition, it have to be formatted. For example with ext4 or btrfs. Now it is important to select the partition:__

- `XY`: Disk letter + `Y`: Partition number

```bash
mkfs.ext4 /dev/sdXY
```
___
__You now have to mount the partition created this way to /mnt:__
```bash
mount /dev/sdXY /mnt
```
___
__The following command installs the base system on the given partition:__

- `-i`: Prompt for package confirmation when needed (run interactively)

```bash
pacstrap -i /mnt base
```
___
__If there are problems with incorrect packet data (invalid or corrupted package (PGP signature)), run the following commands and try again:__
```bash
pacman-key --init
pacman-key --populate archlinux
pacman-key --refresh-keys
```
___
__After the installation is finished you can create the fstab file with the following command:__

- `-U`: Use UUIDs (Universally Unique Identifiers) for source identifiers (shortcut for -t UUID)
- `-p`: Avoid printing pseudofs mounts

```bash
genfstab -U -p /mnt >> /mnt/etc/fstab
```
___
__Now [chroot](https://wiki.archlinux.org/index.php/chroot) into your currently installed system with bash:__
```bash
arch-chroot /mnt /bin/bash
```
___
__Install nano:__
```bash
pacman -S nano
```
___
__Edit /etc/locale.gen and uncomment your preferred language(s) for utf-8 and en_US.UTF-8 UTF-8:__
```bash
nano /etc/locale.gen
```
For example:
```bash
de_DE.UTF-8 UTF-8 
en_US.UTF-8 UTF-8
```
___
__And now, create your locale file(s):__
```bash
locale-gen
```
___
(The next two points can be skipped if you later want to synchronize the time settings over the Internet.)

__Select your time zone. (With a few chars and the tab key you can auto complete possible continents and cities):__

- `-sf`: Make symbolic links instead of hard links and remove existing destination files

```bash
ln -sf /usr/share/zoneinfo/<CONTINENT>/<CITY> /etc/localtime
```
For example:
```bash
ln -sf /usr/share/zoneinfo/Europe/Berlin /etc/localtime
```
___
__Update your hardware clock:__

- `--systohc`: System 2 hardware clock
- `--utc`: UTC time

```bash
hwclock --systohc --utc
```
___
__Give your computer a name (hostname):__

```bash
echo <HOSTNAME> > /etc/hostname
```
___
__Create/edit /etc/hosts and add your hostname and some needed informations:__

```bash
nano /etc/hosts
```

```bash
127.0.0.1   localhost.localdomain   localhost                    
::1              localhost.localdomain   localhost
127.0.1.1   localhost.localdomain   <HOSTNAME>
```
___
__Change the root password:__

```bash
passwd
```
___
__Install sudo, grub and the kernel. Optional: dialog, netctl, dhcpcd and wpa_supplicant if you have set up your Internet connection with wifi-menu, so you can use wifi-menu again after the next reboot:__

```bash
pacman -S grub sudo dialog netctl wpa_supplicant dhcpcd linux linux-headers linux-firmware
```
___
__Install Grub on your hard disk (not the partition). If you have other non Linux/Unix-like operating systems on your computer (e.g. Windows) and want to be able to boot them via Grub then install os-prober and mount it, Grub should recognize the operating system then:__

```bash
grub-install /dev/sdX
```
___
__Create the grub configuration file:__

- `-o`: Out. Specify the output file

```bash
grub-mkconfig -o /boot/grub/grub.cfg
```
___
__At this point you should enable the dhcpcd daemon to your preferred network interface to avoid doing this at every new startup. (Not necessary if you used wifi-menu and want to stay with it):__

- `enable`: Enable this service/daemon...
- `--now`: NOW! You don't really need this parameter here, but it's still good to know that it exists

```bash
systemctl enable dhcpcd@<INTERFACE> --now
```
___
__Exit the chroot environment:__
```bash
exit
```
___
__Unmount the arch partition:__

- `-R`: Recursively

```bash
umount -R /mnt
```
___
__Reboot your system *(Important: Did you configure grub correctly and without error messages? If this is not the case, you can only boot into your newly installed system under certain circumstances {boot from live medium again, mount your existing /mnt partition, chroot into it and try to install grub again}. So you should be sure now):*__

```bash
reboot
```
___
__Login as root and create a new user:__

- `-m`: Create the home dir
- `-g`: The group name or ID for a new user's initial group, in this case: users
- `-G`: A list of supplementary groups which the user is also a member of, in this case: wheel (Administration group, later needed for our sudo command)
- `-s`: The path to the user's standard/login shell, here: /bin/bash

```bash
useradd -m -g users -G wheel -s /bin/bash <USERNAME>
```
___
__Change the password for your new user:__

```bash
passwd <USERNAME>
```
___
__Edit the /etc/sudoers file and uncomment the following line:__

```bash
nano /etc/sudoers
```

```bash
%wheel     ALL=(ALL) ALL
```
___
__Exit the root environment:__

```bash
exit
```
___
__Login as new created user and install X, a window manager with a simple menu and status bar, audio, a terminal emulator and a web browser (In this example i3 with dmenu and i3status, the xfce4 terminal and chromium):__

```bash
sudo pacman -S pulseaudio pulseaudio-alsa alsa-utils xorg xorg-xinit i3-wm dmenu i3status chromium xfce4-terminal
```
___
__Put i3 in your ~/.xinitrc file, so `startx` knows what to do:__

```bash
$ echo "exec i3" > ~/.xinitrc
```
___
__Start X:__

```bash
startx
```
___
__No sound?__

Type `win + enter` (to open the installed terminal) execute the following command and try again:

```bash
alsactl init
```
___
There you go. Now you have a minimal Arch Linux operating system on your computer. Without garbage and only with the software you wanted. With `win + d` a small menu opens at the top of the screen - from there you can start your programs. 

___
__TODO__

- UEFI Installation

