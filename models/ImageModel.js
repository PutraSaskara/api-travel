const { DataTypes } = require("sequelize");
const db = require("../config/Database.js");

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
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

module.exports = Image;
