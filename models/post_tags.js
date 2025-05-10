'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PostTag extends Model {
        static associate(models){
            PostTag.belongsTo(models.Tag, {
                foreignKey: 'tag_id',
                as: 'tag',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });

            PostTag.belongsTo(models.Tag, {
                foreignKey: 'tag_id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
        }
    }

    PostTag.init({
        tag_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            validate: {
                isInt: { msg: "Tag id must be an ingeter. "},
            },
        },
        post_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            validate: {
                isInt: { msg: "Post id must be an integer."},
            }
        }
        
    }, {
        sequelize,
        modelName: 'PostTag',
        tableName: 'post_tags',
    });

    return PostTag;
}