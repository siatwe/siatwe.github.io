# Some Useful Pacman Commands
*Created: 2019-02-01*

Here are some Pacman commands that I find quite useful and that may not be known by everyone:

- This command shows all packages you have installed yourself, except "base" and "base-devel" packages which were installed during the installation of Arch:

```bash
pacman -Qei | awk '/^Name/ { name=$3 } /^Groups/ { if ( $3 != "base" && $3 != "base-devel" ) { print name } }'
```

Shows all installed packages and their individual memory sizes starting with the smallest:

```bash
pacman -Qi | awk '/^Name/{name=$3} /^Installed Size/{print $4$5, name}' | sort -h
```

- Uninstall all unneeded packages and their unused dependencies. Quite useful to clean up here and there occasionally:

```bash
sudo pacman -Rsn $(pacman -Qdtq)
```

- With this command you can display all packages you have received via the AUR. (Lists all foreign packages, which, for most users, means AUR):
```bash
pacman -Qqm
```

Pacman stores fetched packages and does not automatically delete old or uninstalled packages. Of course, this has a few advantages:

- So you can easily downgrade packages.
- Packages that have been uninstalled and need to be reinstalled can be installed directly from the cache folder (of course only if there is no newer version in the repos).

However you should clean up this cache here and there so that it does not become infinitely large.
For this there is a script called paccache. It uninstalls all stored package data of the installed and uninstalled packages except the last three. And that should normally be enough:

```bash
sudo paccache -r
```

- It is also possible to automate paccache. With the following command paccache deletes the cache weekly:

```bash
sudo systemctl enable paccache.timer --now
```
