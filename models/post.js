'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        // This method is used to define model relations
        // static associate(models){

        // }
    }

    Post.init({
        
    }, {
        sequelize,
        modelName: 'Post',
        tableName: 'posts',
    });

    return Post;
}