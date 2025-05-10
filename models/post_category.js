'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PostCategory extends Model {
        // This method is used to define model relations
        // static associate(models){

        // }
    }

    PostCategory.init({
        
    }, {
        sequelize,
        modelName: 'PostCategory',
        tableName: 'post_categories',
    });

    return PostCategory;
}