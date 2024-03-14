const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/Database.js");

const Plan = require('../models/PlanModel')
const Include = require('../models/IncludeMode')
const NotInclude = require('../models/NotIncludeModel')
const Image = require('../models/ImageModel')
const Detail = require('../models/DetailModel.js')
const Description = require('../models/DescriptionModel.js')
const Cancellation = require('../models/CancellationModel.js')

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

Tour.hasOne(Detail, { onDelete: 'CASCADE' });
Tour.hasOne(Plan, { foreignKey: 'tourId', onDelete: 'CASCADE' });
Tour.hasOne(Description, { foreignKey: 'tourId', onDelete: 'CASCADE' });
Tour.hasOne(Include, { foreignKey: 'tourId', onDelete: 'CASCADE' });
Tour.hasOne(NotInclude, { foreignKey: 'tourId', onDelete: 'CASCADE' });
Tour.hasOne(Cancellation, { foreignKey: 'tourId', onDelete: 'CASCADE' });
Tour.hasOne(Image, { foreignKey: 'tourId', onDelete: 'CASCADE' });

module.exports = Tour;
