'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models){
            User.belongsToMany(models.Role, {
                through: 'user_roles',
                foreignKey: 'user_id',
                otherKey: 'role_id',
            });

            User.belongsToMany(models.Permission, {
                through: 'user_permissions',
                foreignKey: 'user_id',
                otherKey: 'permission_id',
            });
        }
    }

    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        email_verified_at: {
            type: DataTypes.DATE,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
    });

    return User;
}