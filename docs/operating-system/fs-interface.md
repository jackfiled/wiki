## File Concept

Contiguous logcial address space.

### File Structure

1. None

   Sequence of words or bytes.

2. Simple record structure

   Lines, fixed /variable length

3. Complex Structures

   Formatted document

   Relocatable load file

   > Can simulate last two with first method by inserting appropriate control characters.


### File Attribute

Name: only information kept in human-readable form.

Type: needed for systems that support different types.

Locateion: pointer to file location on device.

Size: current file size.

Protection: controls who can do read, write and execute.

Time, date and user identification: data for protection, security and usage monitoring.

Information about files are kept in the directory structure, which is maintained on the disk.

### File Operations

- Create
- Write
- Read
- Reposition within file a.k.a file seek
- Delete
- Truncate
- Open: search the directory structure on disk and move the content to the memory
- Close: move the content of entry in memory to directory structure on disk

## Access Methods

### Sequential Access

Supports:

- read next
- write next
- reset

No read after last write.

### Direct Access

Supports:

- read n

- write n

- position to n

  read next

  write next

- rewrite n

![image-20231204154116876](./fs-interface/image-20231204154116876.png)

And using a direct-access file to simulate a sequential access.

## Directory Structure

A collection of nodes containing information about all files. Both the directory structure and the files reside on disk.

The information in a device directory:

- Name
- Type
- Address
- Current length
- Maximum length
- Date last accessed
- Date last updated
- Owner ID
- Protection Information

And the operations performed on a directory:

- Search for a file
- Create a file
- Delete a file
- List a directory
- Rename a file
- Traverse the file system

The directory can be organized:

- Single level directory
- Tow  level directory
- Tree structured directory
- Acyclic graph directory
- General Graph directory

For acyclic graph directory, need to handle dangling pointer problem:

- Using backpointers to delete all pointers reference the file
- The backpointers can be organized using a daisy chain
- Entry hold count is also a solution

For general graph directory, need to gurantee no cycles:

- Allow only links to file and not subdirectories
- Grabage collections
-  When creating a new link using a cycle detection algorithm to determine

## File System Mounting

A file system must be **mounted** before it can be accessed, a mounted file system is mounted a t a **mount point**.

## File Sharing



## Protection

