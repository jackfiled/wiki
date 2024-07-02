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

Constraints on whether or not entities may belong to more than one lower-level entity set within a single generalization.

- Disjoint: an entity can belong to only one lower-level entity
- Overlapping: an entity can belong to more than one lower-level entity set

Constraints on whether or not an entity in the higher-level entity set must belong to at least one of the lower-level entity sets within a generalization.

- total: an entity must belong to one of the lower-level sets
- partial: an entity need not belong to one of the lower-level entity sets

### Generalization

*A bottom up design process*: combine a number of entity sets that share the same features into a higher-level entity set.

Specialization and generalization are simple inversion of each other.

## Reduction to Relation Schemes

Entity sets and relationship sets can be expressed uniformly as relation schemes that represent the contents of the database.

### Representing Entity Sets

A strong entity set reduces to a schema with the same attributes.

A weak entity set becomes a table that includes a column for the primary key of the identifying strong entity set.

If there are composite attribute: flat out by creating a separate attribute for each component attribute. For example: the composite attribute *name* ends with *name_first_name* and *name_last_name* attributes in the schemes. And prefix can be omitted if there is no ambiguity: *first_name* and *last_name*.

If there is a multivalued attribute: create a separate schema for this attribute. This schema has attributes corresponding to the primary key of the original entity and an attribute corresponding to the multivalued attributes.

### Representing Relationship Sets

A many-to-many relationship set is represented as a schema with attributes for the primary keys for the two participating entity sets and any descriptive attributes of the relationship sets.

Many-to-one and one-to-many relationship sets that are total on the many-side can be represented by adding an extra attribute to the *many* side containing the primary key of the *one* side. 

> If participation is **partial** on the *many* side, the extra attribute in the schema corresponding to the *many* side could result in **null** value.

### Representing Specialization and Generalization

Method 1:

- Form a schema for the higher-level entity
- Form a schema for each lower-level entity set, include primary key of higher-level entity set and local attributes

Method 2:

- Form a schema for each entity set with all local and inherited attributes

Drawback:

- Method 1: getting information requires accessing two relations
- Method 2: attributes may be stored redundantly











