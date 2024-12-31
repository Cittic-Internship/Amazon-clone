// src/controllers/VendorController.js
const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h'});

};

//register user
exports.register = async (req, res) => {
    const { name, email,password } = req.body;
    try {
        const userExists = await Vendor.findOne({ email });
        if (userExists) return res.status(400).json({ message:" user already exists"});
    const user = await Vendor.create({ name, email, password});
    res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
    });
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

//login user
exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await Vendor.findOne({email});
        if (user && (await user.comparePassword(password))) {
            res.status(200).json({
                id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({message: "invalid email or password "});
        }
    } catch (error) {
        res.status(500).json({ message : error.message});
    }
};

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await Vendor.findById(req.user.id).select('-password'); // Exclude password from the response
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await Vendor.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Update fields
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await user.save();

        res.status(200).json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
