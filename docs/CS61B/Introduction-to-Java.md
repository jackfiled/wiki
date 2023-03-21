# 对于Java的初步介绍

## Hello, World

我们首先来看一个会打印出“hello, world!”的程序：

```java
public class HelloWorld {
	public static void main(String[] args) {
		System.out.println("Hello, world!");
	}
]
```

在这里我们需要注意到：

* 程序中含有一个类的定义。在Java中，所有的代码都必须在类中。
* 程序中被运行的代码都在一个被称为`main`​的函数中。
* 代码块的开始和结束采用中括号作为标记。
* 语句需要以分号结尾

### 静态类型

```java
public class HelloNumbers {
	public static void main(String[] args) {
		int x = 0;
		while ( x < 10 ) {
			System.out.println(x);
			x = x + 1;
		}
	}
}
```

1. 在使用变量之前我们必须要申明变量。
2. 变量必须有着明确的类型。
3. 变量的类型一经确定就不能改变。
4. 变量的类型在运行**之前**​就已经确定。

‍

‍
