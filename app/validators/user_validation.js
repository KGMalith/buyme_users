const {changePassword,signin,signup} = require('./user_validation_schema');

module.exports = {
    userSignupValidation: async (req, res, next) => {
        const respond = await signup.validate(req.body);
        if (respond.error) {
            res.status(500).json({
                success: false,
                msg: respond.error.details[0].message,
                showMessage: true
            });
        } else {
            next();
        }
    },
    userSigninValidation: async (req, res, next) => {
        const respond = await signin.validate(req.body);
        if (respond.error) {
            res.status(500).json({
                success: false,
                msg: respond.error.details[0].message,
                showMessage: true
            });
        } else {
            next();
        }
    },
    changePasswordValidation: async (req, res, next) => {
        const respond = await changePassword.validate(req.body);
        if (respond.error) {
            res.status(500).json({
                success: false,
                msg: respond.error.details[0].message,
                showMessage: true
            });
        } else {
            next();
        }
    }, 
};