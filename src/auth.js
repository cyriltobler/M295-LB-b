const express = require('express');
const router = express.Router();

const credentials = {
    password: 'm295',
};

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(422).json({error: 'Email and password are required'});
    };

    if(password === credentials.password){
		req.session.email = email;

		return res.status(201).json({ email: req.session.email });
    }else{
        return res.status(401).send({error: 'Wrong email or password'});
    };
});

router.get('/verify', (req, res) => {
    if(req.session.email){
		return res.status(200).json({ email: req.session.email });
	}
    return res.status(401).json({ error: 'Not logged in' });
});

router.delete('/logout',(req, res) => {
    if(req.session.email){
        req.session.email = null
        
		return res.status(204).send();
	}

    return res.status(401).json({ error: 'Not logged in' })
})

module.exports = router;
