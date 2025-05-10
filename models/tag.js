'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Tag extends Model {
        // This method is used to define model relations
        // static associate(models){

        // }
    }

    Tag.init({
        
    }, {
        sequelize,
        modelName: 'Tag',
        tableName: 'tags',
    });

    return Tag;
}