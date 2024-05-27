const User = require('../models/user.models');
const zod = require('zod');
const {response_400, response_200} = require('../utils/responseCodes.utils')

function validate(name, email, password, res){
    const emailSchema = zod.string().email();
    const passwordSchema = zod.string().min(8);
    if(!name || !email || !password){
        response_400(res, "All Fields are required");
        return false;
    }
    else if(!(emailSchema.safeParse(email).success)){
        response_400(res, "Not a valid Email");
        return false;
    }
    else if(!(passwordSchema.safeParse(password).success)){
        response_400(res, "Password must be 8 characters long");
        return false;
    }
    return true;
}

exports.signup = async (req, res) => {
    
    try{
        const {name, email, password} = req.body;

        if(validate(name, email, password, res)){
            const emailExists = await User.findOne({ email: email }).exec();
            if (emailExists) {
                return response_400(res, "email is already in use");
            }
    
            let new_user = new User({
                name: name,
                email: email,
                password: password
            });        
            new_user.save();
            return response_200(res, "registered successfully!", new_user);
        }

    }
    catch(err){
        return response_400(res, err);
    }
}
exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(validate("something", email, password, res)){
            const userExists = await User.findOne({ email: email}).exec();
            if (userExists) {
                if(userExists.password == password){
                    return response_200(res, "logged in successfully!", userExists);
                }
                return response_400(res, "Wrong Password");
            }
            return response_400(res, "didn't find this email");
        }

    }
    catch(err){
        return response_400(res, err);
    }
}
exports.logout = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(validate("something", email, password, res)){
            const userExists = await User.findOne({ email: email}).exec();
            if (userExists) {
                if(userExists.password == password){
                    return response_200(res, "logged out successfully!", {});
                }
                return response_400(res, "Wrong Password");
            }
            return response_400(res, "didn't find this email");
        }

    }
    catch(err){
        return response_400(res, err);
    }
}