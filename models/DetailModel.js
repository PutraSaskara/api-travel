const { DataTypes } = require("sequelize");
const db = require("../config/Database.js");

const Detail = db.define('tour_detail', {
    detail1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    detail2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    detail3: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    detail4: {
        type: DataTypes.STRING,
    },
    detail5: {
        type: DataTypes.STRING,
    },
    detail6: {
        type: DataTypes.STRING,
    },
    detail7: {
        type: DataTypes.STRING,
    },
    detail8: {
        type: DataTypes.STRING,
    },
    detail9: {
        type: DataTypes.STRING,
    },
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

module.exports = Detail;
