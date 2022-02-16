# Groupomania

Social website for Groupomania.

## Tasks

    - Back-end with Node and MySQL
    - Front-end (React)

## Installation

Clone this repository

## Back-end Installation

From the back-end, you must have Mysql.

```bash
     cd back
```

1. Open a terminal and write:

```bash
     npm install
```

2. You should have a file "config.json" in the folder "config", where it is written:

```bash

    {
    "development": {
        "username": "root",
        "password": "",
        "database": "groupomania",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
    }
```

Change the username and password with your configuration.

3. Now create the database in the terminal with:

```bash
     npx sequelize-cli db:create
     npx sequelize-cli db:migrate
```

3.1 (optionnal) If you want some data you can import in your databasse the file Si vous souhaitez ajouter des valeurs à votre base de données, vous pouvez importer le fichier groupomania.sql (in database/groupomania.sql):

```bash
    use your habitual software
    or with the SQL terminal replacing with your "user" and "password" write the commmand:
            mysql -u user -p password groupomania_db < groupomania.sql
```

With this data you have acces at the account of toto@group.com (an user) and ocr@group.com (an admin) with the password GroupOcr01\*

4. To finish write:

```bash
     npm start
```

## Front-end Installation

From the front-end (port 3000), open a terminal and write:

```bash
     npm install
```

Then

```bash
     npm start
```

---

Enjoy
