# Memory Mangement

## Background

## Swapping

## Contiguous Memory Allocation

## Paging

### Shared Page

#### Shared Code

One copy of read-only code shared among processes. So shared code must appear in the same location in the logical address sapce of all processes.

#### Private Code and Data

Each process keeps a separate copy of the code and data. The pages for the private code and data can appear anywhere in the logical address space.

There is a image for the processes with the same code to share code pages.

![image-20231106165507807](./memory-management/image-20231106165507807.png)

## Structure of The Page Table

### Hierarchical Paging

Break up the logical address space into multiple page tables. A simple technique is a two-level page table.

For example: a logical address(on 32-bit machine with 4K page size) is divided into:

- a page number consisting of 20 bits
- a page offset consisting of 12 bits

And the page table is paged, the page number is further divided into:

- 10-bit page number
- 10-bit page offset

![image-20231106165942358](./memory-management/image-20231106165942358.png)

### Hashed Page Table

The virtual page number is hashed into a page table. 

![image-20231106170152406](./memory-management/image-20231106170152406.png)

The question of hashing to avoid conflict. In this image, we store a chain of elements with the same hash value.

### Inverted Page Table

One entry for each real page of memory. Entry consists of the virtual address of the page stored in that real memory location, with information about the process that owns that page.



## Segmentation

Memory-management scheme that supports user view of memory. A program is a collection of segments. A segment is a logical unit such as:

- main program
- procedure
- function
- method
- ...

![image-20231106170757480](./memory-management/image-20231106170757480.png)

### Segmentation Architecture

Logical address consists of two tuples: <segment-number, offset>。

**Segment table** maps the physical addresses and table entry has:

- *base* contains the starting physical address where the segments reside in memory
- **limit** specifies the length of the segment

And the program will has tow special registers:

- Segment table base register **STBR**: points to the segment table's location in memory

- Segment table length register **STLR**: indicates number of segments used by a program

  Segment number *s* is legal when s < STLR



## Example

