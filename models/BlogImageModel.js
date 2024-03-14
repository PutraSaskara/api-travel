const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
const SingleBlog = require('./SingleBlogModel.js')

const { DataTypes } = Sequelize;

const BlogImage = db.define('blogimage', {
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

BlogImage.associate = () => {
    BlogImage.belongsTo(SingleBlog, { foreignKey: 'blogId' });
}

(async () => {
    await db.sync();
})();

module.exports = BlogImage;
