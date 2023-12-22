const express = require('express');
const router = express.Router();


const credentials = {
    password: 'm295'
};

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(422).json({error: "Email and password are required"});
    };

    if(password === credentials.password){
		req.session.email = email;

		return res.status(201).json({ email: req.session.email });
    }else{
        return res.status(401).send({error: "Wrong email or password"});
    };
});



module.exports = router;