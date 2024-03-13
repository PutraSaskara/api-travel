const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");


const Plan = require('../models/PlanModel')
const Include = require('../models/IncludeMode')
const NotInclude = require('../models/NotIncludeModel')
const Image = require('../models/ImageModel')
const Detail = require('../models/DetailModel.js')
const Description = require('../models/DescriptionModel.js')
const Cancellation = require('../models/CancellationModel.js')

const {DataTypes} = Sequelize;

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


Tour.hasOne(Detail);
Tour.hasOne(Plan, { foreignKey: 'tourId' });
Tour.hasOne(Description, { foreignKey: 'tourId' });
Tour.hasOne(Include, { foreignKey: 'tourId' });
Tour.hasOne(NotInclude, { foreignKey: 'tourId' });
Tour.hasOne(Cancellation, { foreignKey: 'tourId' });
Tour.hasOne(Image, { foreignKey: 'tourId' });

module.exports = Tour;
