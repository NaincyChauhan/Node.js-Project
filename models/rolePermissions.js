'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RolePermission extends Model { }

    RolePermission.init({
        permission_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'permissions',
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
        modelName: 'RolePermission',
        tableName: 'role_permissions',
    });

    return RolePermission;
}