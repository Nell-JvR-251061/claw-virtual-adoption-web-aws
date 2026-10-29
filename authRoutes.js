const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authToken = require('../middleware/middleware');

//Gets all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({})
            .select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Register (post)
router.post('/register', async (req, res) => {
    try {
        const { name, surname, email, password } = req.body;

        if (!name || !surname || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ message: 'Email is already in use.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            surname,
            email,
            password: hashedPassword,
        });

        const saved = await newUser.save();

        const token = jwt.sign(
            {
                id: saved._id,
                role: saved.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h',
                issuer: "claw-virtual-adoption",
                audience: "claw-virtual-adoption-api",
                algorithm: "HS256",
                subject: String(saved._id)
            }
        );

        res.status(201).json({
            id: saved._id,
            role: saved.role,
            name: saved.name,
            surname: saved.surname,
            email: saved.email,
            token
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login (get)
router.post('/login', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if ([name, email, password].some((val) => !val)) {
            return res.status(400).json({ message: 'Not all information received.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid name, email or password.' });
        }

        if (name != user.name) {
            return res.status(401).json({ message: 'Invalid name, email or password.' });
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return res.status(401).json({ message: 'Invalid name, email or password.' });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h',
                issuer: "claw-virtual-adoption",
                audience: "claw-virtual-adoption-api",
                algorithm: "HS256",
                subject: String(user._id)
            }
        );

        res.status(200).json({
            id: user._id,
            role: user.role,
            name: user.name,
            surname: user.surname,
            email: user.email,
            animals: user.adoptedAnimals,
            token
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Update a selected user's details (Put)
router.put("/update/:id", authToken, async (req, res) => {
    try {
        const userToBeUpdated = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            },
        );

        if (!userToBeUpdated) {
            return res.status(404).json({ message: "User not found..." });
        }

        res.status(200).json(userToBeUpdated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Delete a selected user
router.delete("/delete/:id", authToken, async (req, res) => {
    try {
        const userToBeDeleted = await User.findByIdAndDelete(req.params.id);

        if (!userToBeDeleted) {
            return res.status(404).json({ message: "User not found..." });
        }

        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;