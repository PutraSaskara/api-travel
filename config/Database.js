const {Sequelize} = require("sequelize");

const db = new Sequelize('baliholiday','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = db;