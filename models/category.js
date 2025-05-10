'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {

    }

    Category.init({
        
    }, {
        sequelize,
        modelName: 'Category',
        tableName: 'categories',
    });

    return Category;
}