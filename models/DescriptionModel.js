const { DataTypes } = require("sequelize");
const db = require("../config/Database.js");

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

module.exports = Description;
