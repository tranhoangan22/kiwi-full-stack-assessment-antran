# KIWI.KI Coding Challenge

## Context

For the purpose of this challenge you will work with a simple data model consisting of users, doors, addresses and permissions. Each door in the database is located at a certain address. It is equipped with a KIWI sensor that allows to open it via app or transponder. A sensor can be identified by it's UUID. A user can have access permissions to different doors to open it via KIWI.

## Requirements

Please write a simple React frontend that presents information about all doors in the database. It should basically have two different views:
* List view showing basic information (name, address, last sensor communication) for all doors.
* Details view that displays all the information about a single door including the list of users that have a permission to it. Additionally, it should be possible to grant new permissions for the sensor to existing users.

To provide the frontend with the required data and allow to manipulate it, please write an API in Python 3 that takes care of any communication with the two data stores (see below). You are free to decide on the design of the endpoints, but make sure they conform with REST principles.

### General notes

* Keep it simple and to the point (authentication, localization, etc. is not required).
* Feel free to use any frameworks or libraries.
* Even though the provided database dumps only contain a small number of test entities, make sure that your code would work well with larger amounts of data, too.
* Please dockerize the two applications. If you'd like, you can also add them to the existing docker compose file.
* Please push your code to a public git repository and send us the link to it.


## Development setup

We've prepared a small development setup with two data stores that are already populated with some testing data. To get started, follow the instructions below:

* Install [Docker](https://docs.docker.com/get-docker) and [Docker Compose](https://docs.docker.com/compose/install), if you don't have it already
* Start the services by running `docker-compose up`

### Postgres

The postgres instance acts as the main database that contains the main entities as explained before. The table and column names are quite self-explanatory, which is why the schema is not described in detail here.

The database is called `kiwi` and you can use the user `kiwi` without any password for authentication. The instance is running on port 5432.

### Redis

For keeping track of the status of the sensors in the field, a redis instance is used as a data store for more frequently updated information. Even though you will work with constant data for the purpose of this task, keep in mind that in production the data in this redis would be updated very often. 

For matching a door stored in the postgres database with the status information of the installed sensor stored in redis you need to use the sensor's UUID. Integrity between both data stores is not ensured, i.e. postgres entities may refer to sensors for which there is no data in redis and vice versa.

The redis instance has no authentication and is running on port 6379. 

| Key schema                     | Description                                                       |
|--------------------------------|-------------------------------------------------------------------|
| `last_opening_ts:<UUID>`       | UNIX timestamp of the most recent opening of the sensor `<UUID>`  |
| `last_communication_ts:<UUID>` | UNIX timestamp of the last communication with the sensor `<UUID>` |
