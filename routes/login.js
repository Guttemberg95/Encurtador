const express = require('express');
const router = express.Router();
const passport = require('passport');
 
/* LOGIN PAGE */
router.get('/home', (req, res, next) => {
    if (req.query.fail)
        res.render('login', { message: 'Usuário e/ou senha incorretos!' });
    else
        res.render('login', { message: null });
});
 
/* AUTH LOGIN */
router.post('/home',
    passport.authenticate('local', { 
        successRedirect: '/', 
        failureRedirect: '/login/home?fail=true' 
    })
);

module.exports = router;
