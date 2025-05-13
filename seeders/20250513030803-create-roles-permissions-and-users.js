'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();
        await queryInterface.bulkInsert('roles', [
            {name: "User", slug: "user", createdAt: now, updatedAt: now},
            {name: "Admin", slug: "admin", createdAt: now, updatedAt: now},
        ], { validate: true, });

        await queryInterface.bulkInsert('permissions', [
            // User
            {name: "Read User", slug: "read-user", createdAt: now, updatedAt: now},
            {name: "Create User", slug: "create-user", createdAt: now, updatedAt: now},
            {name: "Update User", slug: "update-user", createdAt: now, updatedAt: now},
            {name: "Delete User", slug: "delete-user", createdAt: now, updatedAt: now},

            // Role
            {name: "Read Role", slug: "read-role", createdAt: now, updatedAt: now},
            {name: "Create Role", slug: "create-role", createdAt: now, updatedAt: now},
            {name: "Update Role", slug: "update-role", createdAt: now, updatedAt: now},
            {name: "Delete Role", slug: "delete-role", createdAt: now, updatedAt: now},

            // Setting
            {name: "Update Setting", slug: "update-setting", createdAt: now, updatedAt: now},

            // Policy
            {name: "Update Policy", slug: "update-policy", createdAt: now, updatedAt: now},

            // About
            {name: "Update About", slug: "update-about", createdAt: now, updatedAt: now},

            // Inquiry
            {name: "Read Inquiry", slug: "read-inquiry", createdAt: now, updatedAt: now},
            {name: "Delete Inquiry", slug: "delete-inquiry", createdAt: now, updatedAt: now},
        ], { validate: true,});

        const hashedPassword = await bcrypt.hash("12345678", 12);

        await queryInterface.bulkInsert('users', [
            {name: "Admin User", email: "admin@gmail.com", password: hashedPassword, createdAt: now, updatedAt: now},
            {name: "testing User", email: "testuser@test.com", password: hashedPassword, createdAt: now, updatedAt: now},
        ],{});

        console.log("✅ Role, Permissions and Users Created Successfully.")
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('roles', null, {});
        await queryInterface.bulkDelete('permissions', null, {});
        await queryInterface.bulkDelete('users', null, {});
    }
};


// // test
// module.exports = {
//     async up(queryInterface, Sequelize) { },

//     async down(queryInterface, Sequelize) { }
// };
