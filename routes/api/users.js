const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../../models/User');

// @route GET api/users/test
// @desc Tests users route
// @access Public

router.get('/test', (req, res) => res.json({msg: "Users Works"}));

// @route GET api/users/register
// @desc Register a user
// @access Public

router.post('/register', (req, res) => {
	User.findOne({email: req.body.email})
		.then(user => {
			if(user){
				return res.status(400).json({email: 'Email already exists'});
			} else {
				const {name, email, password} = req.body
				const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});
				const newUser = new User({
					name,
					email,
					password,
					avatar
				});

				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if(err) throw err;
						newUser.password = hash;
						newUser.save()
							.then(user => res.json(user))
							.catch(err => console.log(err));
					})
				})
			}
		})
});

module.exports = router;