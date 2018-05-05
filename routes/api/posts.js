const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const User = require('../../models/User');
const Post = require('../../models/Post');

const validatePostInput = require('../../validation/post');

// @route POST api/posts
// @desc Create Posts
// @access Private

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	// Validate post text
	const {errors, isValid} = validatePostInput(req.body);

	// Check Validation
	if(!isValid) {
		// Return errors
		return res.status(400).json(errors);
	}

	const {text, name, avatar} = req.body;
	const user = req.user.id;


	const newPost = new Post({text, name, avatar, user});

	newPost.save()
		.then(post => res.json(post));

});

module.exports = router;