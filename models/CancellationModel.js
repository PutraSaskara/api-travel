const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
const Tour = require("../models/TourModel.js")

const {DataTypes} = Sequelize;

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

Cancellation.associate = () => {
    Cancellation.belongsTo(Tour, { foreignKey: 'tourId' });
}

module.exports = Cancellation;
