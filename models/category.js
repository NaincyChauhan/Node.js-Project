'use strict';

const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {

        static associate(models) {
            Category.belongsTo(models.User, {
                foreignKey: 'author_id',
                as: 'author',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });

            Category.belongsToMany(models.Post, {
                through: models.PostCategory,
                foreignKey: 'category_id',
                otherKey: 'post_id',
                as: 'posts',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
        }
    }

    Category.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        parent_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0,
        },
        descripation: {
            type: DataTypes.STRING(400),
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING(60),
            defaultValue: 'published',
        }, 
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isInt: { msg: 'Author ID must be an integer.' },
            }
        },
        icon: {
            type: DataTypes.STRING(60),
        },
        order: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        is_featured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        is_default: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },        
    }, {
        sequelize,
        modelName: 'Category',
        tableName: 'categories',
    });

    return Category;
}