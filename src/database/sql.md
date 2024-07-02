# SQL

## Background

SQL is bases on set and relation operation with certain modifications and enhancements.

## Basic Structure Query

A typical SQL query has the form:

![image-20231020134315524](./sql/image-20231020134315524.png)

$A_i$ represent attributes, $r_i$ represent relations and $P$ is a predicate. And this query is equivalent to the relation algebra expression:
$$
\Pi_{A_1, A_2, \cdots A_n}(\sigma_{P}(r_1 \times r_2 \times \cdots \times r_m))
$$
The result of an SQL query is a relation.

### The Select Clause

The **select clause** corresponds to the projection operation of the relation algebra. It is used to list the attribute desired in the result of a query. The query finding the names of all instructors **select name from instructor** will be 
$$
\Pi_{name}(instructor)
$$
 An asterisk in the select clause denotes all attributes.

The select clause can contain arithmetic expressions involving the operation and operating on constants or attributes of tuples. For example:

```sql
select ID, name, salary/12
from instructor
```

SQL allows duplicates in relations as well as in query results. So there are two keywords:

- **distinct** to force the elimination of duplicates
- **all** to force that duplicates should not be removed

### The Where Clause

The where clause corresponds to the selection predicate of the relational algebra.

Comparison results can be combined using the logical connectives **and** , **or** and **not**. Comparisons can be applied to result to results of arithmetic expressions. And there is a **between** comparison operator, for example:

```sql
select name
from instructor
where salary between 90000 and 100000
```

### The from clause

The **from** clause corresponds to the Cartesian product operation of the relation algebra. It lists the relations to be scanned in the evaluation of the express. For the common attributes, the attributes in the resulting table are renamed using the relation name.

### The Rename Operation

The SQL allows renaming relations and attributes using the **as** clause: *old_name as new_name*. For example:

```sql
select distince T.name
from instructor as T, instructor as S
where T.salary > S.salary and S.dept_name == 'Comp. Sci.'
```

The query will find the names of all instructors who have a higher salary than some instructor in 'Comp. Sci.'.

### String Operations

- **%** character matches any substring
- **_** character matches any character

For example:

```sql
select name
from instructor
where name like '%dar%'
```

### Ordering the Display of Tuples

The SQL allows **order by** clause to order the result by the attributes, for example:

```sql
select distinct name
from instructor
order by name
```

And we can specify **desc** for descending order or **asc** for ascending order. And the default is ascending order.

### Set Operations

The set operations **union**, **intersect** and **except** operator on relations and correspond to the relational algebra operations $\cap$, $\cup$, $-$. Each of the above operations automatically eliminates duplicates. To retain all duplicates use the corresponding **union all**, **intersect all** and **except all**.

```sql
(select course_id from section where sem = 'Fall' and year = 2009)
except
(select course_id from section where sem = 'Spring' and year = 2010)
```

### Aggregate Functions

These functions operate on the multi set of values of a column of a relation and return a value.

- **avg** average value
- **min** minimum value
- **max** maximum value
- **sum** sum of values
- **count** number of values

For example:

```sql
select avg(salary)
from instructor
where dept_name = 'Comp. Sci.'
```

#### Group By

```sql
select dept_name, avg(salary) as avg_salary
from instructor
group by dept_name
```

![image-20231020143046506](./sql/image-20231020143046506.png)

> Attributes in select clause outside of aggregate functions must appear in **group by** list.

#### Having 

```sql
select dept_name, avg(salary)
from instructor
group by dept_name
having avg(salary) > 42000;
```

The predicates in the having clause are applied after the formation of groups whereas predicates in the where clause are applied before forming groups.

### Null Values

The predicate **is null** can be used to check for null values. 

All aggregate operations except count ignore tuples with null values on the aggregated attributes.

### Nested Queries

SQL provides a mechanism for the nesting of subqueries. A subquery is a select-from-where expression that is nested within another query.

#### Queries in the Where Clause

A common use of subqueries is to perform tests:

1. Set Membership

   ```sql
   select distinct course_id
   from section
   where semester = 'Fall' and year = 2009 and 
   	course_id in (select  course_id
                    from section
                    where semester = 'Spring' and year = 2010);
   ```

2. Set Comparisons

   Comparisons has two clauses:

   - some
   - all

   ```sql
   select name
   from instructors
   where salary > some (select salary
                       from instructor
                       where dept_name = 'Biology');
   ```

   ```sql
   select name
   from instructor
   where salary > all (select salary
                      from instructor
                      where dept_name = 'Biology');
   ```

3. Set cardinality

   The **exists** construct returns the value true of the argument query is nonempty.

   ```sql
   select course_id
   from section as S
   where semester = 'Fall' and year = 2009 and 
   exitst (select *
          from secion as T
          where semester = 'Spring' and year = 2010 and S.course_id = T.course_id)
   ```

   The **unique** construct tests whether a query has any duplicate tuples in its result. The **unique** construct evaluates to true if a given query contains no duplicates.

   ```sql
   select T.course_id
   from course as T
   where unique (select R.course_id
                from section as R
                where T.course_id = R.course_id
                and R.year = 2009)
   ```

#### Queries in the From Clause

SQL allows a query expression to be used in the **from** clause.

```sql
select dept_name, avg_salary
from (select dept_name, avg(salary) as avg_salary 
      from instructor
      group by dept_name
      where avg_salary > 42000); 
```

The **with** clause provides a way of defining a temporary relation whose definition is available only to the query in which the **with** clause occurs.

```sql
with max_buget(value) as
	(select max(budget)
    from department)
select department.name
from department, max_budget
where department.budget = max_budget.value;
```

#### Queries in the Select Clause

Select query is one which is used where a single value is expected.

```sql
select dept_name, (select count(*)
                  from instructor
                  where department.dept_name = instructor.dept_name)
                  as num_instrcutors
from department;
```

## Data Definition Language

Data definition language allows the specification of not only a set of relations but also information about each relation, including:

- The schema of each relation
- The domain of values associated with each attribute
- Integrity constrains
- The set of indices to be maintained for each relations
- Security and authorization information for each relation
- The physical storage structure of each relation on disk

### Create Table Construct

![image-20231020132956048](./sql/image-20231020132956048.png)

*r* is the name of the relation, each $A_i$ is an attribute name in the schema of relation *r*, $D_i$ is the data type of values in the domain of attribute $A_i$.

For example:

```sql
create table instructor (
	ID char(5),
	name varchar(20) not null,
    dept_name varchar(20),
    salary numeric(8,2),
    primary key(ID),
    foreign key (dept_name) references department
);
```

### Domain Type in SQL

- **char(n)** Fixed length character string, with user specified length *n*
- **varchar(n)** Variable length character strings, with user specified maximum length *n*
- **int** Integer, a finite subset of the integers that is machine dependent
- **smallint** Small Integer,  a machine dependent subset of the integer domain type.
- **numeric(p, d)** Fixed point number, with user specified precision of *p* digits and *n* digits to the right decimal point
- **real/double precision** Floating point and double precision floating point numbers, with machine dependent precision
- **float(n)** Floating point number, with user specified precision of at least *n* digits

## Data manipulation language

### Drop and Alter Table Constructs

The **drop table** command deletes all information about the dropped relation from the database.

The **alter table** command is  used add attributes to an existing relation. For example, *alter table r add A D* where *A* is the name of the attribute to be added to relation *r* and *D* is the domain of *A*.

### Insertion

Add a new tuples to relations.

```sql
insert into course 
values ('CS-437', 'Database Systems', 'Comp. Sci.', 4)
```

```sql
insert into student
	select ID, name, dept_name, 0
	from instructor
```

### Update

Update the data in the relation.

```sql
update instructor set salary = case
	when salary <= 100000 then salary * 1.05
	else salary * 1.03
	end
```

## Embedded SQL

## ODBC & JDBC

## Transact SQL

