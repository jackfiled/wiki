# Relation Model

## Relational Data Structure

We define a **relation** to be a subset of a Cartesian product of a list of **domains**.

Formally, given sets $D_1, D_2, \cdots D_n$ , a relation $r$ is  a subset of 
$$
D_1 \times D_2  \times \cdots \times D_n
$$
Thus a relation is a set of n-tuples $(a_1, a_2, \cdots, a_n)$ where $a_i \in D_i$.

And the difference here are :

- Assign attribute name to every domain
- Finite set

#### Relation Schema

$A_1, A_2, \cdots, A_n$ are attributes, each attribute of a relation has a name, and $R=(A_1, A_2, \cdots, A_n)$ is a relation schema. $r(R)$ is a relation on the relation schema $R$.

#### Relation Instance

The current values(a.k.a. **relation instance**) of a relation are specified by a table. An element $t$ of $r$ is a tuple, represented by a row in a table.

![image-20230919140820132](./relation-model/image-20230919140820132.png)

- Order of tuples is **irrelevant**, tuples may be stored in an arbitrary order
- Order of attributes is **irrelevant**
- For all relations, the domains of all attributes be **atomic**
- Attributes names must be **different**
- Several attributes can have the same domain
- Tuples are **not duplicate**

#### Super Key

$R(U)$ is a relation schema, $K$ is a **super key** for $R$,for any $r$, no two distinct tuples have the same values on $K$. That is, if $t_1$ and $t_2$ are in $r$ and  $t_1 \neq t_2$, then $t_1[K] \neq t_2[K]$. Values for $K$ are sufficient to identify a unique tuple of each possible relation $r(R)$ by "possible $r$".

A **candidate key** of en entity set is a minimal super key. Although several candidate keys may exist, one of the candidate keys is selected to be the **primary key**.

Candidate Key has two properties:

- **Uniqueness**. No legal value of $R$ ever contains two distinct tuples with the same value for $K$
- **Irreducibility**. No proper subset of $K$ has the uniqueness property.

#### Foreign Key

For $R_1$, $R_2$, $R_1$ includes the Primary Key $X$ of $R_2$, $X$ is called a foreign key referencing $R_2$. $R_1$ is called the referencing relation of the foreign key dependency. $R_2$ is called the referenced relation of the foreign key.

 #### Integrity Constraint

Integrity constraint of primary key: each specified column of primary key is assumed to be **not null**.

Referential integrity constraint: the value of foreign key in any tuple of relation $R_1$ are either null or must appear as the value of primary key of a tuple of relation $R_2$.

## Fundamental Relational-Algebra-Operations

We have six basic operators:

- Select
- Project
- Union
- Set difference
- Cartesian Product
- Rename

### Select

Notation $\sigma_p(r)$, $p$ is called the selection predicate, defined as 
$$
\sigma_p(r)=\{t|t \in r\ and\ p(t)\}
$$
where $p$ is a formula in propositional calculus consisting of terms connected by $\vee$ and,  $\wedge$ or , $\neg$ not.

### Project Operation





## Additional Relational-Algebra-Operations

## Extended Relational-Algebra-Operations

## Null Values

## Modification Of the Database

