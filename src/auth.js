/* eslint-disable arrow-body-style */
const express = require('express');

const router = express.Router();

const credentials = {
    password: 'm295',
};

function isAuth(req, res, next) {
    if (req.session.email) {
        return next();
    }
    return res.status(401).json({ error: 'Not logged in' });
}

router.post('/login', (req, res) => {
    // #swagger.summary = 'Log In the user'
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: 'Email and password are required' });
    }

    if (password === credentials.password) {
        req.session.email = email;

        return res.status(201).json({ email: req.session.email });
    }
    return res.status(401).send({ error: 'Wrong email or password' });
});

router.get('/verify', isAuth, (req, res) => {
    // #swagger.summary = 'verify if user is logged in'
    return res.status(200).json({ email: req.session.email });
});

router.delete('/logout', isAuth, (req, res) => {
    // #swagger.summary = 'Log out the user'
    req.session.email = null;

    return res.status(204).send();
});

module.exports.isAuth = isAuth;
module.exports.router = router;
