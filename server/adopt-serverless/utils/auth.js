const jwt = require('jsonwebtoken');

// 🔐 Define token secret and expiration
const secret = process.env.JWT_SECRET || 'fallback-secret'; // Use ENV when available
const expiration = '2h';

module.exports = {
  // ✅ Middleware for authenticated routes
  authMiddleware: function ({ req }) {
    let token =
      req.query.token ||
      req.body.token ||
      req.headers.authorization;

    // 🧼 Extract token from "Bearer <token>" string
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req; // No token provided
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (err) {
      console.log('🚫 Invalid token:', err.message);
    }

    return req;
  },

  // ✅ Token signer for new users
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
