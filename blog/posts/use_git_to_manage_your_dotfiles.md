# Use Git To Manage Your Dotfiles
*created: 2020-02-06*

If you are a Linux user like me and have done a lot of configuration in a few years of use, you should store your dotfiles in a safe place. Or even better, share them with others. In this little tutorial I'll show you how to use Git to manage your dotfiles and upload them to github.com without any additional tools. 

__Create a .dotfiles folder in your home directory:__

```bash
git init --bare $HOME/.dotfiles
```

__Now create an alias for your dotfiles git command and store it in your .bashrc or .zshrc:__

- `--git-dir`: Specify the directory where to store the git relevant files and folders
- `--work-tree`: Specify the work tree, in this case the home directory path, which is stored in a variable called $HOME

```bash
alias dotfiles='/usr/bin/git --git-dir=$HOME/.dotfiles/ --work-tree=$HOME'
```

__Set git status to hide untracked files:__
This is very important. Otherwise all files in your $HOME path will be noted as untracked.

```bash
dotfiles config --local status.showUntrackedFiles no
```

__Usage:__
It's done, now you can use all your known git commands. E.g.:

```bash
dotfiles status
dotfiles add .vimrc
dotfiles add .config/bspwm/config
dotfiles commit -m "initial"
dotfiles add .bashrc
dotfiles commit -m "Add: bashrc"
dotfiles push
```

If you are not sure which dotfiles you have edited, just run...

```bash
dotfiles status
```
... and you will see a list of changed tracked files.


__Create a new github or gitlab repository and add it as remote for your .dotfiles repository:__

```bash
dotfiles remote add origin https://github.com/USERNAME/REPOSITORY_NAME.git 
dotfiles push origin master
```

__Checkout your .dotfiles repository on a new computer:__
Clone the repository as .dotfiles to your $HOME path:

```bash
git clone --bare https://github.com/USERNAME/REPOSITORY_NAME.git $HOME/.dotfiles
```

Define the alias showed before in your current terminal session (don't safe it in your .bashrc oder .zshrc) and
checkout the actual content from the remote git repository:

```bash
dotfiles checkout
```

Make sure that none of the tracked files and/or folders exist that you want to checkout, otherwise you
will get error messages.
