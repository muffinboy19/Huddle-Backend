const User = require("../models/user.models.js");
const jwt = require("jsonwebtoken");
const {
    response_400,
    response_500,
} = require("../utils/responseCodes.utils.js");

async function isAuthorized(req, res, next) {
    const authToken = req.cookies.token || req.token;
    if (!authToken) {
        return response_400(res, "No token provided");
    }

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_KEY);

        const user = await User.findById(decoded._id);

        if (!user) {
            return response_400(res, "User not found");
        }

        // if(!user.verified){
        //     return response_400(res, "User is not verified");
        // }

        req.body.email = user.email;
        req.body.userId = user._id;
        req.body.user = user;
        next();
    } catch (err) {
        return response_500(res, "Failed to authenticate User", err);
    }
}

module.exports = isAuthorized;
