# 查找表

## 查找中涉及的概念和术语

### 术语：

- 查找表：同一类型的记录（数据元素）的集合

  > 数据元素之间存在着比较松散的关系，为了提高查找的效率，可以在元素之间人为的附加某种特定的关系。

- 关键字：记录数据元素中的某个数据项的值

  - 主关键字：该关键字可以唯一的标识一个记录
  - 次关键字：该关键字不能唯一标识一个记录

- 查找：指定某个值，在查找表中确定是否存在一个记录，该记录的关键字等于给定值

- 静态查找：对查找表的查找仅是为了查找，不改动查找表中的数据

- 动态查找：在查找的过程中同时插入不存在的记录，或者删除某个已存在的记录

- 查找成功：查找表中存在满足查找条件的记录

- 查找失败：查找表中不存在满足查找要求的记录

- 内查找：整个查找过程都在内存中进行

- 外查找：在查找过程中需要访问外存

- 平均查找长度ASL：查找方法时效的度量。或者更数学的，为确定记录在查找表中的位置，需将关键字和给定值比较次数的期望值。

  查找成功时ASL的计算公式：
  $$
  ASL=\sum^{n}_{i=1}p_ic_i
  $$
  在公式中：$n$是记录的个数，$p_i$是查找指定记录的概率，$c_i$查找指定记录所需的比较次数。

## 静态查找表

静态表这里是指在查找过程中表基本不会发生变化。

### 顺序表的查找

#### 算法描述

遍历表进行查找。为了提高查找的效率，可以设置一个监视哨，查找是就不必检测位置是否越界。

```cpp
int sequenceSearch(vector<int>& x, int target)
{
    x.push_back(target);

    int i = 0;
    while (x[i] != target)
    {
        i++;
    }
    return i;
}
```

#### 性能分析



- 当查找成功时，$ASL=\frac{1+2+3+\cdots+n}{n}=\frac{n+1}{2}$
- 当查找失败时，$ASL=n+1$

### 有序表的查找

#### 算法描述

采用二分查找。

```cpp
int binarySearch(vector<int>& x, int target)
{
    int low = 0;
    int high = x.size();

    while (low <= high)
    {
        int mid = (low + high) / 2;
        
        if (target == x[mid])
        {
            return mid;
        }
        else
        {
            if (target < x[mid])
            {
                high = mid - 1;
            }
            else
            {
                low = mid + 1;
            }
        }
    }

    return -1;
}
```

#### 性能分析

为了编译分析查找的过程，我们可以引入一颗二叉树来描述这个过程，这棵树也被称为判定树。

![](./images/find-tree.png)

这颗二叉树的深度为$\lfloor log_2n\rfloor +1$

则成功查找时的平均查找长度为：
$$
ASL=\frac{n+1}{n}log_2 (n+1)-1\approx log_2(n+1)-1
$$

### 静态树表的查找

当有序表中各个记录查找的概率不同时，为了降低查找的平均查找长度，我们可以对判定树进行适当的调整。

#### 静态最优查找树

查找性能最优的判定树。

对于最优查找树：其的带权内路径长度之和`PH`为最小值：
$$
PH=\sum^{n}_{i=1}w_ih_i
$$
在公式中值得指出参量时$w_i$，这个数的定义为$w_i=cp_i$，`c`是一个常数，`p_i`是这个节点被查找的概率。

构造最优查找树的原则是：

- 最先访问的节点是访问概率最大的节点
- 每次访问应使节点两边尚未访问的节点的被访概率之和尽可能的相等

#### 静态次优查找树

但是在实际工作中，构造一颗最优的查找树往往是困难的。但是我们有一种方法可以构造一棵次优的查找树。这棵树的特点是其的`PH`值近似为最小，但是比静态查找树更加的易于查找，构造所需要的时间很短，而且查找的性能同最优树之间只存在1%~2%之间的差距。

下面给出构造次优静态查找树的方法：

现在已经有了有序排列的记录序列$r_1,r_2,r_3,\cdots,r_n$:

1) 对序列中所有的节点$r_i$计算其的
   $$
   \Delta P_i = |\sum_{j=i+1}^hw_j-\sum ^{i-1}_{j=1}w_j|
   $$
   在序列中找到$\Delta P_i$最小的节点作为根节点。

   显然，这里主要的困难就是计算$\Delta P_i$，我们这里介绍一种可以简化计算的方式：

   首先计算每个节点的累计权值和：
   $$
   sw_j = \sum_{j=1}^{i}w_j
   $$
   将每个节点的累计全权值和用一张表存起来，而且
   $$
   \Delta P_i = |sw_h+sw_{n-1}-sw_i-sw_{i-1}|
   $$

2) 对根节点左右两边的列表递归操作

### 索引顺序表的查找

当有序表中的元素是分块有序的时候，我们可以建立索引表。首先在索引表中利用顺序或者二分查找知道找到对应的分块，再在对应的分块中寻找对应的记录。

#### 性能分析

> 需要注意的是，计算索引查找的平均查找长度需要计算两部分的平均查找长度。首先是在索引表的平均查找长度，然后是在分块中的平均查找长度。

由于对于索引表和分块中的查找都有着两种不同的查找方式——顺序查找和折半查找，这让索引顺序表的平均查找长度的计算变得比较复杂，不过大致的结论是索引查找的性能大致介于顺序查找和折半查找之间。

在索引查找中还有一些值得注意的点：

- 在实际使用中，不同分块的大小不一定相同
- 分块查找的代价是附加索引表的空间和建立索引表的时间开销
- 在每次主表发生变化之后的索引都得重新建立。为此，我们可以在主表的每个分块之后预留一部分的空间，以便在改变主表之后能够只修改对应分块的索引

## 动态查找表

就是在查找的过程中，表可能频繁的进行插入和删除操作。

### 二叉排序树

二叉排序树的定义是一个递归的定义。一颗二叉排序树或者是空树，或者是满足以下性质的二叉树：

- 如果其左子树非空，那么左子树上所有结点的值均小于根节点的值
- 如果其右子树非空，那么右子树上所有节点的值都大于根节点的值
- 其左右子树如果存在都是一颗二叉排序树

按照如上定义设计出来的二叉排序树将具有一个非常不错的性质：按照中序遍历之后得到的序列就是一个递增的序列。

#### 二叉排序树上的操作

通常，我们和二叉树一样利用二叉链表来储存二叉排序树。

```cpp
typedef struct tree {
    int data;
    struct tree* lChild;
    struct tree* rChild;
} BinarySearchTree;

typedef BinarySearchTree* BinarySearchTreeP;
```

首先介绍搜索操作：

```cpp
BinarySearchTreeP search(BinarySearchTreeP tree, int target)
{
    if (tree = nullptr)
    {
        return nullptr;
    }

    if (tree->data == target)
    {
        return tree;
    }
    else if (target < tree->data)
    {
        return search(tree->lChild, target);
    }
    else
    {
        return search(tree->rChild, target);
    }
}
```

然后是在二叉树中插入一个元素的操作，在插入元素操作中会用到搜索操作的一个变型版：

```cpp
/**
 * 在二叉树中查找元素
 * 
 * @param tree 当前查询的二叉树节点
 * @param target 查找的目标
 * @param father 当前节点的父节点，初始时为空
 * @param result 查找的结果 当查找成功时指向该节点，当查找失败时指向查找路径上的最后一个节点
 * 
 * @return 查找的结果状态
*/
bool search(BinarySearchTreeP tree, int target, BinarySearchTreeP father, BinarySearchTreeP& result)
{
    if (tree == nullptr)
    {
        result = father;
        return false;
    }

    if (target == tree->data)
    {
        result = tree;
        return true;
    }
    else if (target < tree->data)
    {
        return search(tree->lChild, target, tree, result);
    }
    else
    {
        return search(tree->rChild, target, tree, result);
    }
}

bool insert(BinarySearchTreeP& tree, int value)
{
    BinarySearchTreeP result;
    if (!search(tree, value, nullptr, result))
    {
        BinarySearchTreeP node = (BinarySearchTreeP)malloc(sizeof(BinarySearchTree));
        if (node == nullptr)
        {
            // 空间分配失败
            return false;
        }
        node->data = value;
        node->lChild = nullptr;
        node->rChild = nullptr;
        
        if (tree == nullptr)
        {
            tree = node;
        }
        else if (value < result->data)
        {
            result->lChild = node;
        }
        else
        {
            result->rChild = node;
        }
    }
    else
    {
        return false;
    }
}
```

当需要生成一颗新的二叉搜索树的时候，反复调用`insert`函数就可以了。

如果需要在搜索二叉树中删去一个节点，需要按照被删去节点的类型分类讨论：

- 叶子节点：修改父节点的指针就可以
- 只有左子节点：用左子树代替被删除的节点
- 只有右子节点：使用右子树代替被删除的节点
- 左右子节点都有：

#### 性能分析





