const { DataTypes } = require("sequelize");
const db = require("../config/Database.js");
const BlogParagraf = require('./BlogParagrafModel.js')
const BlogImage = require('./BlogImageModel.js')


const SingleBlog = db.define('single_blog', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
    },
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

SingleBlog.hasOne(BlogParagraf, { foreignKey: 'blogId', onDelete: 'CASCADE' });
SingleBlog.hasOne(BlogImage, { foreignKey: 'blogId', onDelete: 'CASCADE' });


module.exports = SingleBlog;
