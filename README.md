# starter-node

The file `bin/www` initiates server and bootstrap scripts the application instance.

## How to set up
- Install Postgresql database version 10.3. You can also install a UI tool for Postgresql like pgAdmin3, or any other of your choosing.
- Make sure that the database server is up and running.
- Create a database with the name **starter_node** locally.
- Clone this repository.
- Run `npm install` from the root directory of this repo.
- Run `npm start` to boot up the application.
  - This will boot up the server listening for http requests.
  - It will try to connect to the database server, with database settings taken from the configuration file from `/config` directory, based on the current environment. (to help understand how config works have a look at https://www.npmjs.com/package/config)
  - Once connected to the database, `sequelize` will sync up the model definitions and create database tables.

If all goes well, you shouldn't see any errors on the console.
