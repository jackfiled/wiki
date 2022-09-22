# 线性表

## 线性结构

线性结构是一个数据元素的有序（次序）集合。一个线性表一般具有以下的特征：

- 集合中必存在唯一的一个”第一元素“
- 集合中必存在唯一的一个”最后元素“
- 除最后元素之外，其他数据元素均有唯一的”后继“
- 除第一元素之外，其他数据元素均有唯一的”前驱“

线性表是具有相同数据类型的n(n>=0)个元素的有限序列，当`n=0`是被称为空表。

## 线性表的类型定义

### 抽象数据类型线性表的定义

**ADT** List {

数据对象：
$$
D=\{a_i|a_i \in ElementSet, i = 1, 2, ...,n, n \ge 0\}
$$
数据关系：
$$
R_1 = \{ <a_{i-1}, a_i> | a_i \in D, i = 2, ...,n\}
$$

> 序偶：即有序对，可以看作是具有两个元素的集合。但它与一般集合不同的是序偶具有确定的次序。

基本操作：

> 基本操作可以被分为四类：结构的初始化，结构的销毁，引用型的操作和加工型的操作

- 结构的初始化：`InitList(*L)` 构造一个空的线性表L
- 结构的销毁：`DestroyList(*L)`
- 引用型操作：`ListEmtpy(L)`判空操作，`ListLength(L)`求长度操作，`PriorElement(L, cur_e, *pre_e)`获得指定元素的前驱操作，`NexteElement(L, cur_e, *next_e)`获得指定元素的后继，`GetElement(L, i, *e)`获得指定索引的元素，`LocateElement(L, e)`判断指定的元素是否在表中
- 加工型操作：`ClearList(*L)`清空表中的元素，`ListInsert(*L,i,e)`在表指定的位置插入元素，`ListDelete(*L,i,*e)`在线性表中删除一个指定的元素，

} **ADT** List

## 线性表的顺序存储表示和实现

顺序表：用一组地址连续的存储单元依次存放线性表中的数据元素。并且用表中第一个元素的存储位置作为线性表的起始地址，称为线性表的基地址。

在顺序存储中：

- $Location(a_i) = Location(a_{i-1}) + C$
- $Location(a_i) = Location(a_1) + (i-1)C$

结构体的定义：

```cpp
const int MAX_LIST_SIZE = 80;// 预设存储的最大空间

typedef struct
{
	int *element;
	int length;
	int listSize;
} SqList;
```

> 在下面的代码中，大量使用引用语法，还请注意
>
> 同时在下列中的代码中，我们都承认索引是从0开始的

### 初始化操作

```cpp
/**
 * @brief 初始化顺序线性表
 * 
 * @param l 线性表指针
 * @param max_size 线性表的最大大小
 * @return int 线性表是否创建成功 0为成功 1为失败
 */
int InitList(SqList& l, int max_size)
{
    if (max_size == 0)
    {
        max_size = MAX_LIST_SIZE;
    }
    l.element = (int *) malloc(max_size * sizeof(int));

    if (l.element == nullptr)
    {
        return 1;
    }
    

    l.length = 0;
    l.listSize = MAX_LIST_SIZE;
    return 0;
}
```

在实际初始化该线性表时，需要先为结构体分配一定的内存空间。

该操作的时间复杂度是$O(1)$。

### 元素定位操作

```cpp
/**
 * @brief 定位线性表中的一个元素
 * 
 * @param l 线性表引用
 * @param target 需要寻找的目标值
 * @return int 目标元素在线性表中的索引 -1表示线性表中不存在该元素
 */
int LocateElement(const SqList& l, int target)
{
    int *p = l.element;
    for(int i = 0; i < l.length; i++)
    {
        if (*p == target)
        {
            return i;
        }
        p++;
    }
    return -1;
}
```

该操作的时间复杂度平均是$O(n)$。

### 元素插入操作

```cpp
/**
 * @brief 在线性表中插入值
 * 
 * @param l 线性表引用
 * @param pos 需要插入的位置
 * @param element 目标位置
 * @return true 插入成功
 * @return false 插入失败
 */
bool InsertList(SqList& l, int pos, int element)
{
    if (pos < 0 || pos > l.listSize)
    {
        return false;
    }

    if (l.length >= l.listSize)
    {
        return false;
    }

    for (int i = l.length - 1; i >= pos; i--)
    {
        l.element[i + 1] = l.element[i];
    }
    l.element[pos] = element;
    l.length++;
    return true;
}
```

该操作的次数为$n-i+1$，$i$为插入的位置，操作的时间复杂度可以可以表达为：
$$
E_{in}=\sum_{i=0}^{n}p_i(n-i+1)=\frac{1}{n}\sum_{i=0}^{n}(n-i+1)=\frac{n}{2}
$$

### 元素删除操作

```cpp
/**
 * @brief 从线性表中删除一个元素
 * 
 * @param l 线性表引用
 * @param pos 需要删除的位置
 * @param result 被删除元素的值
 * @return true 删除成功
 * @return false 删除失败
 */
bool DeleteList(SqList& l, int pos, int& result)
{
    if (pos < 0 || pos >= l.length)
    {
        return false;
    }

    result = l.element[pos];

    for (int i = pos; i < l.length - 1; i++)
    {
        l.element[i] = l.element[i + 1];
    }
    l.length--;
    return true;
}
```

删除的操作的时间复杂度分析类似为插入的分析：
$$
E_{de}=\sum_{i=0}^{n}p_i(n-i)=\frac{1}{n}\sum_{i=0}^{n}(n-i)=\frac{n}{2}
$$
也就是说插入和删除操作在平均上都需要移动线性表中一半的元素，在时间复杂度上顺序表示不是很优秀。

### 销毁结构操作

> 同时还记得释放结构体所占据的空间

```cpp
/**
 * @brief 删除线性表
 * 
 * @param l 线性表引用
 */
void DestoryList(SqList& l)
{
    free(l.element);
    l.element = nullptr;
    l.listSize = 0;
    l.length = 0;
}
```

### 顺序存储的特点

- 逻辑上相邻的元素，在物理上也相邻
- 可随机存取线性表的任一元素
- 顺序存储是一种静态的存储结构，空间的利用率在大部分时间中都比较低。

## 线性表的链式存储表示和实现

链式存储：用一组任意的存储单元存储线性表的数据元素，这组存储单元不一定是物理相邻的。同时这个单元为了表示单元之间在逻辑上的相邻性，还需要留出一部分的空间来存储相邻单元的地址。

单链表：每个节点中只包含一个指针域

头指针：第一个节点的存储地址，也就是链表的基地址。

### 链式储存的节点定义

```cpp
struct node {
    int element;
    struct node* next;
};

typedef struct node node_t;
```







