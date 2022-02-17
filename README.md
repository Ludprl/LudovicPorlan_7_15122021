# Groupomania

Social website for Groupomania.

## Tasks

    - Back-end with Node and MySQL
    - Front-end (React)

## Installation

Clone this repository

## Back-end Installation

From the back-end folder (back), you must have Mysql installed.

1. Open a terminal and write:

```bash
     npm install
```

2. You should have a file "config.js" in the folder "config", where it is written:

```bash

        development: {
               username: process.env.dbUsername,
               password: process.env.dbPassword,
               database: process.env.dbNameDev,
               host: process.env.dbHost,
               dialect: "mysql",
    }

```

Change the username, password, host and database name with your configuration.

3. Now create the database in the terminal with:

```bash
     npx sequelize-cli db:create
     npx sequelize-cli db:migrate
```

4. To finish write:

```bash
     npm start
```

## Front-end Installation

From the front-end folder (front), open a terminal and write:

```bash
     npm install
```

Then

```bash
     npm start
```

---
