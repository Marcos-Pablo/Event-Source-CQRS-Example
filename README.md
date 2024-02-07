# Description

This project is a Nest.js application built with TypeScript, leveraging the powerful architectural patterns of **Command Query Responsibility Segregation (CQRS)** and **Event Sourcing**.

## Key Features:
- **CQRS and Event Sourcing:** Embrace the separation of command and query responsibilities, along with the Event Sourcing pattern to capture and persist all domain events.

- **MongoDB Event Store:** Utilize MongoDB as the event store to persistently record all events associated with Event Sourcing, providing a durable log of system changes.

- **MySQL Projection Database:** Employ a MySQL database as a projection store, capturing and storing the final state of entities after processing all events related to them. This serves as an efficient queryable source for read operations.

- **Redis Cache:** Leverage Redis as a caching layer to enhance performance, providing faster access to frequently requested data and optimizing response times.

### Getting Started:
To get started with the project, follow these steps:

```bash
$ git clone https://github.com/Marcos-Pablo/Event-Source-CQRS-Example.git
$ npm install
$ docker-compose up -d
```