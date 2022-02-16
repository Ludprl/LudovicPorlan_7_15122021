module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(
            `ALTER DATABASE groupomania CHARACTER SET utf8 COLLATE utf8_general_ci; `
        );
    },
};
