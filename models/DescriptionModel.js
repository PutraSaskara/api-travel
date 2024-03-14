    const { Sequelize } = require("sequelize");
    const db = require("../config/Database.js");
    const Tour = require("../models/TourModel.js")

    const {DataTypes} = Sequelize;

    const Description = db.define('tour_description', {
        paragraf1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        paragraf2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        paragraf3: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        freezeTableName: true
    });

    (async () => {
        await db.sync();
    })();

    // Description.belongsTo(Tour, { foreignKey: 'tourId' });

    Description.associate = () => {
        Description.belongsTo(Tour, { foreignKey: 'tourId' });
    }

    module.exports = Description;
