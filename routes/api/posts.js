const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
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

// @route GET api/posts
// @desc Get all Posts
// @access Public

router.get('/', (req, res) => {
	Post.find()
		.sort({data: -1})
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({nopostsfound: 'No posts found'}));
});


// @route GET api/posts/:post_id
// @desc Get a single Post
// @access Public

router.get('/:post_id', (req, res) => {
	Post.findById(req.params.post_id)
		.then(post => res.json(post))
		.catch(err => res.status(404).json({nopostfound: 'No post found with that ID'}));
})

// @route DELETE api/posts/:post_id
// @desc Delete a Post
// @access Private

router.delete('/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {

	Post.findById(req.params.post_id)
		.then(post => {
			// Check for post owner
			if(post.user.toString() !== req.user.id) {
				return res.status(401).json({notauthorized: 'User not authorized'});
			}

			post.remove()
				.then(() => res.json({success: true}))
				.catch(err => res.status(404).json({postnotfound: 'No post found'}));
		})
		.catch(err => res.status(404).json({postnotfound: 'No post found'}));
})

// @route POST api/posts/like/:post_id
// @desc Like/Unlike a Post
// @access Private

router.post('/:post_id/like', passport.authenticate('jwt', {session: false}), (req, res) => {
	Post.findById(req.params.post_id)
		.then(post => {
			const indexOfUser = post.likes.findIndex(like => like.user.toString() === req.user.id);
			indexOfUser === -1 ? post.likes.unshift({user: req.user.id}) : post.likes.splice(indexOfUser, 1);
			post.save()
				.then(post => res.json(post));
		})
		.catch(err => res.status(404).json({postnotfound: 'No post found'}));
})

router.post('/:post_id/comment', passport.authenticate('jwt', {session: false}), (req, res) => {
	const {errors, isValid} = validatePostInput(req.body);
	// Check valid

	if(!isValid) {
		return res.status(400).json(errors);
	}

	Post.findById(req.params.post_id)
		.then(post => {
			const {text, name, avatar} = req.body;
			const user = req.user.id;
			post.comments.unshift({text,name,avatar,user});
			post.save()
				.then(post => res.json(post));
		})
		.catch(err => res.status(404).json({postnotfound: 'No post found'}));
})



// @route POST api/posts/unlike/:post_id
// @desc Unlike a Post
// @access Private



module.exports = router;









