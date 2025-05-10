'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PostTag extends Model {
        // This method is used to define model relations
        // static associate(models){

        // }
    }

    PostTag.init({
        
    }, {
        sequelize,
        modelName: 'PostTag',
        tableName: 'post_tags',
    });

    return PostTag;
}