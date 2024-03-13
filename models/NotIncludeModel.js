const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
const Tour = require("../models/TourModel.js")

const {DataTypes} = Sequelize;

const NotInclude = db.define('not_included', {
    notinclude1: {
        type: DataTypes.STRING,
    },
    notinclude2: {
        type: DataTypes.STRING,
    },
    notinclude3: {
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

// NotInclude.belongsTo(Tour, { foreignKey: 'tourId' });

module.exports = NotInclude;
