const { DataTypes } = require("sequelize");
const db = require("../config/Database.js");

const Cancellation = db.define('cancellation', {
    cancel1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cancel2: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

module.exports = Cancellation;
