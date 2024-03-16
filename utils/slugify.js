// utils/slugify.js

const slugify = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-'); // Replace spaces with hyphens
};

module.exports = slugify;
