let mongoose = require('mongoose');
let User = require('../models/User');

let jwt = require('jsonwebtoken');
const { hashSync, genSaltSync, compareSync } = require('bcrypt');

const BadRequestException = require('../middleware/exceptions/badRequestException');
const UnauthorizedException = require('../middleware/exceptions/unautherizedException');

module.exports.userSignup = async (requestBody) => {

    let userEmail = requestBody.user_email;
    let password = requestBody.password;

    //initiate session
    const session = await mongoose.startSession();
    //Start trasaction
    session.startTransaction();

    try {
        
        //check whether the email is already taken
        let isDuplicatedEmail = await User.findOne({
            email: userEmail
        }).session(session);

        if (isDuplicatedEmail) {
            throw new BadRequestException('Email is already taken');
        }

        //Encrypt password
        let salt = genSaltSync(10);
        let encrypted_password = hashSync(password, salt);

        //create user Object and assign values
        user = {
            email: userEmail,
            password: encrypted_password,
            first_name: requestBody.first_name,
            last_name: requestBody.last_name,
        };

        //save created user object to database
        let newUser = new User(user);
        newUser.$session(session);
        await newUser.save();

        //commit the transaction 
        await session.commitTransaction();
        return {
            msg: 'Signup completed.'
        };

    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
};

module.exports.userSignin = async (requestBody) => {

    let userEmail = requestBody.user_email;
    let userPassword = requestBody.password;

    // eslint-disable-next-line no-useless-catch
    try {
        //check email is exists
        let userObject = await User.findOne({
            email: userEmail
        });

        //check user object is exists
        if (!userObject) {
            throw new BadRequestException('Invalid email or password provided');
        }

        //check password is matching
        let passwordMatchResult = compareSync(userPassword, userObject.password);

        if (!passwordMatchResult) {
            throw new BadRequestException('Invalid email or password provided');
        }

        const tokenBody = {
            user_email: userObject.email,
            user_role: userObject.role,
            user_id: userObject._id
        };

        const jsonToken = jwt.sign({ result: tokenBody }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        const data = {
            user_name: userObject.first_name + ' ' + userObject.last_name,
            user_role: userObject.role,
            token: jsonToken
        };

        return {
            msg: 'User signin successfully!',
            data: data
        };

    } catch (err) {
        throw err;
    }
};

module.exports.changePassword = async (requestBody,requestUser) => {

    let currentPassword = requestBody.current_password;
    let newPassword = requestBody.new_password;

    //initiate session
    const session = await mongoose.startSession();
    //Start trasaction
    session.startTransaction();

    try {

        //check whether the email is valid
        let userObj = await User.findById(requestUser.userID).session(session);

        if (!userObj) {
            throw new UnauthorizedException();
        }

        //check old password match
        let passwordMatchResult = compareSync(currentPassword, userObj.password);

        if (!passwordMatchResult) {
            throw new BadRequestException('Current Password Invalid');
        }

        //Encrypt password
        let salt = genSaltSync(10);
        let encrypted_password = hashSync(newPassword, salt);

        //update new passwrod
        await User.updateOne({ _id: userObj._id }, { password: encrypted_password }).session(session);
        

        //commit the transaction 
        await session.commitTransaction();
        return {
            msg: 'Change Password completed.'
        };

    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
};