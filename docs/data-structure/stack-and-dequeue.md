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

#### 整型数简单表达式求解

算术表达式的求解需要遵循先乘除后加减，先左后右，括号内的先计算这三条规则。为了在运算的过程中满足这些规则，我们利用栈的特性，设计两个栈，一个栈存储操作数，一个栈存储操作符。在处理的过程中，依次读取表达式中的元素，如果是操作数就压入操作数栈中，如果是操作符就和操作符栈顶端的元素比较优先级，如果优先级低就执行运算，如果优先级高就将其压入操作符栈，如果优先级低，就执行栈顶的操作符，再将其压入操作符栈中，如此循环直到运算结束。

表达式有着三种形式，前缀式，中缀式，后缀式。在这当中，中缀式符合人类的书写习惯。而后缀式书写的顺序符合表达式运算的方式，在计算机有着更为广泛的使用。例如表达式:$5+(3 \times 4 -11)$

- 前缀式：$+-11 \times 435$

> 按照我的理解，前缀式就是后缀式逆过来

- 中缀式：$5+(3 \times 4 - 11)$
- 后缀式：$5 3 4 \times 11 - +$

#### 递归

虽然递归很牛逼，但是最好不用递归。

> 所以没有笔记

## 队列

队列式一种特殊的线性表，限定插入和删除操作分别在表的两端机型，具有先进先出的特点。表头的元素被称为**队头**​**`f`**，在这里进行出队的操作，表末尾的元素被称为**队尾**​**`r`**，在这里进行入队的操作。队列支持的操作和栈支持的操作近似。

队列有链式实现和顺序实现两种实现方式，但是链式实现更加的方便。

### 队列的链式存储实现

队列中节点结构体定义：

```cpp
struct node {
    int data;
    struct node* next;
};

typedef struct node node_t;
typedef struct node* node_p;
```

在实现队列的时候，我们需要两个指针：

- `front`队头指针
- `rear`队尾指针

为了使用这两个指针方便，我们可以再定义一个新的结构体：

```cpp
typedef struct {
    // 队头指针
    node_p front;
    // 队尾指针
    node_p rear;
} linked_quene;
```

#### 队列的初始化

```cpp
bool init_quene(linked_quene& q)
{
    q.front = nullptr;
    q.rear = nullptr;
    return true;
}
```

在初始化的时候，我们没有添加头节点。

#### 入队操作

```cpp
bool in_quene(linked_quene& q, int data)
{
    node_p node = (node_p) malloc(sizeof(node_t));

    if (node == nullptr)
    {
        // 分配空间失败
        return false;
    }

    node->data = data;
    node->next = nullptr;

    // 处理第一次插入，头指针为空的情况
    if (q.front == nullptr)
    {
        q.front = node;
    }

    // 如果不是第一次插入
    if (q.rear != nullptr)
    {
        q.rear->next = node;
    }
    q.rear = node;

    return true;
}
```

在进行入队操作时，需要注意插入第一个元素需要同时修改队头的指针和队尾的指针。

#### 出队操作

```cpp
bool out_quene(linked_quene& q, int* target)
{
    if (q.front == nullptr)
    {
        // 木有元素力
        return false;
    }

    *target = q.front->data;

    node_p node = q.front;
    q.front = q.front->next;
    if (q.front == nullptr)
    {
        // 表中没有元素了
        q.rear = nullptr;
    }

    free(node);
    return true;
}
```

在进行出队操作的时候，也是注意在删除最后一个元素的时候，需要同时修改队头指着和队尾指针。

#### 队列的判空操作

只用判断队头指针或者队尾指针是否为空就可以了

```cpp
bool quene_empty(const linked_quene& q)
{
    return q.front == nullptr;
}
```

还有一些操作这里没有给出实现：

- 队列的清空操作
- 获取队列的长度操作

### 队列的顺序存储实现

队列的顺序存储实现非常的复杂，需要考虑非常多的因素。

#### 基本实现原理

将队头和队尾在初始化时置为顺序表的第一个位置`0`，在需要入队的时候，在目前队尾索引的位置插入新的元素，将队尾索引加1；在需要出队的时候，取出目前队头索引位置的元素，将队尾索引加1。在操作中注意判空。

#### 假溢出的问题

这样的顺序存储实现存在一个非常严重的假溢出问题：当我们不断的入队和出队之后，我们的队头索引和队尾索引都在不断的变大，很快索引的值就大于数组的尺寸了，但是目前存储值的数量并没有超出数组的大小。

为了解决这个问题，我们可以采用**循环数组**来解决，通过对索引取数组长度的模来实现这个“逻辑上”的循环。

- 队列的初始化：`front =0, end = 0`
- 入队操作：`end mod length + 1`
- 出队操作：`front mod length + 1 ​`
- 判满操作：`(r mod length) + 1 = f`
- 判空操作：`f == r`

> 由于数组的实现比较复杂，这里就不放实现了。
