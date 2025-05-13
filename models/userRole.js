'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserRole extends Model { }

    UserRole.init({
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'roles',
                key: 'id',
            },
            onDelete: 'CASCADE',
        }
    }, {
        sequelize,
        modelName: 'UserRole',
        tableName: 'user_roles',
    });

    return UserRole;
}