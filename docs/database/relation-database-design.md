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
  





## Normal Forms

## Decomposition

## Overall Database Design Process

