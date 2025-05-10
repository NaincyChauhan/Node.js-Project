'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PostCategory extends Model {
        static associate(models){
            PostCategory.belongsTo(models.Category, {
                foreignKey: 'category_id',
                as: 'category',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });

            PostCategory.belongsTo(models.Category, {
                foreignKey: 'post_category',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
        }
    }

    PostCategory.init({
        category_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            validate: {
                isInt: { msg: " Category id must be an integer. "},
            },
        },
        post_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            validate: {
                isInt: { msg: "Post id must an integer. "},
            }
        }
    }, {
        sequelize,
        modelName: 'PostCategory',
        tableName: 'post_categories',
    });

    return PostCategory;
}