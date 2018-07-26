# starter-node
This is a starter/template/bootstrap code for NodeJS based back-end.

## Why?
- To save time *and*:
  - have a strong application structure
  - have separation of concern
  - have modularity
  - have code-level scalability
  - not have a lot of "under the hood" alien code
  - have most of the bootstrap code in one repo instead of having them in multiple (which saves the trouble of forking and managing multiple repos (packages) at the same time)

## Out of the box features
- Basic user signup (encrypted password using hash and salt).
- Login, with signed [json web tokens](https://www.npmjs.com/package/jsonwebtoken).
- Bearer authentication middlewares using [passport](https://www.npmjs.com/package/passport).
- Third party authentication for google, facebook (*in progress*).
- Roles based access control (*in progress*).
- Multiple SQL based databases support using [Sequelize](https://www.npmjs.com/package/sequelize) (*in progress*).
- Multi-tenant support (based on configurable subdomain settings).


## How to set up
- Install Postgresql database.
- Make sure that the database server is up and running.
- Create a database with the name **starter_node** locally, or override the db name by setting `SN_DB_NAME` environment variable.
- Clone this repository.
- Run `npm install` from the root directory of this repo.
- Run `npm start` to boot up the application.
  - This will boot up the server listening for http requests.
  - It will try to connect to the database server, with database settings taken from the configuration file from `/config` directory, based on the current environment. (to help understand how config works have a look at https://www.npmjs.com/package/config)
  - Once connected to the database, `sequelize` will sync up the model definitions and create database tables.

If all goes well, you shouldn't see any errors on the console.

## Structure overview
- ***areas***: an area represents a logically separate module of functionality. *Areas* can be thought of as distinct 'departments' in an 'organization', where each has a distinct set of responsibilities that other *areas* can make use of but do not need to know the details of.
  - For example, *authorization* area does not have to be intermixed with the rest of the business logic, it exposes middlewares and helper methods that can be used in any other *area* in a very declarative manner.

The file `bin/www` initiates server and bootstrap scripts the application instance.