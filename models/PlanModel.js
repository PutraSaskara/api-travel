const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
const Tour = require("../models/TourModel.js")

const { DataTypes } = Sequelize;

const Plan = db.define('tour_plan', {
    title1: {
        type: DataTypes.STRING,
    },
    description1: {
        type: DataTypes.TEXT,
    },
    link1: {
        type: DataTypes.STRING,
    },
    title2: {
        type: DataTypes.STRING,
    },
    description2: {
        type: DataTypes.TEXT,
    },
    link2: {
        type: DataTypes.STRING,
    },
    title3: {
        type: DataTypes.STRING,
    },
    description3: {
        type: DataTypes.TEXT,
    },
    link3: {
        type: DataTypes.STRING,
    },
    title4: {
        type: DataTypes.STRING,
    },
    description4: {
        type: DataTypes.TEXT,
    },
    link4: {
        type: DataTypes.STRING,
    },
    title5: {
        type: DataTypes.STRING,
    },
    description5: {
        type: DataTypes.TEXT,
    },
    link5: {
        type: DataTypes.STRING,
    },
    title6: {
        type: DataTypes.STRING,
    },
    description6: {
        type: DataTypes.TEXT,
    },
    link6: {
        type: DataTypes.STRING,
    },
    title7: {
        type: DataTypes.STRING,
    },
    description7: {
        type: DataTypes.TEXT,
    },
    link7: {
        type: DataTypes.STRING,
    },
    title8: {
        type: DataTypes.STRING,
    },
    description8: {
        type: DataTypes.TEXT,
    },
    link8: {
        type: DataTypes.STRING,
    },
    title9: {
        type: DataTypes.STRING,
    },
    description9: {
        type: DataTypes.TEXT,
    },
    link9: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

Plan.associate = () => {
    Plan.belongsTo(Tour, { foreignKey: 'tourId' });
}

module.exports = Plan;
