const User  = require('../models/userModel');
const jwt = require('jsonwebtoken');

//generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h'});

};

//register user
exports.register = async (req, res) => {
    const { name, email,password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message:" user already exists"});
    const user = await User.create({ name, email, password});
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
        const user = await User.findOne({email});
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