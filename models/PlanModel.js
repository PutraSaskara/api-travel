const { DataTypes } = require("sequelize");
const db = require("../config/Database.js");

const Plan = db.define('tour_plan', {
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

module.exports = Plan;
