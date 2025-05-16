const db = require('../../models');
const bcrypt = require('bcryptjs');

require('dotenv').config();
const User = db.User;

exports.create = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            name, email, password: hashedPassword,
        });

        await user.assignRole('user');
        return res.status(200).json({
            status: 'Success',
            msg: 'User Created Successfully.',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal Server Error.',
            errors: error
        });
    }
}

exports.update = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findOne({ where: { email }});
        if (!user) {
            return res.status(401).json({
                status: 'Error',
                msg: 'User not found.',
                errors: [{ msg: "User not found."}]
            });
        }

        user.name = name;
        user.email = email;
        user.update();

        return res.status(200).json({
            status: 'Success',
            msg: 'User Updated Successfully.',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal Server Error.',
            errors: error
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const { email } = req.body;
        const user = User.findOne({ where: { email }});
        user.destroy();

        return res.status(200).json({
            status: 'Success',
            msg: 'User Deleted Successfully.',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal Server Error.',
            errors: error
        });
    }
}