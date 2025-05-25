'use strict';
const { User, Role, Permission } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        // Fetch Admin and User Roles
        const adminRole = await Role.findOne({ where: { slug: 'admin'} });
        const userRole_ = await Role.findOne({ where: { slug: 'user'} });

        // Fetch all Permissions
        const allPermissions = await Permission.findAll();

        // Assign all Permissions to Admin Role
        await adminRole.setPermissions(allPermissions);

        // Assign spacific permissions to user role
        // const userPermissions = await Permission.findAll({
        //     where: { slug: "permission-slug"}
        // });
        // await userRole_.setPermissions(userPermissions);

        // Fetch admin and test users
        const adminUser = await User.findOne({ 
            where: {
                email: "admin@gmail.com"
            }
        });
        const testUser = await User.findOne({ 
            where: {
                email: "testuser@test.com"
            }
        });

        // Assign roles to users
        await adminUser.addRole(adminRole);
        await testUser.addRole(userRole_);

        console.log('✅ Roles and permissions assigned successfully.');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('role_permissions', null, {});
        await queryInterface.bulkDelete('user_roles', null, {});
    }
};
