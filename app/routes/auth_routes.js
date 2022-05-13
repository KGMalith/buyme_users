const router = require('express').Router();
const { userSignupValidation, userSigninValidation,changePasswordValidation} = require('../validators/user_validation');
const {checkToken} = require('../middleware/auth/tokenvalidation')
const userController = require('../controllers/auth_controller');

router.post('/signup',
    userSignupValidation,
    userController.userSignUp
);

router.post('/signin',
    userSigninValidation,
    userController.userSignIn
);

router.post('/change-password',
    checkToken,
    changePasswordValidation,
    userController.changePassword
);

module.exports = router;
