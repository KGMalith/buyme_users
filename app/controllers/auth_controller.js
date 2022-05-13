const authService = require('../services/auth_service');

module.exports.userSignUp = async (req, res) => {
    try {
        const serviceResponse = await authService.userSignup(req.body);
        return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: false });
    } catch (err) {
        return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page' });
    }
};

module.exports.userSignIn = async (req, res) => {
    try {
        const serviceResponse = await authService.userSignin(req.body);
        return res.status(200).json({ success: true, msg: serviceResponse.msg, data: serviceResponse.data, showMessage: false });
    } catch (err) {
        return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page' });
    }
};

module.exports.changePassword = async (req, res) => {
    try {
        const serviceResponse = await authService.changePassword(req.body,req.user);
        return res.status(200).json({ success: true, msg: serviceResponse.msg, showMessage: true });
    } catch (err) {
        return res.status(err.status || 500).json({ success: false, msg: err.msg || 'Something went wrong. Try refreshing the page' });
    }
};

