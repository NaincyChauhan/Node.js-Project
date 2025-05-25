const { Permission } = require('../../models');

// View Permissions
exports.views = async (req, res) => {
    try {
        const permissions = await Permission.findAll();

        return res.status(200).json({
            status: 'success',
            msg: 'Permissions fetched Successfully.',
            permissions
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            msg: 'Internal Server Error.',
            errors: error
        });
    }
}

// Create Permission
exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const slug = genrateSlug(name);
        const permission = await Permission.create({ name, slug });

        return res.status(201).json({
            status: "success",
            msg: "Permission created successfully.",
            data: { permission }
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

// Update Permission
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;
        const permission = await Permission.findByPk(id);

        if (!permission) {
            return res.status(401).json({ status: 'Error', msg: 'Permission not found.', errors: [] });
        }
        const slug = genrateSlug(name);
        permission.name = name;
        permission.slug = slug;
        await permission.save();

        return res.status(201).json({
            status: "success",
            msg: "Permission updated successfully.",
            data: { permission }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            msg: 'Internal Server Error.',
            errors: error,
        });
    }
}

// Delete Permission
exports.destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const permission = await Permission.findByPk(id);

        if (!permission) {
            return res.status(401).json({ status: 'Error', msg: 'Permission not found.', errors: [] });
        }
        await permission.destroy();

        return res.status(201).json({
            status: "success",
            msg: "Permission Deleted successfully.",
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