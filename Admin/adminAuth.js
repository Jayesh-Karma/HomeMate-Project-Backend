const jwt = require('jsonwebtoken');
const admin = require("./adminModel")


const adminProtect = async (req, res, next) => {
  let token;
  // Check for token in headers
  if (
      (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    ) {
        try {
            // Get token from header -->
            token = req.headers.authorization.split(' ')[1];
            
            
            // Verify token --> 
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Get user from token --> 
            req.user = await admin.findById(decoded.id).select('-password');
            next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed', error:error.message });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to check for admin role
const adminCheck = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Require Admin Role' });
  }
};

module.exports = { adminProtect, adminCheck};
