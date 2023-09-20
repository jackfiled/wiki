# Processes

## Process Concept

An operating system executes a variety of programs:

- For batch system: jobs
- For time-shared systems: user programs or tasks

> In textbook, the terms *job* and *process* are used almost interchangeably.

Process is a program in execution, process execution must progress in sequential fashion. A process includes:

- Program counter
- Stack
- Data section

### Process State

As a process executes, it changes state:

- **new**: The process is being created
- **running**: Instructions are being executed
- **waiting**: The process is waiting for some event to occur
- **ready**: The process is waiting to be assigned to a processor
- **terminated**: The process has finished execution

![image-20230920084215594](./processes/image-20230920084215594.png)

### Process Control Block 

Information associated with each process:

- Process state
- Program counter
- CPU registers
- CPU scheduling information
- Memory management information
- Accounting information
- I/O status information

## Process Scheduling

![image-20230920091907169](./processes/image-20230920091907169.png)

There are four queues in process scheduling:

- Job queue: set of all processes in the system
- Ready queue: set of all processes residing in the main memory, ready and wait to execute
- Device queue: set of processes waiting for an I/O device
- Processes migration between the various queues

![image-20230920092245289](./processes/image-20230920092245289.png)

And there are two schedulers:

- Long-term scheduler(job scheduler): selects processes should be brought into the ready queue
- Short-term scheduler(CPU scheduler): selects which process should executed next and allocate CPU

The short-term scheduler is invoked very frequently and must be fast, the long-tern scheduler is invoked very infrequently so it may be slow.



## Operations on Processes

## Cooperating Processes

## Interprocess Communication

## Communication in Client-Server Systems

