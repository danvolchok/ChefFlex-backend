var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', {
        pageTitle:'Sign Up',
        action: '/signUp',
        buttonText: 'Sign Up',
        switchText: 'Already have an account?',
        switchLink: '/login',
        switchButtonText: 'Login',
        isSignup: true
    });
});

module.exports = router;