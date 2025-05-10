'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Tag extends Model {
        static associate(models){
            Tag.belongsTo(models.User, {
                foreignKey: 'author_id',
                as: 'author',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });

            Tag.belongsToMany(models.Post, {
                through: models.PostTag,
                foreignKey: 'tag_id',
                otherKey: 'post_id',
                as: 'posts',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
        }
    }

    Tag.init({
        title: {
            allowNull: false,
            type: DataTypes.STRING(120),
        },
        description: {
            type: DataTypes.STRING(400),
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
    }, {
        sequelize,
        modelName: 'Tag',
        tableName: 'tags',
    });

    return Tag;
}