'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Permission extends Model {
        static associate(models){
            Permission.belongsToMany(models.Role, {
                through: 'role_permissions',
                foreignKey: 'permission_id',
                otherKey: 'role_id',
            });

            Permission.belongsToMany(models.User, {
                through: 'user_permissions',
                foreignKey: 'permission_id',
                otherKey: 'user_id',
            });
        }
    }

    Permission.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {
        sequelize,
        modelName: 'Permission',
        tableName: 'permissions',
    });

    return Permission;
}