const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
const Tour = require("../models/TourModel.js")

const {DataTypes} = Sequelize;
const Include = db.define('included', {
    include1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    include2: {
        type: DataTypes.STRING,
    },
    include3: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();
Include.associate = () => {
    Include.belongsTo(Tour, { foreignKey: 'tourId' });
}
module.exports = Include;
