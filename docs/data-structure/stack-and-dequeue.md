# 栈与队列

## 线性表、栈、队列的比较

栈和队列是两种广泛使用的线性数据结构，他们的主要不同在于操作方式上。栈必须按照“后进先出”的规则进行操作，队列必须按照“先进先出”的规则进行操作。同线性表相比，这两种数据结构受到的约束比一般的线性表更多，是受到约束的线性表。

> 栈和队列操作并不复杂，关键在于能够用这些数据结构来完成什么样的任务。

## 栈

栈是一种特殊的线性表，插入和删除的操作之恶能在表尾进行，具有**后进先出**的特点。栈相关的术语有：

- 栈顶：实际是线性表的表尾
- 栈底：实际是线性表的表头
- 入栈：将元素加入线性表
- 出栈：将元素从线性表中删除

栈相关的操作有：

- 生成空栈操作
- 栈判空操作
- 数据元素入栈操作
- 数据元素出栈操作
- 取栈顶元素操作
- 栈清空操作
- 计算栈中元素个数操作

栈按照实现方式可以分为顺序栈和链式栈，分别由顺序表和链式表实现，在实践中顺序栈使用更频繁。

### 顺序栈

栈中的数据元素采用一组连续的存储空间来存放。栈底的位置可以设置在存储空间的一个端点，栈顶的位置可以有两种方式：当前末尾元素所在的位置和当前末尾元素所在的下一个位置。一般常用第二种方式，在栈为空时，栈底和栈顶的位置相同。

顺序栈结构体定义

```cpp
struct {
	int* base;
	int* top;
	int stack_size;
} sq_stack;
```

- 栈空的条件：`top = base`，此时出栈会引发下溢问题
- 栈满的条件：`top = base + array_max`其中`array_max`是数组的大小，此时入栈引发上溢问题

> 懒得写代码捏，等需要用到栈的时候再说

#### 生成空栈

```cpp
bool init_stack(stack& s)
{
    if (s.stack_size == 0) 
    {
        // 如果未正确设置栈的长度
        // 设置为默认长度
        s.stack_size = MAX_STACKS_SIZE; 
    }

    int* address = (int*)malloc(s.stack_size * sizeof(int));
    if (address == nullptr)
    {
        // 分配空间失败
        return false;
    }

    // 默认均设置为栈底地址
    s.top = address;
    s.base = address;
    return true;
}
```

#### 栈判空

```cpp
bool is_empty(stack& s)
{
    return s.base == s.top;
}
```

#### 栈判满

```cpp
bool is_full(stack& s)
{
    return s.base + s.stack_size == s.top;
}
```

#### 入栈

```cpp
bool stack_push(stack& s, int value)
{
    if(is_full(s))
    {
        // 栈已满
        return false;
    }

    *s.top = value;
    s.top++;
    return true;
}
```

#### 出栈

```cpp
bool stack_pop(stack& s, int* result)
{
    if(is_empty(s))
    {
        // 栈空
        return false;
    }

    *s.top--;
    *result = *s.top;
    return true;
}
```

### 链式栈

链式栈在编写上比顺序栈更加复杂。比如在出栈的时候，我们需要找到上一个节点的地址，这对于一个单向链表来说是十分复杂的操作。因此，我们将`top`指针置为链表的头节点，而把`base`指向链表的尾节点。不过使用链表的好处就是让空间的利用率大大提升，而且链式栈没有栈满的情况，在不考虑内存大小的情况下，链式栈可以认为是无限大的，同时也就没有了判空的方法。

#### 结构体定义

使用链式栈需要定义两个结构体：链表的节点和栈。

链表相关的类型定义：

```cpp
typedef struct node {
    int value;
    struct node* next;
} node_t;

typedef node_t* node_p;
```

栈相关的结构体定义：

```cpp
typedef struct {
    node_p top;
    node_p base;
} stack;
```

#### 初始化栈

```cpp
bool init_stack(stack& s)
{
    node_p address = (node_p)malloc(sizeof(node_t));

    if (address == nullptr)
    {
        // 空间分配失败
        return false;
    }

    s.top = address;
    s.base = address;
    return true;
}
```

在设计链式栈时，仍使用顺序栈时的假设，即当前栈顶的位置为末尾元素的下一个位置。

#### 判空

```cpp
bool is_empty(stack& s)
{
    return s.top == s.base;
}
```

#### 入栈

```cpp
bool stack_push(stack& s, int value)
{
    node_p node = (node_p)malloc(sizeof(node_t));

    if (node == nullptr)
    {
        // 创建空间失败
        return false;
    }

    s.top->value = value;
    node->next = s.top;
    s.top = node;
    return true;
}
```

#### 出栈

```cpp
bool stack_pop(stack& s, int* result)
{
    if(is_empty(s))
    {
        // 栈为空
        return false;
    }

    node_p node = s.top;
    s.top = s.top->next;
    *result = s.top->value;
    free(node);
    return true;
}
```

入栈和出栈的操作记住栈顶时链表的头节点就行。

### 栈的应用

#### 数制的转换

我们常常使用除k取余法来实现数制的转换，在除法完成了之后，需要将得到的余数逆序写出。这个逆序写出的过程可以通过栈来实现，在计算的时候，将计算的结构压入栈中，在输出的时候将值依次弹出就得到了转换的结果。

#### 括号匹配

在编译的过程中，括号的匹配是一个十分重要的课题。由于后出现的括号序号先进行匹配，我们可以利用栈来完成这个过程。遍历整个文本，将遇到的左括号压入栈中，遇到右括号就检测它与栈顶的括号是否匹配，如果匹配就出栈继续检测，反之程序退出。

