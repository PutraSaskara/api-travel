const { DataTypes } = require("sequelize");
const db = require("../config/Database.js");

const Include = db.define('included', {
    include1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    include2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    include3: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

module.exports = Include;
