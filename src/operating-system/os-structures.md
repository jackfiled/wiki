# Operating System Structures

## Operating System Services

1. User interface

   Almost all operating systems have a user interface, command-line or graphics user interface.

2. Program execution

   System capability to load a program into memory and to run it.

3. I/O operations

   Since user programs can't execute I/O operations directly, the operating system must provide some means.

4. File system manipulation

   Program capability to read, write, create and delete files.

5. Communications

   Exchange of information between processors, both on the same computer and the other computers.

6. Error detect

   Ensure correct computing by detecting errors in the CPU, memory hardware, I/O devices and user programs.

And there are additional operating system functions that exist not for helping the user, but for ensuring the efficient system operations.

- Resource allocation
- Accounting
- Protection

## User Operating System Interface

### Command Line Interface

`CLI` allows direct command entry, sometimes implemented in the kernel and sometimes by one system program. And there are multiple flavors implemented called `shell`.

### Graphics User Interface

`GUI` is a user-friendly desktop metaphor interface, usually containing mouse, keyboard and monitor. Many systems now include both `CLI` and `GUI`.

## System Calls

System calls provide the interface between a running program and the operating system. The system calls are generally available as assembly language instructions, and languages defined to replace assembly language for systems programming allow system calls to be made directly, for example `C` and `C++`.

![image-20230921155918085](./os-structures/image-20230921155918085.png)

There are three general methods are used to pass parameters between a running program and the operating system.

1. Using registers
2. Store the parameters in a table in memory, and the table address is passed as a parameter in a register
3. Push the parameters onto the stack by the program, and pop off the stack by the operating system

## Types of System Calls

There are five types of system calls:

- Process control
- File management
- Device management
- Information maintenance
- Communications

The communications may take place using either message passing or shard memory:

![image-20230921160429687](./os-structures/image-20230921160429687.png)

## System Programs

System programs provide a convenient environment for program development and execution. They can be divided into

- File manipulation
- Status information
- File modification
- Programming language support
- Program loading and execution
- Communications
- Application programs

And most users' views of the operating system is defined by the system program, not by system calls.

## Operating System Design and Implementation

The operating system design and implementation is started by defining goals and specifications, and will be affected by choice of hardware and type of system.

The Operating system goals can be divided into user goals and system goals:

- User goals: operating system should be convenient to use, easy to learn, reliable and safe and fast
- System goals: operating system should be easy to design, implement and maintain, as well as flexible, reliable, error-free and efficient

### Mechanisms and Policies

Mechanisms determine how to do something, policies decide what will be done.

The separation of policy from mechanism is a very important principle, it allows maximum flexibility if policy decisions  are to be changed later.

### System Implementation

The operating system is written in assembly language traditionally, now can be written in higher-level languages.

Using the high-level language have the benefits:

- Can be written faster
- Is more compact
- Is easier to understand and debug
- Is far easier to port to other hardware

## Operating System Structure

 We will introduce two operating system structures: the MS-DOS system structure and Unix system structure.

### MS-DOS System structure

 The MS-DOS system structure is written to provide the most functionality in the least space, not divided into modules. Although MS-DOS has some structure, its interfaces and levels of functionality are not well separated.

![image-20230922134327718](./os-structures/image-20230922134327718.png)

### Unix System Structure

The Unix system structure is limited by hardware functionality, the original Unix operating system had limited structuring. The Unix operating system consists of two separable parts:

- System programs

- The kernel

  The kernel consisting of everything below the system-call interface and above the physical hardware. And the kernel providers the file system, CPU scheduling, memory management and other operating system functions.

![image-20230922135210825](./os-structures/image-20230922135210825.png)

### Layered Approach

The operating system is divided into a number of layers, each built on the top of lower layers. The bottom layer is the hardware, the highest layer is the user interface.

With modularity, layers are selected such that each uses functions (operations) and services of only lower-level layers. 

![image-20230922135427322](./os-structures/image-20230922135427322.png)

### Micro Kernel System Structure

The micro kernel system structure is aimed to move as much from the kernel into *user* space, the communication takes place between user modules using message passing. The benefits of micro kernel system structure are:

- Easier to extend a micro kernel
- Easier to port the operating system to new architectures
- More reliable and secure, as less code is running in kernel mode

## Virtual Machine

A virtual machine takes the layered approach to its logical conclusion, it treats hardware and the operating system kernel as though they were all hardware. A virtual machine provides an interface **identical** to the underlying bard hardware. 

The resources of the physical computer are shared to create the virtual machines:

- CPU scheduling can create the appearance that users have their own processor
- Spooling and a file system can provide virtual card readers and virtual line printer
- A normal user time-sharing terminal serves as the virtual machine operator's console

![image-20230922140819129](./os-structures/image-20230922140819129.png)

### The Advantages and Disadvantages of Virtual Machines

The virtual machine concept provides complete protection of system resources since each virtual machine is isolated from all other virtual machines. This isolation, however, permits no direct sharing of resources.

The virtual machine system is a perfect vehicle for operating system research and development. System development is done on the virtual machine, instead of on a physical machine and so does not disrupt norm system operation.

But the virtual machine concept is difficult to implement due to the effort required to provide an exact duplicate to the underlying machine.

## System Generation and System Boot

Operating systems are designed to run on any of a class of machines, the system must be configured for each specific computer site.

The system generation program obtains information concerning the specific configuration of the hardware system. 

The booting is starting a computer by loading the kernel. System boot will use the **bootstrap program** ,code stored in ROM that is able to locate the kernel, load it into memory and start its execution.



