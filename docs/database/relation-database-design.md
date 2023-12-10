# Relation Database Design

## Pitfalls in Relational Database Design

A bad design may lead to:

- Repetition of information
- Inability to represent certain information

So the design goal are:

- Avoid redundant data
- Ensure that relationships among attributes are represented
- Facilitate the checking of updates for violation of database integrity constraints.

## Functional Dependencies

Let $R$ be a relation schema
$$
\alpha \subseteq R\ and\ \beta \subseteq R
$$
The functional dependency
$$
\alpha \to \beta
$$
holds on $R$ if and only if for any legal relations $r(R)$ whenever any two tuples $t_1$ and $t_2$ of $r$ agree on the attributes $\alpha$ they also agree on the attributes $\beta$:
$$
t_1[\alpha] = t_2[\alpha] \Rightarrow t_1[\beta] = t_2[\beta]
$$
Using functional dependency define key.

$K$ is a super key for relation schema $R$ if and only if $K \to R$.

$K$ is a candidate key for $R$ if and only if:

- $K \to R$
- for no $\alpha \subset K$ , $\alpha \to R$

We use functional dependencies to:

- Test relations to see if they are legal under a given set of functional dependencies
- Specify constraints on the set of legal relations

**Trivial dependency**: a functional dependency is trivial if it is satisfied by all instances of a relation. In general, $\alpha \to \beta$ is trivial if $\beta \subseteq \alpha$.

**Transitive dependency**: a functional dependency is transitive if 
$$
\alpha \to \beta, \beta \nsubseteq \alpha, \beta \not \to \alpha, \beta \to \gamma
$$
then $\gamma$ is transitive dependency on $\alpha$.

**Partial dependency**: a functional dependency is partial if:
$$
\alpha \to \beta, \gamma \to \alpha, \gamma \to \beta
$$
$\beta$ is partially dependent on $\alpha$.

**Logical imply**: a function dependency $f$ is logically implied by $F$, the set of functional dependencies on $R$, if every relation instance $r(R)$ satisfies $f$.

**Closure of a Set of Functional Dependencies**: for $R(U, F)$, the set of all functional dependencies logically implied by $F$ is the closure of $F$, denoting the closure by $F^+$.

Armstrong's Axioms:

- **Reflexivity**: $\beta \subseteq \alpha \Rightarrow \alpha \to \beta$
- **Augmentation**: $\alpha \to \beta \Rightarrow \gamma \alpha \to \gamma \beta$
- **Transitivity**: $\alpha \to \beta, \beta \to \gamma \Rightarrow \alpha \to \gamma$

And some additional rules:

- union: $ \alpha \to \beta, \alpha \to \gamma \Rightarrow \alpha \to \beta \gamma$

- decomposition:
  $$
  \alpha \to \beta \gamma \Rightarrow \alpha \to \beta, \alpha \to \gamma
  $$

- pseudo transitivity:
  $$
  \alpha \to \beta, \gamma \beta \to \delta \Rightarrow \gamma \alpha \Rightarrow \delta
  $$
  

**Closure of attributes**, the set of attributes that are functionally determined by $\alpha$ under $F$.
$$
\alpha \to \beta \Leftrightarrow \beta \subseteq \alpha^+
$$
And using attribute closure:

- Test for superkey: if $\alpha$ is a superkey, we computer $a^+$ and check if $\alpha^+$ contains all attributes of $R$.
- Test functional dependencies: To check if a functional dependency $\alpha \to \beta$ holds, just check if $\beta \subseteq \alpha^+$
- Computing closure of $F$

**Equvialent functional dependencies**: Let $F$ and $G$ be two sets of functional dependencies: if $F^+=G^+$, then $F$ and $G$ are equvialent.

### Extraneous Attributes

An attribute of a functional dependency is said to be extraneous if remove it without changing the closure of the set of functional dependencies.

Consider a set of $F$ of functional dependencies and the functional dependency $\alpha \to \beta$ in $F$:

- If $A \in \alpha$ and $F$ logical implies $(F - \{\alpha \to \beta\}) \cup \{(\alpha - A) \to \beta\}$, $A$ is an extraneous attribute.
- If $A \in \beta$ and $F$ logical implies $(F - \{\alpha \to \beta\}) \cup \{\alpha \to (\beta \to A)\}$, $A$ is an extraneous attribute.

Giving two ways to judge whether attribute $A$ is a extraneous attribute:

1. Attribute $A$ is extraneous in $\alpha$ if $A \in \alpha$ and $F$ logically implies 
   $$
   (F - \{\alpha \to \beta\}) \cup \{(\alpha - A) \to \beta\}
   $$

2. Attibute $A$ is extraneous in $\beta$ if $A \in \beta$ and the set of functional dependencies 
   $$
   (F - \{\alpha \to \beta\}) \cup \{\alpha \to (\beta - A)\}
   $$
   logically implies $F$.

### Canonical/Minimal Cover

Set of functional dependencies may contains redundant dependencies that can be inferred from the others.

A **canonical cover** of $F$, a.k.a $F_c$ is a minimal set of functional dependencies equivalent to $F$, with no redundant dependencies or having redundant parts of dependencies.

No functional dependency in $F_c$ contains an extraeouse attribute. Each left side of fucntional dependenyc in $F_c$ is unique.

## Normal Forms

### First Normal Form

Domain is atomic if its elements are considered to be indivisible units.

A relational schema $R$ is in **first normal form** if the domains of all attributes of $R$ are atomic.

### Second Normal Form

A relation schema $R$ is in second normal form if each attribute $A$ in $R$ meets one of the following criteria:

- It apperars in a candiate key
- It is not partially dependent on a candidate key

In practice, if $R$ is a first normal form and every non-key attribute is not a partial dependency of candidate key $R$, $R$ is third normal form.

 ### Third Normal Form

A realtion schema $R$ is in third normal form if for all:
$$
\alpha\to \beta \in F^+
$$
at least one of the following holds:

- $\alpha \to \beta$ is trivial
- $\alpha$ is a superkey for $R$
- Each attribute $A$ in $\beta - \alpha$ is contained in a candidate key for $R$.

In practise, if $R$ is a second normal form and every non-key attribute is not a tranitive dependency of candidate key, $R$ is third normal form.

### Boyce-Codd Normal Form

A relation schema $R$ is in boyce codd normal form with respect to a set $F$ of functional dependencies if for all functional dependencies in $F^+$ of the form $\alpha \to \beta$ where $\alpha \subseteq R$ and $\beta \subseteq R$ at least one of the following holds:

- $\alpha \to \beta$ is trivial
- $\alpha$ is a superkey for $R$

In practise, if any non-keys attribute directly dpendent on all candidate keys.

If a relation is in boyce codd normal form, it is in third normal form.

For emaxple, for relation

```
SPC(SNO, PNO, CNO)
```

and functional dependencies:
$$
PNO \to CNO \\
(SNO, CNO) \to PNO
$$
This relation is third normal form but not boyce-codd normal form as $PNO$ is not a superkey of $R$.

> 求一个关系模式的所有候选键：
>
> 将关系模式中的所有属性分成四类：
>
> 1. L类：只出现在函数依赖左部的属性
> 2. R类：只出现在函数依赖右部的属性
> 3. N类：在函数依赖左右均未出现的属性
> 4. LR类：在函数依赖左右两边均出现的属性
>
> 如果LN的闭包包含了R中的所有属性，那么LN就是关系模式的所有候选键。
>
> 但是LN的闭包中不包含R中所有的属性，那么需要从LR类属性中添加。

## Decomposition

If a relation $R$ is not in a *good* form, decompose it into a set of relations:
$$
\{R_1, R_2, \cdots, R_n\}
$$
And all attributes of an original schema must appear in the decomposition:
$$
R = R_1 \cup R_2 \cup \cdots \cup R_n
$$

### Lossless-join Decomposition

If a decomposition of $R$ into a set of relations $\{R_1, R_2, \cdots, R_n\}$ has:
$$
r  = \Pi_{R_1}(r) \bowtie \Pi_{R_2}(r) \bowtie \cdots \bowtie \Pi_{R_n}(r)
$$
the decomposition is lossy join decompositions.

A descomposition of $R$ into $R_1$ and $R_2$ is lossless join if and only if at least one fo the following dependencies is in $F^+$:

- $R_1 \cap R_2 \to R_1$
- $R_1 \cap R_2 \to R_2$

### Dependency Preservation

Decompose a relation schema $R$ with a set of fucntional dependencies $F$ into $R_1$, $R_2$ ... $R_n$. Let $F_i$ be the set of dependencies $F^+$ that include only attributes in $R_i$.

If
$$
(F_1 \cap F_2 \cap \cdots F_n)^+ = F^+
$$
this decomposition is dependency preservation.

Follow the algorithm to test for dependency preservation:

![image-20231121151217639](./relation-database-design/image-20231121151217639.png)

### Third Normal Function Decompition algorithm

![image-20231121151633413](./relation-database-design/image-20231121151633413.png)

The algorithm ensures:

- Each relation schema $R_i$ is in third normal form
- Decomposition is dependency preservation
- DeComposition is lossless-join

For example:
$$
U = \{SNO, SD, MN, CNO, G\}
$$

$$
F = \{SNO \to SD, SNO \to MN, SD \to MN, (SNO, CNO) \to G\}
$$

Firstly, get the canonical cover:
$$
\{SNO  \to SD, SD \to MN, (SNO, CNO \to G \}
$$
Secondly, get sets:
$$
U1 = \{SNO, SD\}
$$

$$
U2 = \{SD, MN\}
$$

$$
U3 = \{SNO, CNO, G\}
$$

Thirdly, check the candidate key.

### Boyce-codd Decomposition Algorithm

![image-20231121152556940](./relation-database-design/image-20231121152556940.png)

The main problem in BCNF decomposition is to get dependency function set after decomposition in the $F^+$.

## Overall Database Design Process

### Design Goals

Goal for a relation database design is to :

- BCNF
- Lossless join
- Dependency preservation

And if we cannot achieve this. we accept one of:

- Lack of dependency preservation
- Redundancy due to use of 3NF

When an E-R diagram is carefully designed, identifuing all entities correctly, the tables generated from the E-R diagram should not need further normalization. However, in a real design there can be a function dependence from non-key attributes of an entity to other attributes of the entity. And we may want to use non-normalized schema for performance.

