const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
const Tour = require("../models/TourModel.js");

const { DataTypes } = Sequelize;

const Image = db.define('image', {
    image1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image2: {
        type: DataTypes.STRING,
    },
    imageUrl2: {
        type: DataTypes.STRING,
    },
    image3: {
        type: DataTypes.STRING,
    },
    imageUrl3: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true
});

Image.associate = () => {
    Image.belongsTo(Tour, { foreignKey: 'tourId' });
}

(async () => {
    await db.sync();
})();

module.exports = Image;
