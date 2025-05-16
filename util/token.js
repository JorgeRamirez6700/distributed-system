const jwt = require('jsonwebtoken');

function createToken(user) {
    return jwt.sign(
        {user},
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
}

function ensureTokenIsValid(token) {
    if (!token) {
        throw new Error('No se encuentra el token');
    }
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    createToken,
    ensureTokenIsValid
};
