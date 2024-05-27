const User = require('../models/user.models');
const {response_400, response_200} = require('../utils/responseCodes.utils')

exports.uploadSkill = async (req, res) => {
    
    try{
        const {email, language, domain} = req.body;

        if(!email){
            return response_400(res, "I require user email");
        }

        if(!language || !domain){
            return response_400(res, "Both languages and domains are required");
        }

        const userExists = await User.findOne({ email: email }).exec();
        if (!userExists) {
            return response_400(res, "This email doesn't exist");
        }

        const skillobj = {
            language: language,
            domain: domain
        };
          
        const skilledUser = await User.findByIdAndUpdate(userExists._id, skillobj, { new: true });
        return response_200(res, "skills updated", skilledUser);

    }
    catch(err){
        return response_400(res, err);
    }
}


exports.updateProfile = async (req, res) => {
    
    try{
        const {name, email, password, profilePicture, language, domain} = req.body;

        if(!email){
            return response_400(res, "I require user email");
        }

        const userExists = await User.findOne({ email: email }).exec();
        if (!userExists) {
            return response_400(res, "This email doesn't exist");
        }

        let updateobj = {};

        if(name) updateobj.name = name;
        if(profilePicture) updateobj.profilePicture = profilePicture;
        if(language) updateobj.language = language;
        if(domain) updateobj.domain = domain;
        if(password) updateobj.password = password;
          
        const updatedUser = await User.findByIdAndUpdate(userExists._id, updateobj, { new: true });
        return response_200(res, "data updated", updatedUser);

    }
    catch(err){
        return response_400(res, err);
    }
}

exports.getProfile = async (req, res) => {
    
    try{
        const {email} = req.body;

        if(!email){
            return response_400(res, "I require user email");
        }

        const userExists = await User.findOne({ email: email }).exec();
        if (!userExists) {
            return response_400(res, "This email doesn't exist");
        }
          
        return response_200(res, "get Profile", userExists);

    }
    catch(err){
        return response_400(res, err);
    }
}