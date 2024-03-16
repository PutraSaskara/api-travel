const { DataTypes } = require("sequelize");
const db = require("../config/Database.js");
const slugify = require("../utils/slugify");
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
    slug: {
        type: DataTypes.STRING,
        unique: true // Ensure slug is unique
    }
}, {
    freezeTableName: true,
    hooks: {
        beforeValidate: (tour) => {
            if (tour.title) {
                // Generate slug from the title and save it
                tour.slug = slugify(tour.title);
            }
        }
    }
});

(async () => {
    await db.sync();
})();

SingleBlog.hasOne(BlogParagraf, { foreignKey: 'blogId', onDelete: 'CASCADE' });
SingleBlog.hasOne(BlogImage, { foreignKey: 'blogId', onDelete: 'CASCADE' });


module.exports = SingleBlog;
