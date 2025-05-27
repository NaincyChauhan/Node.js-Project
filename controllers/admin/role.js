const { Op } = require('sequelize');
const { Role, Permission } = require('../../models');

// View Roles
exports.views = async (req, res) => {
    try {
        const roles = await Role.findAll(
            {
                where: {
                    slug: { [Op.notIn]: ['admin', 'user'] },
                }
            }
        );

        return res.status(200).json({
            status: 'success',
            msg: 'Roles fetched Successfully.',
            roles
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            msg: 'Internal Server Error.',
            errors: error
        });
    }
}

// Create Role
exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const slug = genrateSlug(name);
        const role = await Role.create({ name, slug });

        return res.status(201).json({
            status: "success",
            msg: "Role created successfully.",
            data: { role }
        });
    } catch (error) {
        // console.log("running here,", error)
        return res.status(500).json({
            status: 'error',
            msg: 'Internal Server Error1.',
            errors: error,
        });
    }
}

// Update Role
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;
        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(401).json({ status: 'Error', msg: 'Role not found.', errors: [] });
        }
        const slug = genrateSlug(name);
        role.name = name;
        role.slug = slug;
        await role.save();

        return res.status(201).json({
            status: "success",
            msg: "Role updated successfully.",
            data: { role }
        });
    } catch (error) {
        // if(error.name === 'SequelizeUniqueConstraintError') {
        //     return res.status(409).json({
        //         status: 'error',
        //         msg: 'Role with this name already exists.',
        //         errors: [],
        //     })
        // }
        return res.status(500).json({
            status: 'error',
            msg: 'Internal Server Error.',
            errors: error,
        });
    }
}

// Delete Role
exports.destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(401).json({ status: 'Error', msg: 'Role not found.', errors: [] });
        }
        await role.destroy();

        return res.status(201).json({
            status: "success",
            msg: "Role Deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            msg: 'Internal Server Error.',
            errors: error
        });
    }
}

// Genrate Slug
const genrateSlug = (text) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')  // remove non-alphanumeric characters except space and hyphen
        .replace(/\s+/g, '-')          // replace spaces with hyphen
        .replace(/-+/g, '-');          // collapse multiple hyphens
}

exports.assignRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { ids } = req.body;

        if (!Array.isArray(ids)) {
            return res.status(400).json({
                status: 'Error',
                msg: 'Invalid permissions format.',
            });
        }

        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(401).json({ status: "Error", msg: "Role not found", error: [] });
        }

        const permissions = await Permission.findAll({
            where: {
                id: {
                    [Op.in]: [ids]
                }
            }
        });

        await role.setPermissions(permissions);

        return res.status(201).json({
            status: 'Success',
            msg: "Permissions asigend to user successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            msg: 'Internal Server Error.',
            errors: error
        });
    }
}