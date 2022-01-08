require("dotenv").config();

module.exports = {
    development: {
        username: process.env.dbUsername,
        password: process.env.dbPassword,
        database: process.env.dbNameDev,
        host: process.env.dbHost,
        dialect: "mysql",
    },
    test: {
        username: process.env.dbUsername,
        password: process.env.dbPassword,
        database: process.env.dbNameTest,
        host: process.env.dbHost,
        dialect: "mysql",
    },
    production: {
        username: process.env.dbUsername,
        password: process.env.dbPassword,
        database: process.env.dbNameProd,
        host: process.env.dbHost,
        dialect: "mysql",
    },
};
