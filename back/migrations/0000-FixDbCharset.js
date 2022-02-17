require("dotenv").config();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(
            `ALTER DATABASE ${process.env.dbNameDev} CHARACTER SET utf8 COLLATE utf8_general_ci; `
        );
    },
};
