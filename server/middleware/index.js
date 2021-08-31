const { verify } = require('../auth/helper')


async function authHeader(req, res, next) {
    const authrization = req.get('authorization');
    if (authrization) {
        const token = authrization.split(' ')[1];
        try {
            const user = await verify(token);
            req.decoded = user;
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    }
    next();
}
async function unAuthUser(req, res, next) {
    const authrization = req.get('authorization');
    if (authrization) {
        const token = authrization.split(' ')[1];
        try {
            const user = await verify(token);
            req.decoded = user;
            return next();
        } catch (error) {
            console.log(error);
        }
    }
    res.status(401);
    next(new Error('Unauthroized'));
}

module.exports = {
    authHeader,
    unAuthUser
}