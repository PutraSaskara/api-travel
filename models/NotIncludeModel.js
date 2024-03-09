const { DataTypes } = require("sequelize");
const db = require("../config/Database.js");

const NotInclude = db.define('not_included', {
    notinclude1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notinclude2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    notinclude3: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

module.exports = NotInclude;
