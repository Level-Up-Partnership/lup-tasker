const JWT = require('jsonwebtoken')

function verify(token) {
    return new Promise((resolve, reject) => {
        JWT.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) return reject(error);
            resolve(decoded);
        })
    });
}

module.exports = {
    verify
}