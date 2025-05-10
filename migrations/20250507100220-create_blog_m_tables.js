'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('categories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING(120),
                allowNull: false,
            },
            parent_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                defaultValue: 0,
            },
            description: {
                type: Sequelize.STRING(400),
                allowNull: true,
            },
            status: {
                type: Sequelize.STRING(60),
                defaultValue: 'published',
            },
            author_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            icon: {
                type: Sequelize.STRING(60),
            },
            order: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            is_featured: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            is_default: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });

        await queryInterface.createTable('tags', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING(120),
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING(400),
            },
            status: {
                type: Sequelize.STRING(60),
                defaultValue: 'published',
            },
            author_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });

        await queryInterface.createTable('posts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING(400),
                allowNull: true,
            },
            content: {
                type: Sequelize.TEXT,
            },
            status: {
                type: Sequelize.STRING(60),
                defaultValue: 'published'
            },
            author_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            is_featured: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            image: {
                type: Sequelize.STRING,
            },
            views: {
                type: Sequelize.BIGINT,
                defaultValue: 0,
            },
            format_type: {
                type: Sequelize.STRING(30),
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });

        await queryInterface.createTable('post_tags', {
            tag_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'tags',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            post_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'posts',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            }
        });

        await queryInterface.createTable('post_categories', {
            category_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'categories',
                    key: 'id',
                },
                onDelete: 'CASCADE'
            },
            post_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'posts',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('post_tags');
        await queryInterface.dropTable('post_categories');
        await queryInterface.dropTable('categories');
        await queryInterface.dropTable('tags');
        await queryInterface.dropTable('posts');
    }
};