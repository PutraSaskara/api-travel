const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
const SingleBlog = require('./SingleBlogModel.js')

const {DataTypes} = Sequelize;

const BlogParagraf = db.define('blog_paragraf', {
    paragraf1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    titleparagraf2: {
        type: DataTypes.STRING,
    },
    paragraf2: {
        type: DataTypes.STRING,
    },
    link2: {
        type: DataTypes.STRING,
    },
    titleparagraf3: {
        type: DataTypes.STRING,
    },
    paragraf3: {
        type: DataTypes.STRING,
    },
    link3: {
        type: DataTypes.STRING,
    },
    titleparagraf4: {
        type: DataTypes.STRING,
    },
    paragraf4: {
        type: DataTypes.STRING,
    },
    link4: {
        type: DataTypes.STRING,
    },
    titleparagraf5: {
        type: DataTypes.STRING,
    },
    paragraf5: {
        type: DataTypes.STRING,
    },
    link5: {
        type: DataTypes.STRING,
    },
    titleparagraf6: {
        type: DataTypes.STRING,
    },
    paragraf6: {
        type: DataTypes.STRING,
    },
    link6: {
        type: DataTypes.STRING,
    },
    titleparagraf7: {
        type: DataTypes.STRING,
    },
    paragraf7: {
        type: DataTypes.STRING,
    },
    link7: {
        type: DataTypes.STRING,
    },
    Conclusion: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();


BlogParagraf.associate = () => {
    BlogParagraf.belongsTo(SingleBlog, { foreignKey: 'blogId' });
}

module.exports = BlogParagraf;
