'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models){
            Role.belongsToMany(models.User, {
                through: 'user_roles',
                foreignKey: 'role_id',
                otherKey: 'user_id',
            });

            Role.belongsToMany(models.Permission, {
                through: 'role_permissions',
                foreignKey: 'role_id',
                otherKey: 'permission_id',
            });
        }
    }

    Role.init({
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
        modelName: 'Role',
        tableName: 'roles',
    });

    return Role;
}