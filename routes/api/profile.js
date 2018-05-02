const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


// Load Validation
const validateProfileInput = require('../../validation/profile');

// Load Profile model
const Profile = require('../../models/Profile');

// Load User model
const User = require('../../models/User');

// @route GET api/profile
// @desc Get current users profile
// @access Private

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	const errors = {};
	Profile.findOne({user: req.user.id})
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if(!profile) {
				errors.noprofile = 'There is no profile for this user';
				return res.status(404).json(errors)
			}
			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});

// @route GET api/profile/handle/:handle
// @desc Get Profile By Handle
// @access Public

router.get('/handle/:handle', (req, res) => {
	const errors = {};
	Profile.findOne({handle: req.params.handle})
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if(!profile) {
				errors.noprofile = 'There is no profile for this user';
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});

// @route GET api/profile/user/:user_id
// @desc Get Profile By user
// @access Public

router.get('/user/:user_id', (req, res) => {
	const errors = {};
	Profile.findOne({user: req.params.user_id})
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if(!profile) {
				errors.noprofile = 'There is no profile for this user';
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch(err => {
			errors.noprofile = 'There is no profile for this user';
			res.status(404).json(errors)
		});
});

// @route GET api/profile
// @desc Get all profiles 
// @access Public

router.get('/all', (req, res) => {
	const errors = {};
	Profile.find()
	.populate('user', ['name', 'avatar'])
	.then(profiles => {
		if(!profiles) {
			errors.noprofile = 'There are no profiles';
			return res.status(404).json(errors)
		}

		res.json(profiles);
	})
	.catch(err => {
		errors.noprofile = 'There are no profiles';
		res.status(404).json({errors});
	})
});


// @route POST api/profile
// @desc Create User profile
// @access Private

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

	// Get fields
	const {errors, isValid} = validateProfileInput(req.body);

	// Check Validation
	if(!isValid) {
		// Return errors
		return res.status(400).json(errors);
	}
	const info = ['handle', 'company', 'website', 'location', 'bio', 'status', 'githubusername'];
	const socialLinks = ['youtube', 'twitter', 'facebook', 'instagram', 'linkedin'];
	const profileFields = {};
	profileFields.user = req.user.id;

	// Set main info to Profile
	for (let i = 0; i < 7; i++) {
		if (req.body[info[i]]) profileFields[info[i]] = req.body[info[i]];
	}

	// Set social to Profile
	profileFields.social = {};
	for (let i = 0; i < 5; i++) {
		if (req.body[socialLinks[i]]) profileFields.social[socialLinks[i]] = req.body[socialLinks[i]];
	}

	// Skills split into array
	if (typeof req.body.skills !== 'undefined') {
		profileFields.skills = req.body.skills.split(',');
	}

	Profile.findOne({user: req.user.id})
		.then(profile => {
			if(profile) {
				Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true})
					.then(profile => res.json(profile));
			} else {
				// Create

				// check if handle exists
				Profile.findOne({handle: profileFields.handle})
					.then(profile => {
						if(profile) {
							errors.handle = 'That handle already exists';
							res.status(400).json(errors);
						}
					})
				// Save Profile
				new Profile(profileFields).save().then(profile => res.json(profile));

			}
		})

	
});


module.exports = router;