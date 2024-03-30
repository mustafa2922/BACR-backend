const Admin = require("../models/Admin");
const { ErrorHandler } = require("./ResponseHandlers");
const JWT = require("jsonwebtoken");
require("dotenv").config();

const checkDuplicateEmail = async (req,res,next)=>{
    try {
        let {email} = req.body;

        let admin = await Admin.findOne({email});

        if(admin){
            return res.status(409).json({msg:"Email is already in use."})
        };

        next();
    } catch (error) {
        return ErrorHandler(error,req,res);
    }
};

const verifyToken = async (req,res, next)=>{
    try {
        let token = req.headers["authorization"];
        if(!token){
            return res.status(400).json({msg:"Bad request"})
        }

        let {_id} = JWT.verify(token, process.env.JWT_SECRET);

        if(!_id){
            return res.status(401).json({msg:"Authentiction faild."})
        }

        let admin = await Admin.findById(_id).select(['-password']);

        req.admin = admin;
        next();

    } catch (error) {
        return ErrorHandler(error,req,res)
    }
}

module.exports = {
    checkDuplicateEmail,
    verifyToken
}