# Database Design Using the E-R Model

## Outline of the ER Model

The ER data model employs three basic concepts:

- entity set
- relationship sets
- attributes

### Entity Set

An **entity** is an object that exists and is distinguishable from other objects.

An **entity set** is a set of entities of the same type that share the same properties.

An entity is represented by a set of attributes. And a subset of the attributes forms the **primary key** of the entity set, uniquely identifying each member of the set.

### Attributes

There are many attributes types:

- Simple or composite

  ![image-20231031133432024](./entity-relation-model/image-20231031133432024.png)

- Single-valued or multivalued

- Derived

  Can be computed from other attributes

### Relationship Set

A **relationship** is an association among several entities.

A **relationship set** is a mathematical relation among $n \ge 2$ entities, each taken from entity sets.
$$
\{(e_1, e_2, \cdots e_n)| e_1 \in E_1, e_2 \in E_2 ,\cdots,e_n \in E_n\}
$$
An attribute can also be associated with a relationship set.

#### Degree of a Relationship Set

Binary relationship:

- involve two entity sets
- most relationship sets in a database system are binary

Relationships between more than two entity sets are rare.

#### Mapping Cardinality Constraints

Express the number of entities to which another entity can be associated via a relationship set. Most useful in describing binary relationship set.

For a binary relationship set the mapping cardinality must be one of:

- One to one
- One to many
- Many to many

#### Weak Entity Sets

A weak entity set is one whose existence is dependent on another entity, called its identifying entity. Instead of associating a primary key with a weak entity, use the identifying entity along with extra attributes called **discriminator** to uniquely identify a weak entity.

 ## E-R Diagrams

Entities can be represented graphically as follows:

![image-20231031141515241](./entity-relation-model/image-20231031141515241.png)

Diamonds represent relationship sets:

![image-20231031141550958](./entity-relation-model/image-20231031141550958.png)Attributes can be associated with a relationship:

![image-20231031141627746](./entity-relation-model/image-20231031141627746.png)

Entities sets of a relationship need not to be distinct.

Each occurrence of an entity set plays a **role** in the relationship.

Express cardinality constrains by drawing either a directed ling, signifying one and an undirected line signifying many between the relationship set and the entity set. Total participation(indicated by double line) means every entity in the entity set participates in at least one relationship in the relationship set.

A line may have an associated minimum and maximum cardinality, shown in the form `l..r` where `l` is the minimum and `h` is the maximum cardinality.

- A minimum value of 1 indicates total participation
- A maximum value of 1 indicates that the entity participates in at most one relationship
- A maximum value of * indicates no limit

## Advanced Topics

### Non-binary Relationship Sets

E-R diagram with a ternary relationship:

![image-20231031152245682](./entity-relation-model/image-20231031152245682.png)

Cardinality constraints on ternary relations:

- Allow at most one arrow out of a ternary (or greater) relationship to indicate a cardinality constraint. If there is more than one arrow, there are two ways of defining meaning. So outlaw more than one arrow to avoid confusion.

### Specialization

We designate sub-groupings within an entity set that are distinctive from other entities in the set. These sub-groupings become lower-level entity sets that have attributes or participate on relationships that do not apply to the higher level entity set. **Attribute inheritance**: a lower-level entity set inherits all the attributes and relationship participation of the higher-level entity set to which it is linked.



