import express from 'express';
import User from './userModel.js';
import jwt from 'jsonwebtoken';
import authenticate from '../../authenticate/index.js';
const router = express.Router();

/**
 * Validate password strength.
 * Password must be at least 8 characters long and include at least one letter, one number, and one special character.
 * @param {string} password 
 * @returns {boolean}
 */
const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
};

/**
 * @route GET /api/users/
 * @desc Get all users (protected)
 */
router.get('/', authenticate, async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal Server Error', error: error.message });
    }
});

/**
 * @route POST /api/users/register
 * @desc Register a new user
 */
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if username and password are provided
        if (!username || !password) {
            return res.status(400).json({
                code: 400,
                msg: 'Username and password are required.',
            });
        }

        // Validate password strength
        if (!validatePassword(password)) {
            return res.status(400).json({
                code: 400,
                msg: 'Password must be at least 8 characters long and include at least one letter, one number, and one special character.',
            });
        }

        // Check if username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                code: 400,
                msg: 'Username is already taken.',
            });
        }

        // Create new user
        await User.create({ username, password });
        res.status(201).json({
            code: 201,
            msg: 'Successfully created new user.',
        });
    } catch (error) {
        res.status(500).json({ code: 500, msg: 'Internal Server Error', error: error.message });
    }
});

/**
 * @route POST /api/users/login
 * @desc Authenticate user and return JWT token
 */
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if username and password are provided
        if (!username || !password) {
            return res.status(400).json({
                code: 400,
                msg: 'Username and password are required.',
            });
        }

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ code: 401, msg: 'Authentication failed. User not found.' });
        }

        // Check if password matches
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ code: 401, msg: 'Authentication failed. Wrong password.' });
        }

        // Generate JWT token
        const token = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET, { expiresIn: '1d' });
        res.status(200).json({
            code: 200,
            msg: 'Authentication Successful',
            token: 'Bearer ' + token,
        });
    } catch (error) {
        res.status(500).json({ code: 500, msg: 'Internal Server Error', error: error.message });
    }
});

/**
 * @route GET /api/users/me
 * @desc Get current authenticated user
 */
router.get('/me', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (user) {
            res.status(200).json({ success: true, data: user });
        } else {
            res.status(404).json({ success: false, msg: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal Server Error', error: error.message });
    }
});

/**
 * @route PUT /api/users/:id
 * @desc Update user information (protected)
 */
router.put('/:id', authenticate, async (req, res) => {
    if (req.body._id) delete req.body._id;
    try {
        const result = await User.updateOne(
            { _id: req.params.id },
            req.body
        );
        if (result.matchedCount) {
            res.status(200).json({ code: 200, msg: 'User Updated Successfully' });
        } else {
            res.status(404).json({ code: 404, msg: 'Unable to Update User' });
        }
    } catch (error) {
        res.status(500).json({ code: 500, msg: 'Internal Server Error', error: error.message });
    }
});

export default router;