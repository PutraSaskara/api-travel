const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
const Tour = require("../models/TourModel.js")

const {DataTypes} = Sequelize;

const Image = db.define('image', {
    image1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image2: {
        type: DataTypes.STRING,
    },
    image3: {
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
// Image.belongsTo(Tour, { foreignKey: 'tourId' });
module.exports = Image;
