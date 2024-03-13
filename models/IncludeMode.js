const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
const Tour = require("../models/TourModel.js")

const {DataTypes} = Sequelize;
const Include = db.define('included', {
    include1: {
        type: DataTypes.STRING,
    },
    include2: {
        type: DataTypes.STRING,
    },
    include3: {
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
// Include.belongsTo(Tour, { foreignKey: 'tourId' });
module.exports = Include;
