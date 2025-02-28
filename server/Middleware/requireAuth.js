const jwt = require('jsonwebtoken');
const User = require('../Model/UserModel');

const requireAuth = async (req, res, next) => {
    try {
        // ✅ Allow public access to uploaded images
        if (req.path.startsWith('/uploads')) {
            return next();
        }

        const { authorization } = req.headers;

        // ✅ Check if authorization header exists
        if (!authorization) {
            console.error('Authorization token missing');
            return res.status(401).json({ error: 'Authorization token missing' });
        }

        // ✅ Validate "Bearer token" format
        const parts = authorization.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            console.error('Invalid token format:', authorization);
            return res.status(401).json({ error: 'Invalid token format' });
        }

        const token = parts[1];
        //console.log('Received Token:', token);

        // ✅ Prevent "jwt malformed" error by checking null/empty token
        if (!token || token === 'null') {
            console.error('Token is null or invalid');
            return res.status(401).json({ error: 'Token is missing or malformed' });
        }

        // ✅ Verify JWT token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET);
        } catch (error) {
            console.error('JWT Verification Error:', error.message);

            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expired, please login again' });
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: 'Invalid token' });
            } else {
                return res.status(401).json({ error: 'Authentication failed' });
            }
        }

        // ✅ Find user in the database
        const user = await User.findOne({ _id: decoded._id }).select('_id');

        if (!user) {
            console.error('User not found in database:', decoded._id);
            return res.status(401).json({ error: 'User not found, please login again' });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error('Unexpected JWT Authentication Error:', error.message);
        res.status(500).json({ error: 'Internal server error during authentication' });
    }
};

module.exports = requireAuth;
