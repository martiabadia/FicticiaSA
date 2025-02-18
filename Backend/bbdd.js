const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './.data/clientsDatabase.db'
});

module.exports = sequelize;