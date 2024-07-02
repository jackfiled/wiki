# 数组和广义表

虽然是非线性的数据结构，但是其实质上就是扩展的线性表，表中的数据元素本身也是一个数据结构。

## 数组和线性表的关系以及数组的运算

任何数组都可以看作是一个线性表，不过其中存储的元素类型不同，例如，对于二位数组来说，其中的元素就是一个一维数组。

在存储多维数组的时候，也是一行行的存储这些元素，这就是所谓的**行优先**存储方式。

> 至于计算多维数组中一个指定元素地址，计算公式难以用一个简易的公式给出。

数组是一种随机存取结构，对于数组中任何一个元素定位的时间是相等的。

## 数组的顺序表示

略

## 矩阵的压缩存储

由于矩阵是一种占用空间极大的储存结构，其在程序中的运用又十分广泛，因此研究如何压缩存储矩阵具有十分重要的意义。

### 对称矩阵

对于一个$n \times n$的方阵，如果满足$a_{ij}=a_{ji}$，则称这个矩阵是一个对称矩阵。

在存储对称矩阵时，我们只用存储矩阵中上三角或者下三角中的元素，包括主对角线中的元素即可，只需要$\frac{n(n+1)}{2}$的空间；将这些元素储存在一个数组中，我们可以通过如下的公式访问这个矩阵的元素：

$$
a_{ij}=\left \{
\begin{aligned}
\frac{i(i-1)}{2} + j-1; i \ge j \\
\frac{j(j-1)}{2} + i -1; i < j
\end{aligned}
\right.
$$

### 三角矩阵

对角线以上或者一下的元素全部为常数的矩阵被称为三角矩阵。

存储的方式和对称矩阵的存储方式大致近似，都是存储上三角或者下三角中的元素。不过在访问这些元素时操作比较复杂：

对于上三角矩阵：

$$
a_{ij}=\left \{
\begin{aligned}
\frac{(i-1) \times (2n -i+2)}{2} - i + 1; i \le j \\
c; i > j
\end{aligned}
\right.
$$

### 带状矩阵（对角矩阵）

在方阵中，非零的元素主要集中在主对角线机器两侧的奇数条对角线中，我们便可以只存储这个区域中的元素，而且按照对角线的顺序存储。

### 稀疏矩阵

没啥特别规律的矩阵就被称为稀疏矩阵。

我们可以采用**三元组表**的方式来存储一个普通的矩阵，一个三元组包括矩阵中一个元素所在的位置和元素的值，对于为0的元素，我们直接不存储来节省空间。使用三元组表来存储矩阵中的元素可以在一定程度上节约空间，但是使用这个方法存储矩阵在矩阵相关操作的实现上就十分的困难了。

为了优化三元组表在矩阵运算时的表现，我们可以添加一个新的数组，储存矩阵每一行开始的位置。

## 广义表

广义表是由零个或者多个原子或者子表组成的有限序列。其中原子是指在逻辑上不能再分解的火元素，子表是作为广义表中元素的广义表。

当广义表中的元素全部为原子时就是线性表，线性表就是广义表的特例，广义表就是线性表的推广。

### 广义表的相关概念

- 表的长度：表中的元素（第一层） 的个数
- 表的深度：表中元素的最深嵌套层数
- 表头：表中的第一个元素
- 表尾：除第一个元素之外，剩余元素构成的广义表，不是一个元素而是一张表。非空广义表的表尾一定是一个广义表

|例子|表长|表深|表头|表尾|
| -------------| ----| ----| -----| -----|
|A=()|0|1|-|-|
|B=(a,A)|2|2|a|(())|
|C=((a,b),c,d)|3|2|(a,b)|(c,d)|
|D=(a,D)|2|$\infty$|a|(D)|

### 广义表结构的分类

- 纯表：与树形结构类似的表
- 再入表：允许元素共享的表
- 递归表：允许元素递归的表

### 广义表的用途

- 程序的语句结构
- m元多项式的表示

### 广义表的存储结构

#### 头尾链表形式

为了区分原子节点和子表节点，我们先定义一个枚举：

```c
typedef enum {
    Atom, // 原子类型
    List, // 子表类型
} ElementType;
```

然后再定义每个节点的数据类型：

```C
struct gl_node {
    ElementType type;
    union {
        int value;
        struct {
            struct gl_node* head;
            struct gl_node* tail;
        } ptr;
    };
};

typedef struct gl_node gl_node_t;
```

> 这里涉及到C语言中一种特殊的类型：联合

#### 扩展的线性链表形式

为了区分原子节点和子表节点，同上文中一样定义一个`ElementType`枚举。

定义每个节点的数据类型：

```C
struct gl_node {
    ElementType type;
    union {
        int value;
        struct gl_node* head;
    };
    struct gl_node* tail;
};

typedef struct gl_node gl_node_t;
```

> 在课程PPT中，联合中的`head`节点还用`struct`包了一下。但是我感觉貌似没有用的样子

### 广义表的递归算法

广义表的相关操作较为复杂，且几乎都采用递归实现。

为了简化相关算法的表达，我们规定例子中的广义表定义都不是递归的，且没有共享子表。

#### 计算广义表的深度

方法一：分析表中各节点的深度，取其深度的最大值

```cpp
int gl_depth(gl_node_t* g)
{
    if (g == nullptr)
    {
        // 空表
        return 1;
    }

    if (g->type == Atom)
    {
        // 单原子表
        return 0;
    }

    int max = 0;
    for(gl_node_t* node = g; node != nullptr; node = node->ptr.tail)
    {
        int dep = gl_depth(node->ptr.head);
        if (dep > max)
        {
            max = dep;
        }
    }

    return max + 1;
}
```

方法二：分析表头和表尾

```cpp
int gl_depth_1(gl_node_t* g)
{
    if (g == nullptr)
    {
        // 空表
        return 0;
    }

    if (g->type == Atom)
    {
        // 单原子表
        return 0;
    }

    int depth1 = gl_depth_1(g->ptr.head) + 1;
    int depth2 = gl_depth_1(g->ptr.tail);

    if (depth1 > depth2)
    {
        return depth1;
    }
    else 
    {
        return depth2;
    }
}
```

#### 广义表的复制算法

```
bool gl_copy(gl_node_t*& target, gl_node_t* g)
{
    if (g == nullptr)
    {
        // 被复制的广义表为空
        return false;
    }

    target = (gl_node_t* )malloc(sizeof(gl_node_t));
    if (target == nullptr)
    {
        // 空间分配失败
        return false;
    }
    
    target->type = g->type;
    if (g->type == Atom)
    {
        // 原子节点
        target->value = g->value;
    }
    else
    {
        gl_copy(target->ptr.head, g->ptr.head);
        gl_copy(target->ptr.tail, g->ptr.tail);
    }

    return true;
}
```
