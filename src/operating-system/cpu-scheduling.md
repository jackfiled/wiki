# CPU Scheduling

## Basic Concept

Maximum CPU utilization obtained with multiprogramming.

CPU burst distribution: 

### CPU Scheduler

Selects from among the processes in memory that are ready to execute, and allocates the CPU to one of them.

The CPU scheduling decisions may take place when a process:

- Switches from running to waiting
- Switches from running to ready (time slot)
- Switches from waiting to ready
- Process terminates

**Dispatcher** module gives control of the CPU to he process selected by the short-term scheduler, involving:

- Switching context
- Switching to user mode
- Jumping to the proper location in the user program to restart that program

**Dispatch latency** is the time it takes for the dispatcher to stop one process and start another running.

## Scheduling Criteria

**CPU utilization**: keep the CPU as busy as possible.

**Throughput**: number of processes that complete their execution per time unit.

**Turnaround**: amount of time to execute a particular process.

**Waiting time**: amount of time a process has been waiting in the ready 

## Scheduling Algorithms

### First-Come First-Server

### Shortest Job First



### Shortest Remaining Time First

### Priority Scheduling

A priority number is associated with each process. The CPU is allocated to the process with the highest priority. 

And there also can be two ways:

- Preemptive
- Nonpreemptive

The shortest job first scheduling is also a priority scheduling where priority is the predicted next CPU burst time.

But the problem is the low priority process may be never execute. We can age every process to make low priority process can be executed after a long time, though calculating priority every time may waste resources.

### Round Robin

### Multilevel Queue

Ready queue is partitioned into two queues:

- Foreground queue: `FCFS`
- Background queue: `RR`





## Multiple Processor Scheduling 

## Real Time Scheduling

## Thread Scheduling 

## Operating System Examples

## Algorithm Evaluation

