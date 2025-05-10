'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models){
            Post.belongsTo(models.User, {
                foreignKey: 'author_id',
                as: 'author',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });

            Post.belongsToMany(models.Tag, {
                through: models.PostTag,
                foreignKey: 'post_id',
                as: 'tags',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });

            Post.belongsToMany(models.Category, {
                through: models.PostCategory,
                foreignKey: 'post_id',
                as: 'categories',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
        }
    }

    Post.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(400),
            allowNull: true,
        },
        content: {
            type: DataTypes.TEXT,
        },
        status: {
            type: DataTypes.STRING(60),
            defaultValue: 'published',
        },
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isInt: { msg: "Author id must be integer. "},
            }
        },
        is_featured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        image: {
            type: DataTypes.STRING,
        },
        views: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        format_type: {
            type: DataTypes.STRING(30),
        },        
    }, {
        sequelize,
        modelName: 'Post',
        tableName: 'posts',
    });

    return Post;
}