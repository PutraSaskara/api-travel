const { DataTypes } = require("sequelize");
const db = require("../config/Database.js");

const Tour = db.define('tour', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

module.exports = Tour;
