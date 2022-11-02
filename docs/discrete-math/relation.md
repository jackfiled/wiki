# Relations

## Relations and Their Properties

### Definition of Relations

- Relations are **formal means** to specify which elements from two or more sets are related to each other.

  For example, students who takes courses, there are relations between students and courses; integers and their divisors, there are relations between integers and divisors.

- Let $A$ and $B$ be two sets. A **binary relation** $R$ from $A$ to $B$ is a **subset** of $A \times B$.

- Generally, let $A_1,A_2,A_3,A_4, \cdots, A_n$ be $n$ sets. An **n-ary relation** $R$ on these sets is a subset of $A_1 \times A_2 \times \cdots A_n$. 

- $aRb$ means that $(a,b) \in R$.

### Complementary and Inverse of  Relations

- Let $R:A,B$ be any binary relations, the complement of $R$, is the binary relation defined by  $\{(a,b)|(a,b) \not \in R \} = (A \times B) -R$.

- Any binary relation $R:A \times B$, has an inverse relation $R^{-1}:B \times A$, which is defined by$R^{-1}: \{(b,a)|(a,b) \in R\}$.

### Functions as relations

- A function $f, A \to B$ is a special case of a relation from $A$ to $B$.
- Relations are a generalization of function.
  - Relations allow unmapped elements in $A$.
  - Relations allow one-to-many mappings.
  - Relations also allow many-to-one and many-to-many mappings.

### Relations on a Set

- A binary from a set $A$ to itself is called a **relation on the set $A$**.
- A relation on a set A is **a subset of $A^2$**.

### Properties of Relations

#### Reflexivity

- A relation $R$ is reflexive if $ \forall a \in A, aRa$.
- A relation $R$ is irreflexive if its complementary relation is reflexive.

#### Symmetry

-  A binary relation $R$ on $A$ is symmetry if $R = R^{-1}$, that is if $(a,b) \in R \leftrightarrow (b,a) \in R$
- A binary relation $R$ is antisymmetric if $\forall a \not= b, (a,b) \in R \to (b,a) \not \in R$

#### Transitivity

- A relation $R$ is transitive if $(a,b) \in R \wedge (b,c) \in R \to (a,c) \in R$.

Examples in Mathematics:

|             | reflexive | symmetric | antisymmetric | transitive |
| ----------- | --------- | --------- | ------------- | ---------- |
| $=$         | yes       | yes       | yes           | yes        |
| $\not =$    | no        | yes       | no            | no         |
| $\emptyset$ | no        | yes       | yes           | yes        |

### Composition

The composition of two relations $R:A \to B$ and $S: B \to C$, denoted by $S \circ R$, is the relation from $A$ to $C$ containing all pairs $(x,z)$ such that there is one $y \in B$ with $(x,y) \in R$ and $(y,z) \in S$.

### Power of a Relation

> Composing the Parent relation with itself

Let $R$ be a binary relation on $A$, then the power $R^n$ of the relation $R$ can be defined inductively by:

- Basic Step: $R^1 = R$
- Inductive Step: $R^{n+1} = R^n \circ R$

**Theorem**:  The relation $R$ on a set A is transitive if $R^n \subseteq R$ for $n = 1,2,3, \cdots$.

## n-ary Relations and Their Applications

### n-ary Relations

- An n-ary relation $R$ on sets $A_1,A_2,A_3,\cdots,A_n$, a subset $R \subseteq A_1 \times A_2 \times \cdots A_n$.
- The sets $A_i$ are called the **domains** of $R$.
- The degree of $R$ is $n$.

### Relational Database

#### Database

- A database is viewed as a collection of records, each being a tuple of the form $(value_1, value_2, ... ,value_n)$.
- In order to uniquely identify tuples in a database, we need to specify a field , which is the **primary key**.
- Some database may not have primary key, instead they use a **composite key** made up of multiple fields.

#### Relational Database

- A model for databases, based on relations.
- A domain $A_i$ is a primary key for the database if the relation R is functional in $A_i$.
- A composite key for the database is a set of domains ${A_i, A_j,\cdots}$, such that $R$ contains at most 1 n-tuple $(a_i, a_j, \cdots)$for each composite  value.

#### Operations on n-ary relations

- Selection
- Projection
- Join

## Representing of Relations

### Using Zero-One Matrices

We can represent a binary relation $R:A \times B$ by an $|A| \times |B|$ 0-1 matrix $M_R =[m_{ij}]$, let $m_{ij}=1$ if $(a_i, b_j) \in R$.

We can see some relation characteristics in the zero-one matrix.

-  Reflexive: all 1 are on diagonal
- Irreflexive: all 0 are on diagonal
- Symmetric: all identical across diagonal
- Antisymmetric: all 1 are across from 0.

### Using Directed Graphs

A relation $R:A \times B$ can be represented as a graph $G_R(V_G=A \cup B, E_G=R)$.

## Closures of Relations

### Closures

For any property X , the "X closure" of a set A is defined as the smallest superset of A that has the given property.

For example:

- The reflexive closure of relation $R$ on $A$ is obtained by adding $(a,a)$ to $R$ for each $a \in A$, as $R \vee I_A$.
- The symmetric closure of $R$ is obtained by adding $(b,a)$ to $R$, as $R \vee R^{-1}$.
- The transitive closure or connectivity relation of $R$ is obtained by repeatedly adding $(a,c)$ to $R$ for each $(a,b), (b,c)$ in $R$.

### Paths in Digraphs

A **path** of length $n$ from node $a$ to $b$ in the directed graph $G$ is a sequence $(a,x_1), (x_1,x_2),\cdots, (x_{n-1}, b)$ of $n$ ordered pairs in $E_G$.

- An empty sequence of edges is considered a path of length 0 from a to a.
- If any path from $a$ to $b$ exists, then we say that a$a$ is connected to $b$.
- A path of length $n \ge 1$ from a to itself is called a circuit or a cycle.
- There exists a path of length $n$ from $a$ to $b$ in $R$ if and only if $(a,b) \in R^n$.

Let R be a relation on a set $A$, the connectivity relation $R^*$ consist of their pairs $(a,b)$ such that there is a path of length at least one from $a$ to $b$ in $R$.

As $R^n$ consists of the pairs $(a,b)$ such that there is a path of length $n$ from $a$ to $b$, it follows that $R^*$ is the union of all the sets $R^n$.
$$
R^*= U_{n=1}^{\infty}R^n
$$
**Theorem**: Let $R$ be a relation on a set $A$, then $R^*$ equals the transitive closure of $R$
$$
t(R)=R^*=U_{n=1}^{\infty}R^n
$$
But in fact if $A$ is a set with $|A|=n$, and let $R$ be a relation on $A$. Then 
$$
U_{n=1}^{n}R^n
$$
which is much easier to calculate.

### Warshall's Algorithm

As we have seen, using the Theorem and its lemma, it is still difficult to calculate the transitive closure, so we have a algorithm:

```
procedure Warshall(M, n X n zero-one matrix)
W := M
for k:=1 to n
	for j:=1 to n
		for j:=1 to n
		w[ij] = w[ij] | (W[ik] & W[ki])
return W
```





