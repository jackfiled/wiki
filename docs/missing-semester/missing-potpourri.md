---
title: missing-potpourri
tags: 
  - missing
  - 学习资料
toc: true
typora-root-url: missing-potpourri
date: 2022-04-27 15:02:13
---


# The Missing Semester in the CS

## Introduction

本篇是MIT的公开课程[计算机教学中消失的一学期](https://missing.csail.mit.edu/)的学习笔记第五篇。在笔记中，我将摘抄我认为是重点的语句，文中举出的例子我会在自己的电脑上操作一遍并给出其产生的结果。

本篇是`Potpourri`的学习笔记，说成人话就是大杂烩，课程的地址为[Potpourri](https://missing.csail.mit.edu/2020/potpourri/)。

> potpourri 肉菜杂烩，这里引申为很多东西的综合体;

<!--more-->

## Keyboard Remapping

The most basic change is to remap keys. This usually involves some software that is listening and, whenever a certain key is pressed, it intercepts that event and replaces it with another event corresponding to a different key. Some examples:

- Remap Caps Lock to Ctrl or Escape. We (the instructors) highly encourage this setting since Caps Lock has a very convenient location but is rarely used.
- Remapping PrtSc to Play/Pause music. Most OSes have a play/pause key.
- Swapping Ctrl and the Meta (Windows or Command) key.

> 从一个游戏人的角度出发，最好在玩游戏的时候不要把`Cap Locks`绑定为`Esc`，否则一些不愉快的体验可能在游戏过程中出现。

You can also map keys to arbitrary commands of your choosing. This is useful for common tasks that you perform. Here, some software listens for a specific key combination and executes some script whenever that event is detected.

- Open a new terminal or browser window.
- Inserting some specific text, e.g. your long email address or your MIT ID number.
- Sleeping the computer or the displays.

There are even more complex modifications you can configure:

- Remapping sequences of keys, e.g. pressing shift five times toggles Caps Lock.
- Remapping on tap vs on hold, e.g. Caps Lock key is remapped to Esc if you quickly tap it, but is remapped to Ctrl if you hold it and use it as a modifier.
- Having remaps being keyboard or software specific.

> 在Windows平台下面，我还是强力推荐[PowerToys](https://github.com/microsoft/PowerToys)这个微软和社区合作开发的开发者工具，它的官方文档在[这里](https://docs.microsoft.com/zh-cn/windows/powertoys)。这个软件不仅有键盘自定义这种功能，还提供了其他一下开发者可能用到的实用工具。

## Daemons

> daemons 守护进程;

Most computers have a series of processes that are always running in the background rather than waiting for a user to launch them and interact with them. These processes are called daemons and the programs that run as daemons often end with a `d` to indicate so. For example `sshd`, the SSH daemon, is the program responsible for listening to incoming SSH requests and checking that the remote user has the necessary credentials to log in.

In Linux, `systemd` (the system daemon) is the most common solution for running and setting up daemon processes. You can run `systemctl status` to list the current running daemons. Most of them might sound unfamiliar but are responsible for core parts of the system such as managing the network, solving DNS queries or displaying the graphical interface for the system. `systemd` can be interacted with the `systemctl` command in order to `enable`, `disable`, `start`, `stop`, `restart` or check the `status` of services (those are the `systemctl` commands).

More interestingly, `systemd` has a fairly accessible interface for configuring and enabling new daemons (or services). Below is an example of a daemon for running a simple Python app. We won’t go in the details but as you can see most of the fields are pretty self explanatory.

```bash
# /etc/systemd/system/myapp.service
[Unit]
Description=My Custom App
After=network.target

[Service]
User=foo
Group=foo
WorkingDirectory=/home/foo/projects/mydaemon
ExecStart=/usr/bin/local/python3.7 app.py
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Also, if you just want to run some program with a given frequency there is no need to build a custom daemon, you can use [`cron`](https://www.man7.org/linux/man-pages/man8/cron.8.html), a daemon your system already runs to perform scheduled tasks.

## FUSE

Modern software systems are usually composed of smaller building blocks that are composed together. Your operating system supports using different filesystem backends because there is a common language of what operations a filesystem supports. For instance, when you run `touch` to create a file, `touch` performs a system call to the kernel to create the file and the kernel performs the appropriate filesystem call to create the given file. A caveat is that UNIX filesystems are traditionally implemented as kernel modules and only the kernel is allowed to perform filesystem calls.

> caveat 警告; implement 实施;

[FUSE](https://en.wikipedia.org/wiki/Filesystem_in_Userspace) (Filesystem in User Space) allows filesystems to be implemented by a user program. FUSE lets users run user space code for filesystem calls and then bridges the necessary calls to the kernel interfaces. In practice, this means that users can implement arbitrary functionality for filesystem calls.

For example, FUSE can be used so whenever you perform an operation in a virtual filesystem, that operation is forwarded through SSH to a remote machine, performed there, and the output is returned back to you. This way, local programs can see the file as if it was in your computer while in reality it’s in a remote server. This is effectively what `sshfs` does.

Some interesting examples of FUSE filesystems are:

- [sshfs](https://github.com/libfuse/sshfs) - Open locally remote files/folder through an SSH connection.
- [rclone](https://rclone.org/commands/rclone_mount/) - Mount cloud storage services like Dropbox, GDrive, Amazon S3 or Google Cloud Storage and open data locally.
- [gocryptfs](https://nuetzlich.net/gocryptfs/) - Encrypted overlay system. Files are stored encrypted but once the FS is mounted they appear as plaintext in the mountpoint.
- [kbfs](https://keybase.io/docs/kbfs) - Distributed filesystem with end-to-end encryption. You can have private, shared and public folders.
- [borgbackup](https://borgbackup.readthedocs.io/en/stable/usage/mount.html) - Mount your deduplicated, compressed and encrypted backups for ease of browsing.

> 感觉在WSL2中访问Windows下的文件就是利用的这类东西，只不过由于是利用网络作为桥梁在性能上不堪重任。

## Backups

Any data that you haven’t backed up is data that could be gone at any moment, forever. It’s easy to copy data around, it’s hard to reliably backup data. Here are some good backup basics and the pitfalls of some approaches.

> pitfalls 陷阱;

First, a copy of the data in the same disk is not a backup, because the disk is the single point of failure for all the data. Similarly, an external drive in your home is also a weak backup solution since it could be lost in a fire/robbery/&c. Instead, having an off-site backup is a recommended practice.

Synchronization solutions are not backups. For instance, Dropbox/GDrive are convenient solutions, but when data is erased or corrupted they propagate the change. For the same reason, disk mirroring solutions like RAID are not backups. They don’t help if data gets deleted, corrupted or encrypted by ransomware.

> synchronization 同步; erase 擦除; corrupted 损坏的; propagate 传播; ransomware 勒索软件;

Some core features of good backups solutions are versioning, deduplication and security. Versioning backups ensure that you can access your history of changes and efficiently recover files. Efficient backup solutions use data deduplication to only store incremental changes and reduce the storage overhead. Regarding security, you should ask yourself what someone would need to know/have in order to read your data and, more importantly, to delete all your data and associated backups. Lastly, blindly trusting backups is a terrible idea and you should verify regularly that you can use them to recover data.

> deduplication 重复数据删除; incremental 增加的; 

Backups go beyond local files in your computer. Given the significant growth of web applications, large amounts of your data are only stored in the cloud. For instance, your webmail, social media photos, music playlists in streaming services or online docs are gone if you lose access to the corresponding accounts. Having an offline copy of this information is the way to go, and you can find online tools that people have built to fetch the data and save it.

> 这种数据备份未免有点过于未雨绸缪了;

## APIs

We’ve talked a lot in this class about using your computer more efficiently to accomplish *local* tasks, but you will find that many of these lessons also extend to the wider internet. Most services online will have “APIs” that let you programmatically access their data.

> 讲道理，中国的政府机构也应该设计一套比较完善的数据接口供公众使用，这也应该是“数字政府”的重要组成部分。

Most of these APIs have a similar format. They are structured URLs, often rooted at `api.service.com`, where the path and query parameters indicate what data you want to read or what action you want to perform.

Some APIs require authentication, and this usually takes the form of some sort of secret *token* that you need to include with the request. You should read the documentation for the API to see what the particular service you are looking for uses, but “[OAuth](https://www.oauth.com/)” is a protocol you will often see used. At its heart, OAuth is a way to give you tokens that can “act as you” on a given service, and can only be used for particular purposes. Keep in mind that these tokens are *secret*, and anyone who gains access to your token can do whatever the token allows under *your* account!

> 比如`github`就有相关的token供开发者可以自己生成。

## Common command-line flags/patterns

Command-line tools vary a lot, and you will often want to check out their `man` pages before using them. They often share some common features though that can be good to be aware of:

- Most tools support some kind of `--help` flag to display brief usage instructions for the tool.
- Many tools that can cause irrevocable change support the notion of a “dry run” in which they only print what they *would have done*, but do not actually perform the change. Similarly, they often have an “interactive” flag that will prompt you for each destructive action.
- You can usually use `--version` or `-V` to have the program print its own version (handy for reporting bugs!).
- Almost all tools have a `--verbose` or `-v` flag to produce more verbose output. You can usually include the flag multiple times (`-vvv`) to get *more* verbose output, which can be handy for debugging. Similarly, many tools have a `--quiet` flag for making it only print something on error.

> verbose 冗长的;

- In many tools, `-` in place of a file name means “standard input” or “standard output”, depending on the argument.
- Possibly destructive tools are generally not recursive by default, but support a “recursive” flag (often `-r`) to make them recurse.
- Sometimes, you want to pass something that *looks* like a flag as a normal argument. For example, imagine you wanted to remove a file called `-r`. Or you want to run one program “through” another, like `ssh machine foo`, and you want to pass a flag to the “inner” program (`foo`). The special argument `--` makes a program *stop* processing flags and options (things starting with `-`) in what follows, letting you pass things that look like flags without them being interpreted as such: `rm -- -r` or `ssh machine --for-ssh -- foo --for-foo`.

## Windows Managers

Most of you are used to using a “drag and drop” window manager, like what comes with Windows, macOS, and Ubuntu by default. There are windows that just sort of hang there on screen, and you can drag them around, resize them, and have them overlap one another. But these are only one *type* of window manager, often referred to as a “floating” window manager. There are many others, especially on Linux. A particularly common alternative is a “tiling” window manager. In a tiling window manager, windows never overlap, and are instead arranged as tiles on your screen, sort of like panes in tmux. With a tiling window manager, the screen is always filled by whatever windows are open, arranged according to some *layout*. If you have just one window, it takes up the full screen. If you then open another, the original window shrinks to make room for it (often something like 2/3 and 1/3). If you open a third, the other windows will again shrink to accommodate the new window. Just like with tmux panes, you can navigate around these tiled windows with your keyboard, and you can resize them and move them around, all without touching the mouse. They are worth looking into!

> 有·高级

## VPNs

VPNs are all the rage these days, but it’s not clear that’s for [any good reason](https://gist.github.com/joepie91/5a9909939e6ce7d09e29). You should be aware of what a VPN does and does not get you. A VPN, in the best case, is *really* just a way for you to change your internet service provider as far as the internet is concerned. All your traffic will look like it’s coming from the VPN provider instead of your “real” location, and the network you are connected to will only see encrypted traffic.

While that may seem attractive, keep in mind that when you use a VPN, all you are really doing is shifting your trust from you current ISP to the VPN hosting company. Whatever your ISP *could* see, the VPN provider now sees *instead*. If you trust them *more* than your ISP, that is a win, but otherwise, it is not clear that you have gained much. If you are sitting on some dodgy unencrypted public Wi-Fi at an airport, then maybe you don’t trust the connection much, but at home, the trade-off is not quite as clear.

You should also know that these days, much of your traffic, at least of a sensitive nature, is *already* encrypted through HTTPS or TLS more generally. In that case, it usually matters little whether you are on a “bad” network or not – the network operator will only learn what servers you talk to, but not anything about the data that is exchanged.

Notice that I said “in the best case” above. It is not unheard of for VPN providers to accidentally misconfigure their software such that the encryption is either weak or entirely disabled. Some VPN providers are malicious (or at the very least opportunist), and will log all your traffic, and possibly sell information about it to third parties. Choosing a bad VPN provider is often worse than not using one in the first place.

> 确实，尽管由于各种各样的原因，我们可能需要VPN的辅助，但是VPN并不是可信的。

## Markdown

> Markdown yyds

You have probably seen Markdown already, or at least some variant of it. Subsets of it are used and supported almost everywhere, even if it’s not under the name Markdown. At its core, Markdown is an attempt to codify the way that people already often mark up text when they are writing plain text documents. Emphasis (*italics*) is added by surrounding a word with `*`. Strong emphasis (**bold**) is added using `**`. Lines starting with `#` are headings (and the number of `#`s is the subheading level). Any line starting with `-` is a bullet list item, and any line starting with a number + `.` is a numbered list item. Backtick is used to show words in `code font`, and a code block can be entered by indenting a line with four spaces or surrounding it with triple-backticks:

````markdown
```
code here
```
````

To add a link, place the *text* for the link in square brackets, and the URL immediately following that in parentheses: `[name](url)`. Markdown is easy to get started with, and you can use it nearly everywhere.

## Hammerspoon

> Hammerspoon 很强大，但是只支持macOS，对不起，穷苦人家告辞。

## Booting+Live USBs

When your machine boots up, before the operating system is loaded, the [BIOS](https://en.wikipedia.org/wiki/BIOS)/[UEFI](https://en.wikipedia.org/wiki/Unified_Extensible_Firmware_Interface) initializes the system. During this process, you can press a specific key combination to configure this layer of software. For example, your computer may say something like “Press F9 to configure BIOS. Press F12 to enter boot menu.” during the boot process. You can configure all sorts of hardware-related settings in the BIOS menu. You can also enter the boot menu to boot from an alternate device instead of your hard drive.

[Live USBs](https://en.wikipedia.org/wiki/Live_USB) are USB flash drives containing an operating system. You can create one of these by downloading an operating system (e.g. a Linux distribution) and burning it to the flash drive. This process is a little bit more complicated than simply copying a `.iso` file to the disk. There are tools like [UNetbootin](https://unetbootin.github.io/) to help you create live USBs.

Live USBs are useful for all sorts of purposes. Among other things, if you break your existing operating system installation so that it no longer boots, you can use a live USB to recover data or fix the operating system.

> 中国人对于这个更熟悉的名称是PE盘。

## Docker, Vagrant, VMs, Cloud

[Virtual machines](https://en.wikipedia.org/wiki/Virtual_machine) and similar tools like containers let you emulate a whole computer system, including the operating system. This can be useful for creating an isolated environment for testing, development, or exploration (e.g. running potentially malicious code).

[Vagrant](https://www.vagrantup.com/) is a tool that lets you describe machine configurations (operating system, services, packages, etc.) in code, and then instantiate VMs with a simple `vagrant up`. [Docker](https://www.docker.com/) is conceptually similar but it uses containers instead.

You can also rent virtual machines on the cloud, and it’s a nice way to get instant access to:

- A cheap always-on machine that has a public IP address, used to host services
- A machine with a lot of CPU, disk, RAM, and/or GPU
- Many more machines than you physically have access to (billing is often by the second, so if you want a lot of computing for a short amount of time, it’s feasible to rent 1000 computers for a couple of minutes)

## Notebook Programming

[Notebook programming environments](https://en.wikipedia.org/wiki/Notebook_interface) can be really handy for doing certain types of interactive or exploratory development. Perhaps the most popular notebook programming environment today is [Jupyter](https://jupyter.org/), for Python (and several other languages). [Wolfram Mathematica](https://www.wolfram.com/mathematica/) is another notebook programming environment that’s great for doing math-oriented programming.

## GitHub

[GitHub](https://github.com/) is one of the most popular platforms for open-source software development. Many of the tools we’ve talked about in this class, from [vim](https://github.com/vim/vim) to [Hammerspoon](https://github.com/Hammerspoon/hammerspoon), are hosted on GitHub. It’s easy to get started contributing to open-source to help improve the tools that you use every day.

There are two primary ways in which people contribute to projects on GitHub:

- Creating an [issue](https://help.github.com/en/github/managing-your-work-on-github/creating-an-issue). This can be used to report bugs or request a new feature. Neither of these involves reading or writing code, so it can be pretty lightweight to do. High-quality bug reports can be extremely valuable to developers. Commenting on existing discussions can be helpful too.

- Contribute code through a [pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests). This is generally more involved than creating an issue. You can [fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) a repository on GitHub, clone your fork, create a new branch, make some changes (e.g. fix a bug or implement a feature), push the branch, and then [create a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request). After this, there will generally be some back-and-forth with the project maintainers, who will give you feedback on your patch. Finally, if all goes well, your patch will be merged into the upstream repository. Often times, larger projects will have a contributing guide, tag beginner-friendly issues, and some even have mentorship programs to help first-time contributors become familiar with the project.

> 没有什么是比合作开发一个开源软件更令人激动的了。

> 昨天我搞懂了`GitHub`和`GitLab`的区别，顺便在这里记一下
>
> - GitHub是一个支持`git`的代码托管网站，只是不少的开源软件托管在上面。
> - GitLab则是一个支持`git`的软件开发平台，相当是是一个用来搭建GitHub的软件。
