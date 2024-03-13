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
    },
    // tourId: {
    //     type: DataTypes.INTEGER, // Assuming the primary key of the Tour model is of type INTEGER
    //     allowNull: false,
    //     references: {
    //         model: Tour,
    //         key: 'id' // Assuming the primary key of the Tour model is named 'id'
    //     }
    // }
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();
// Cancellation.belongsTo(Tour, { foreignKey: 'tourId' });

module.exports = Cancellation;
