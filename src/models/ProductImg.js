const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');



const ProductImg = sequelize.define('product', {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publicId: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = ProductImg;