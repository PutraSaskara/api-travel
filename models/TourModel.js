const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/Database.js");
const slugify = require("../utils/slugify"); // Import the slugify function

const Plan = require('../models/PlanModel');
const Include = require('../models/IncludeMode');
const NotInclude = require('../models/NotIncludeModel');
const Image = require('../models/ImageModel');
const Detail = require('../models/DetailModel.js');
const Description = require('../models/DescriptionModel.js');
const Cancellation = require('../models/CancellationModel.js');

const Tour = db.define('tour', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pricenote1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price2: {
        type: DataTypes.STRING,
    },
    pricenote2: {
        type: DataTypes.STRING,
    },
    price3: {
        type: DataTypes.STRING,
    },
    pricenote3: {
        type: DataTypes.STRING,
    },
    slug: {
        type: DataTypes.STRING,
        unique: true // Ensure slug is unique
    }
}, {
    freezeTableName: true,
    hooks: {
        beforeValidate: (tour) => {
            if (tour.title) {
                // Generate slug from the title and save it
                tour.slug = slugify(tour.title);
            }
        }
    }
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
