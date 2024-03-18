const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
const Tour = require("../models/TourModel.js")

const {DataTypes} = Sequelize;

const NotInclude = db.define('not_included', {
    notinclude1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notinclude2: {
        type: DataTypes.STRING,
    },
    notinclude3: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

NotInclude.associate = () => {
    NotInclude.belongsTo(Tour, { foreignKey: 'tourId' });
}

module.exports = NotInclude;
