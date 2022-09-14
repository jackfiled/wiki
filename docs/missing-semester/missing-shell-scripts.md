---
title: missing-shell-scripts
typora-root-url: missing-shell-scripts
date: 2022-04-05 14:02:48
tags:
  - missing
  - 学习资料
toc: true
---


# The missing semester in the CS

## Introduction

本篇是MIT的公开课程[计算机教学中消失的一学期](https://missing.csail.mit.edu/)的学习笔记第二篇。在笔记中，我将摘抄我认为是重点的语句，文中举出的例子我会在自己的电脑上操作一遍并给出其产生的结果。

本篇为`Shell Tools and Scripting`部分的学习笔记，课程地址为[Shell-tools](https://missing.csail.mit.edu/2020/shell-tools/)

<!--more-->

## Shell Scripting

Shell scripts are the next step in complexity. Most shells have their own scripting language with variables, control flow and its own syntax. What makes shell scripting different from other scripting programming language is that it is optimized for performing shell-related tasks. Thus, creating command pipelines, saving results into files, and reading from standard input are primitives in shell scripting, which makes it easier to use than general purpose scripting languages. For this section we will focus on bash scripting since it is the most common.

> `primitive`表示原始人，原函数的意思，这里表示管道，保存到文件等等的工具是`bash`本来就有的，可以使在`bash`脚本中的工作更加顺利。

To assign variables in bash, use the syntax `foo=bar` and access the value of the variable with `$foo`. Note that `foo = bar` will not work since it is interpreted as calling the `foo` program with arguments `=` and `bar`. In general, in shell scripts the space character will perform argument splitting. This behavior can be confusing to use at first, so always check for that.

Strings in bash can be defined with `'` and `"` delimiters, but they are not equivalent. Strings delimited with `'` are literal strings and will not substitute variable values whereas `"` delimited strings will.

> `subsitute` 是“代替，替代”的意思。

```bash
ricardo@g15:~$ foo=bar
ricardo@g15:~$ echo "$foo"
bar
ricardo@g15:~$ echo '$foo'
$foo
```

> 直接用`""`就可以进行字符串内插，还是非常方便的。

As with most programming languages, bash supports control flow techniques including `if`, `case`, `while` and `for`. Similarly, `bash` has functions that take arguments and can operate with them. Bash uses a variety of special variables to refer to arguments, error codes, and other relevant variables. Below is a list of some of them.

- `$0` Name of the script
- `$1` to `$9` - Arguments to the script. `$1` is the first argument and so on.
- `$@` - All the arguments
- `$#` - Number of arguments
- `$?` - Return code of the previous command
- `$$` - Process identification number (PID) for the current script
- `!!` - Entire last command, including arguments. 
- `$_` - Last argument from the last command. 

```bash
ricardo@g15:/tmp/missing$ date
Sat Apr  2 18:11:40 CST 2022
ricardo@g15:/tmp/missing$ !!
date
Sat Apr  2 18:11:42 CST 2022
ricardo@g15:/tmp/missing$ ls -l
total 8
-rwxrwxrwx 1 ricardo ricardo 61 Mar 28 08:47 semester
-rw-r--r-- 1 ricardo ricardo 34 Apr  2 18:07 shell.sh
ricardo@g15:/tmp/missing$ echo $_
-l
```

Commands will often return output using `STDOUT`, errors through `STDERR`, and a Return Code to report errors in a more script-friendly manner. A value of 0 usually means everything went OK; anything different from 0 means an error occurred.

Exit codes can be used to conditionally execute commands using `&&` (and operator) and `||` (or operator), both of which are short-circuiting operators. Commands can also be separated within the same line using a semicolon `;`. The `true` program will always have a 0 return code and the `false` command will always have a 1 return code.

```bash
ricardo@g15:/tmp/missing$ false || echo "Oops, fail"
Oops, fail
ricardo@g15:/tmp/missing$ true || echo "Will not be printed"
ricardo@g15:/tmp/missing$ true && echo "Things went well"
Things went well
ricardo@g15:/tmp/missing$ false && echo "Will not be printed"
ricardo@g15:/tmp/missing$ true ; echo "This will always run"
This will always run
ricardo@g15:/tmp/missing$ false ; echo "This will always run"
This will always run
```

Another common pattern is wanting to get the output of a command as a variable. This can be done with *command substitution*. Whenever you place `$( CMD )` it will execute `CMD`, get the output of the command and substitute it in place. 

```bash 
ricardo@g15:/tmp/missing$ cat shell.sh
#!/bin/bash

echo "Starting program at $(date)" # Date will be substituted

echo "Running program $0 with $# arguments with pid $$"

for file in "$@"; do
    grep foobar "$file" > /dev/null 2> /dev/null
    # When pattern is not found, grep has exit status 1
    # We redirect STDOUT and STDERR to a null register since we do not care about them
    if [[ $? -ne 0 ]]; then
        echo "File $file does not have any foobar, adding one"
        echo "# foobar" >> "$file"
    fi
done
ricardo@g15:/tmp/missing$ cat temp
foobar
ricardo@g15:/tmp/missing$ ./shell.sh
Starting program at Sat Apr  2 20:20:05 CST 2022
Running program ./shell.sh with 0 arguments with pid 10569
ricardo@g15:/tmp/missing$ ./shell.sh temp
Starting program at Sat Apr  2 20:20:16 CST 2022
Running program ./shell.sh with 1 arguments with pid 10573
ricardo@g15:/tmp/missing$ echo "foo" > temp
ricardo@g15:/tmp/missing$ cat temp
foo
ricardo@g15:/tmp/missing$ ./shell.sh temp
Starting program at Sat Apr  2 20:21:15 CST 2022
Running program ./shell.sh with 1 arguments with pid 10577
File temp does not have any foobar, adding one
```

- Wildcards - Whenever you want to perform some sort of wildcard matching, you can use `?` and `*` to match one or any amount of characters respectively. For instance, given files `foo`, `foo1`, `foo2`, `foo10` and `bar`, the command `rm foo?` will delete `foo1` and `foo2` whereas `rm foo*` will delete all but `bar`.
- Curly braces `{}` - Whenever you have a common substring in a series of commands, you can use curly braces for bash to expand this automatically. This comes in very handy when moving or converting files.

Note that scripts need not necessarily be written in bash to be called from the terminal. The kernel knows to execute this script with a python interpreter instead of a shell command because we included a [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)) line at the top of the script. It is good practice to write shebang lines using the [`env`](https://www.man7.org/linux/man-pages/man1/env.1.html) command that will resolve to wherever the command lives in the system, increasing the portability of your scripts. To resolve the location, `env` will make use of the `PATH` environment variable we introduced in the first lecture. For this example the shebang line would look like `#!/usr/bin/env python`.

## Shell Tools

### Finding how to use commands

The first-order approach is to call said command with the `-h` or `--help` flags. A more detailed approach is to use the `man` command. Short for manual, [`man`](https://www.man7.org/linux/man-pages/man1/man.1.html) provides a manual page (called manpage) for a command you specify.

Sometimes manpages can provide overly detailed descriptions of the commands, making it hard to decipher what flags/syntax to use for common use cases. [TLDR pages](https://tldr.sh/) are a nifty complementary solution that focuses on giving example use cases of a command so you can quickly figure out which options to use. 

### Finding files

One of the most common repetitive tasks that every programmer faces is finding files or directories. All UNIX-like systems come packaged with [`find`](https://www.man7.org/linux/man-pages/man1/find.1.html), a great shell tool to find files. `find` will recursively search for files matching some criteria.

```bash
# Find all directories named src
find . -name src -type d
# Find all python files that have a folder named test in their path
find . -path '*/test/*.py' -type f
# Find all files modified in the last day
find . -mtime -1
# Find all zip files with size in range 500k to 10M
find . -size +500k -size -10M -name '*.tar.gz'
# Delete all files with .tmp extension
find . -name '*.tmp' -exec rm {} \;
# Find all PNG files and convert them to JPG
find . -name '*.png' -exec convert {} {}.jpg \;
```

For instance, [`fd`](https://github.com/sharkdp/fd) is a simple, fast, and user-friendly alternative to `find`. It offers some nice defaults like colorized output, default regex matching, and Unicode support. 

Most would agree that `find` and `fd` are good, but some of you might be wondering about the efficiency of looking for files every time versus compiling some sort of index or database for quickly searching. That is what [`locate`](https://www.man7.org/linux/man-pages/man1/locate.1.html) is for. `locate` uses a database that is updated using [`updatedb`](https://www.man7.org/linux/man-pages/man1/updatedb.1.html). In most systems, `updatedb` is updated daily via [`cron`](https://www.man7.org/linux/man-pages/man8/cron.8.html). Therefore one trade-off between the two is speed vs freshness. Moreover `find` and similar tools can also find files using attributes such as file size, modification time, or file permissions, while `locate` just uses the file name.

### Finding code

A common scenario is wanting to search for all files that contain some pattern, along with where in those files said pattern occurs. To achieve this, most UNIX-like systems provide [`grep`](https://www.man7.org/linux/man-pages/man1/grep.1.html), a generic tool for matching patterns from the input text. 

### Finding shell commands

The first thing to know is that typing the up arrow will give you back your last command, and if you keep pressing it you will slowly go through your shell history.

The `history` command will let you access your shell history programmatically. It will print your shell history to the standard output. If we want to search there we can pipe that output to `grep` and search for patterns. `history | grep find` will print commands that contain the substring “find”.

In most shells, you can make use of `Ctrl+R` to perform backwards search through your history. After pressing `Ctrl+R`, you can type a substring you want to match for commands in your history. As you keep pressing it, you will cycle through the matches in your history. 

Another cool history-related trick I really enjoy is **history-based autosuggestions**. First introduced by the [fish](https://fishshell.com/) shell, this feature dynamically autocompletes your current shell command with the most recent command that you typed that shares a common prefix with it. It can be enabled in [zsh](https://github.com/zsh-users/zsh-autosuggestions) and it is a great quality of life trick for your shell.

### Directory Navigation

As with the theme of this course, you often want to optimize for the common case. Finding frequent and/or recent files and directories can be done through tools like [`fasd`](https://github.com/clvv/fasd) and [`autojump`](https://github.com/wting/autojump). Fasd ranks files and directories by [*frecency*](https://web.archive.org/web/20210421120120/https://developer.mozilla.org/en-US/docs/Mozilla/Tech/Places/Frecency_algorithm), that is, by both *frequency* and *recency*. By default, `fasd` adds a `z` command that you can use to quickly `cd` using a substring of a *frecent* directory. 

More complex tools exist to quickly get an overview of a directory structure: [`tree`](https://linux.die.net/man/1/tree), [`broot`](https://github.com/Canop/broot) or even full fledged file managers like [`nnn`](https://github.com/jarun/nnn) or [`ranger`](https://github.com/ranger/ranger).

> 学完感觉自己还是不会用bash编写脚本，建议在看看专门讲bash脚本编写的教程

## Exercise

1. 利用`man ls`查看`ls`相关的参数，满足自己的要求
   
   ```bash
   ricardo@g15:~$ ls -l -h -t
   total 20K
   drwxr-xr-x 2 ricardo ricardo 4.0K Apr  5 11:42 tmp
   drwxr-xr-x 8 ricardo ricardo 4.0K Mar 24 20:11 code
   drwxr-xr-x 2 ricardo ricardo 4.0K Mar 16 21:26 bin
   drwxr-xr-x 4 ricardo ricardo 4.0K Mar 16 21:25 download
   drwxr-xr-x 3 ricardo ricardo 4.0K Jan 21 18:21 github
   ```
   
2. 直接在`.bashrc`文件里面添加

   ```bash
   path=/home/ricardo
   
   marco () {
     path=$(pwd)
   }
   
   polo () {
     cd $path
   }
   ```

   测试一下

   ```bash
   ricardo@g15:~/tmp$ marco
   ricardo@g15:~/tmp$ cd ..
   ricardo@g15:~$ polo
   ricardo@g15:~/tmp$
   ```

3. 将给出的运行代码保存为`exe.sh`,编写下列测试代码 

   ```bash
   #!/usr/bin/env bash
   
   number=0
   
   while true; do
       ((number++))
       result=$(bash ./exe.sh)
       if [ "$?" = "1" ]; then #这里中括号和需要比较的式子之间必须要有空格，否则会报错
           echo $result
           echo "It has run for $number times."
           break
       fi
   done
   ```

   测试

   ```bash
   ricardo@g15:~/tmp$ bash test.sh
   The error was using magic numbers
   Something went wrong
   It has run for 228 times.
   ```

4. 将找到的文件通过`xargs`传递给压缩程序
   
   ```bash
   find . -name '*.html' | xargs tar
   ```



