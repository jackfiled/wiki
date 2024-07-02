# Query Processing

## Basic Stpes in Query Processing

![image-20231205130439464](./query-processing/image-20231205130439464.png)

**Parsing and translation**: Translate the query into its internal form, which is then translated into relation algebra. And the parser will checks syntax, verfies relations.

**Query optimization**: Among all equivalent evaluation plans choose the one with lowest cost.

**Evaluation**: The query-execution engine takes a query-evaluation plan, executes that plan and returns the answers to the query.

### Optimization

A relation algebra expression may have many equivalent expressions, for example:
$$
\sigma_{salary < 1000}(\Pi_{salary}(instructor))
$$
is equivalent to 
$$
\Pi_{salary}(\sigma_{salary < 1000}(instructor))
$$
But this chapter will mainly focus on how to measure query cost.

## Measures of Query Cost

Cost is generally measured as total elapsed time for answering query. And many factors contribute to time cost:

- Disk accesses
- CPU
- Netowork communication

And typicially **disk access** is the predominant cost and is also relatively easy to estimate, measured by taking into account:

- Number of seeks: average seek cost
- Number of blocks read: average block read cost
- Number of blocks written: average block write cost

And for simplicity, we just use **number of block transferd from disk** and **the number of seeks** as the cost measures.

### Select Operation

**File Scan** serch algorithms that locate and retrieve records that fulfill a selection condition.

#### Linear Search

Sacn each file block and test all records to see whether they satisfy the selection condition.

###

