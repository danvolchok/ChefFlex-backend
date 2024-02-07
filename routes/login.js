var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', {
        pageTitle:'Login/Sign Up',
        action: '/login',
        buttonText: 'Login/Sign Up',
        switchText: 'Not a user?',
        switchLink: '/signUp',
        switchButtonText: 'Sign-up'
    });
});

module.exports = router;