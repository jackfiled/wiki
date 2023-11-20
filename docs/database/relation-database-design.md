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

### Canonical/Minimal Cover

Set of functional dependencies may contains redundant dependencies that can be inferred from the others.

A **canonical cover** of $F$ is a minimal set of functional dependencies equivalent to $F$, with no redundant dependencies or having redundant parts of dependencies.

### Extraneous Attributes

An attribute of a functional dependency is said to be extraneous if remove it without changing the closure of the set of functional dependencies.

Consider a set of $F$ of functional dependencies and the functional dependency $\alpha \to \beta$ in $F$:

- If $A \in \alpha$ and $F$ logical implies $(F - \{\alpha \to \beta\}) \cup \{(\alpha - A) \to \beta\}$, $A$ is an extraneous attribute.
- If $A \in \beta$ and $F$ logical implies $(F - \{\alpha \to \beta\}) \cup \{\alpha \to (\beta \to A)\}$, $A$ is an extraneous attribute.



## Normal Forms

## Decomposition

## Overall Database Design Process

