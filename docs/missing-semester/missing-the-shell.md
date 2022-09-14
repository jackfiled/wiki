---
title: missing-the-shell
typora-root-url: missing-the-shell
date: 2022-04-05 13:48:39
tags:
   - missing
   - 学习资料
toc: true
---


# The missing semester in the CS

## Introduction

本篇是MIT的公开课程[计算机教学中消失的一学期](https://missing.csail.mit.edu/)的学习笔记第一篇。在笔记中，我将摘抄我认为是重点的语句，文中举出的例子我会在自己的电脑上操作一遍并给出其产生的结果。

本篇为`Shell`部分的学习笔记，课程地址为[Course-Shell](https://missing.csail.mit.edu/2020/course-shell/)

<!--more-->

## what is the shell?

Run programs, give them input, and inspect their output in a semi-structured way.

This course will introduce the bash, Bourne Again Shell. To run open a shell prompt(where you can type commands),  you first need a *terminal*.

> 我在Windows的Windows Subsystem for linux里学习这个玩意儿

## Using the shell

```bash
ricardo@g15:~$
```

The main textual interface to the shell. The "missing" means you are in the machine "missing", and your "current working directory". or where you currently are, is `~`(short for home).

At this prompt you can type a *command*, which will then be interpreted by the shell.

```bash
ricardo@g15:~$ date
Sun Mar 27 21:51:49 CST 2022
ricardo@g15:~$
```

The shell parses the command by splitting it by whitespace, and then runs the program indicated by the first word, supplying each subsequent word as an argument that the program can access. If you want to provide an argument that contains spaces or other special characters (like a directory named “My Photos”), you can either quote the argument with `'` or `"` (`"My Photos"`), or escape just the relevant characters with `\` (`My\ Photos`).

the shell is a programming environment, just like Python or Ruby, and so it has variables, conditionals, loops, and functions. When you run commands in your shell, you are really writing a small bit of code that your shell interprets. If the shell is asked to execute a command that doesn’t match one of its programming keywords, it consults an *environment variable* called `$PATH` that lists which directories the shell should search for programs when it is given a command:

```bash
ricardo@g15:~$ echo $PATH
/home/ricardo/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/usr/lib/wsl/lib
ricardo@g15:~$ which echo
/usr/bin/echo
ricardo@g15:~$ /usr/bin/echo $PATH
/home/ricardo/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/usr/lib/wsl/lib
```

When we run the `echo` command, the shell sees that it should execute the program `echo`, and then searches through the `:`-separated list of directories in `$PATH` for a file by that name. When it finds it, it runs it (assuming the file is *executable*; more on that later). We can find out which file is executed for a given program name using the `which` program. We can also bypass `$PATH` entirely by giving the *path* to the file we want to execute.

## Navigating in the shell

A path on the shell is a delimited(分隔的) list of directories; separated by `/` on Linux and macOS, where  the path `/` is the root of the file system, under which all directories and files lie.A path that starts with `/` is called an *absolute* path. Any other path is a *relative* path. Relative paths are relative to the current working directory, which we can see with the `pwd` command and change with the `cd` command. In a path, `.` refers to the current directory, and `..` to its parent directory.

```bash
ricardo@g15:~$ pwd
/home/ricardo
ricardo@g15:~$ cd /home
ricardo@g15:/home$ cd ..
ricardo@g15:/$ pwd
/
ricardo@g15:/$ cd ./home/
ricardo@g15:/home$ pwd
/home
ricardo@g15:/home$ cd missing
-bash: cd: missing: No such file or directory
ricardo@g15:/home$ cd ricardo/
ricardo@g15:~$ pwd
/home/ricardo
ricardo@g15:~$ ../../usr/bin/echo hello
hello
```

In general, when we run a program, it will operate in the current directory unless we tell it otherwise. For example, it will usually search for files there, and create new files there if it needs to.

To see what lives in a given directory, we use the `ls` command

```bash
ricardo@g15:~$ ls
bin  code  download  github  tmp
ricardo@g15:~$ cd ..
ricardo@g15:/home$ ls
ricardo
ricardo@g15:/home$ cd ..
ricardo@g15:/$ ls
bin  boot  build  dev  etc  home  init  lib  lib32  lib64  libx32  lost+found  media  mnt  opt  proc  root  run  sbin  snap  srv  sys  tmp  usr  var
```

Unless a directory is given as its first argument, `ls` will print the contents of the current directory. 

Most commands accept flags and options (flags with values) that start with `-` to modify their behavior. Usually, running a program with the `-h` or `--help` flag will print some help text that tells you what flags and options are available.

For example, `ls --help` tells us

```bash
  -l                         use a long listing format
```

```bash
ricardo@g15:/$ ls -l /home
total 4
drwxr-xr-x 15 ricardo ricardo 4096 Mar 25 19:14 ricardo
```

This gives us a bunch more information about each file or directory present. First, the `d` at the beginning of the line tells us that `ricardo` is a directory. Then follow three groups of three characters (`rwx`). These indicate what permissions the owner of the file (`ricardo`), the owning group (`ricardo`), and everyone else respectively have on the relevant item. A `-` indicates that the given principal does not have the given permission. Above, only the owner is allowed to modify (`w`) the `ricardo` directory (i.e., add/remove files in it). To enter a directory, a user must have “search” (represented by “execute”: `x`) permissions on that directory (and its parents). To list its contents, a user must have read (`r`) permissions on that directory. For files, the permissions are as you would expect. Notice that nearly all the files in `/bin` have the `x` permission set for the last group, “everyone else”, so that anyone can execute those programs.

Some other handy programs to know about at this point are `mv` (to rename/move a file), `cp` (to copy a file), and `mkdir` (to make a new directory).

> `mv`可以重命名大概就是把一个文件原地移动一下，移动的时候目标文件改个名（

If you ever want *more* information about a program’s arguments, inputs, outputs, or how it works in general, give the `man` program a try. It takes as an argument the name of a program, and shows you its *manual page*. Press `q` to exit.

## Connecting programs

In the shell, programs have two primary “streams” associated with them: their input stream and their output stream. When the program tries to read input, it reads from the input stream, and when it prints something, it prints to its output stream. Normally, a program’s input and output are both your terminal. That is, your keyboard as input and your screen as output. However, we can also rewire those streams!

The simplest form of redirection is `< file` and `> file`. These let you rewire the input and output streams of a program to a file respectively:

```bash
ricardo@g15:~$ echo hello > hello.txt
ricardo@g15:~$ cat hello.txt
hello
ricardo@g15:~$ cat < hello.txt
hello
ricardo@g15:~$ cat < hello.txt > hello2.txt
ricardo@g15:~$ cat hello2.txt
hello
```

Demonstrated(展示，证明) in the example above, `cat` is a program that con`cat`enates files. When given file names as arguments, it prints the contents of each of the files in sequence to its output stream. But when `cat` is not given any arguments, it prints contents from its input stream to its output stream (like in the third example above).

> 上文中的`concatenate` 是一个单词，表示连接，这里的大概意思是表示cat的含义是连接

You can also use `>>`to append to a file.

Where this kind of input/output redirection really shines is in the use of *pipes*. The `|` operator lets you “chain” programs such that the output of one is the input of another:

```bash
ricardo@g15:~$ ls -l / | tail -n1
drwxr-xr-x  13 root root   4096 Apr 23  2020 var
ricardo@g15:~$ curl --head --silent baidu.com | grep --ignore-case content-length | cut --delimiter=' ' -f2
81
```

> 在教程中是访问了google.com，我修改为baidu.com

## A versatile and powerful tool

> versatile原义是指多才多艺的

On most Unix-like systems, one user is special: the “root” user. You may have seen it in the file listings above. The root user is above (almost) all access restrictions, and can create, read, update, and delete any file in the system. You will not usually log into your system as the root user though, since it’s too easy to accidentally break something. Instead, you will be using the `sudo` command. As its name implies, it lets you “do” something “as su” (short for “super user”, or “root”). When you get permission denied errors, it is usually because you need to do something as root. Though make sure you first double-check that you really wanted to do it that way!

One thing you need to be root in order to do is writing to the `sysfs` file system mounted under `/sys`. `sysfs` exposes a number of kernel parameters as files, so that you can easily reconfigure the kernel on the fly without specialized tools.

> 这里`sysfs`"将一系列内核的参数利用文件的形式暴露出来"体现了Unix"文件就是系统“的设计思想。

> 这里教程通过在`/sys/class/backlight`下属的文件中写值的方式改变亮度，但是我Linux环境中并没有这个文件，也就是我的Linux不支持调节亮度。

>在这个例子中还提到了像`|`, `>`, `<`这类的操作是由shell程序来完成的，因此他们的执行权限仅仅是当前登录用户的权限，在写入一些需要高权限的文件是可能会出现`Permission denied`

## Exercises

1. 直接查看`$SHELL`变量就可以
   
   
   ```bash
   ricardo@g15:~$ echo $SHELL
   /bin/bash
   ```
   
2. 创建文件夹
   
   
   ```bash
   ricardo@g15:/tmp$ mkdir missing
   ```
   
3. 查看`touch`命令的用法
   
   ```bash	
   ricardo@g15:/tmp$ man touch
   ```

   > touch 就是改变一个文件的最后修改时间，如果没有就是创建
   
4. 利用`touch`创建文件
   
   ```bash
   ricardo@g15:/tmp$ touch missing/semester
   ```
   
5. 在文件中写入数据
   
   ```bash
   ricardo@g15:/tmp/missing$ touch semester
   ricardo@g15:/tmp/missing$ echo '#!/bin/sh' > semester
   ricardo@g15:/tmp/missing$ echo curl --head --silent https://missing.csail.mit.edu >> semester
   ricardo@g15:/tmp/missing$ cat semester
   #!/bin/sh
   curl --head --silent https://missing.csail.mit.edu
   ```
   
6. 尝试直接运行文件，发现文件没有直接被执行的权限
   
   ```bash
   ricardo@g15:/tmp/missing$ ./semester
   -bash: ./semester: Permission denied
   ricardo@g15:/tmp/missing$ ll
   total 32
   drwxr-xr-x 2 ricardo ricardo  4096 Mar 28 08:47 ./
   drwxrwxrwt 7 root    root    20480 Mar 28 08:38 ../
   -rw-r--r-- 1 ricardo ricardo    61 Mar 28 08:47 semester
   ```
   
7. 利用指定的解释器运行写入的程序
   
   ```bash
   ricardo@g15:/tmp/missing$ sh ./semester
   HTTP/2 200
   server: GitHub.com
   content-type: text/html; charset=utf-8
   last-modified: Fri, 04 Mar 2022 17:03:44 GMT
   access-control-allow-origin: *
   etag: "62224670-1f37"
   expires: Mon, 28 Mar 2022 00:59:14 GMT
   cache-control: max-age=600
   x-proxy-cache: MISS
   x-github-request-id: 3814:0F07:F7E95E:1022BDD:62410609
   accept-ranges: bytes
   date: Mon, 28 Mar 2022 00:49:14 GMT
   via: 1.1 varnish
   age: 0
   x-served-by: cache-itm18847-ITM
   x-cache: MISS
   x-cache-hits: 0
   x-timer: S1648428554.944692,VS0,VE156
   vary: Accept-Encoding
   x-fastly-request-id: e71e5760a7ed66425c9ad2eb9572e5a12b23bee6
   content-length: 7991
   ```
   
8. > chmod命令用于修改文件的权限

9. 修改文件的权限后直接执行
   
   ```bash
   ricardo@g15:/tmp/missing$ sudo chmod 777 semester
   [sudo] password for ricardo:
   ricardo@g15:/tmp/missing$ ll
   total 32
   drwxr-xr-x 2 ricardo ricardo  4096 Mar 28 08:47 ./
   drwxrwxrwt 7 root    root    20480 Mar 28 08:38 ../
   -rwxrwxrwx 1 ricardo ricardo    61 Mar 28 08:47 semester*
   ricardo@g15:/tmp/missing$ ./semester
   HTTP/2 200
   server: GitHub.com
   content-type: text/html; charset=utf-8
   last-modified: Fri, 04 Mar 2022 17:03:44 GMT
   access-control-allow-origin: *
   etag: "62224670-1f37"
   expires: Sun, 27 Mar 2022 14:38:22 GMT
   cache-control: max-age=600
   x-proxy-cache: MISS
   x-github-request-id: 083A:17A2:291CE6:2F68B7:62407485
   fastly-original-body-size: 0
   accept-ranges: bytes
   date: Mon, 28 Mar 2022 00:51:23 GMT
   via: 1.1 varnish
   age: 0
   x-served-by: cache-hkg17932-HKG
   x-cache: HIT
   x-cache-hits: 1
   x-timer: S1648428683.136854,VS0,VE260
   vary: Accept-Encoding
   x-fastly-request-id: 8271d76f868dc9951a9dc5b5d2b1da1d1ace0e89
   content-length: 7991
   ```
   
10. 用`grep`命令筛选指定的内容
    
    ```bash
    ricardo@g15:/tmp/missing$ ./semester | grep --ignore-case last-modified | cut --delimiter=':' -f2 > /home/ricardo/last-modified.txt
    ricardo@g15:/tmp/missing$ cat /home/ricardo/last-modified.txt
     Fri, 04 Mar 2022 17
    ```
    
11. >卡牌名称：WSL系统
    >
    >卡牌效果:当遇到使用`sysfs`的题目时，打出此牌，即可跳过该回合
