import jwt from 'jsonwebtoken';
import User from '../../api/users/userModel.js'; // Adjust the path as necessary


const authenticate = async (req, res, next) => {
    try { 
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ success: false, msg: 'No authorization header' });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, msg: 'Bearer token not found' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET); 
        console.log('Decoded Token:', decoded);

        // Find the user by username
        const user = await User.findOne({ username: decoded.username });
        if (!user) {
            return res.status(401).json({ success: false, msg: 'User not found' });
        }

        // Attach user to the request object
        req.user = user; 
        next();
    } catch(err) {
        console.error('Authentication Failed:', err.message);
        res.status(401).json({ success: false, msg: `Verification Failed: ${err.message}` });
    }
};

export default authenticate;