import axios from 'axios';

import {ADD_POST, GET_POSTS, POST_LOADING, DELETE_POST, GET_ERRORS, GET_POST} from './types';

// Add Post
export const addPost = postData => dispatch => {
	axios.post('/api/posts', postData)
		.then(res => 
			dispatch({
				type: ADD_POST,
				payload: res.data
			})
		)
		.catch(err => 
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})	
		);
}

// Get Posts
export const getPosts = () => dispatch => {
	dispatch(setPostLoading());
	axios.get('/api/posts')
		.then(res => 
			dispatch({
				type: GET_POSTS,
				payload: res.data
			})
		)
		.catch(err => 
			dispatch({
				type: GET_POSTS,
				payload: null
			})	
		);
}

// Get Post
export const getPost = (id) => dispatch => {
	dispatch(setPostLoading());
	axios.get(`/api/posts/${id}`)
		.then(res => 
			dispatch({
				type: GET_POST,
				payload: res.data
			})
		)
		.catch(err => 
			dispatch({
				type: GET_POSTS,
				payload: null
			})	
		);
}

// Delete Post

export const deletePost = postId => dispatch => {
	axios.delete(`/api/posts/${postId}`)
		.then(res => 
			dispatch({
				type: DELETE_POST,
				payload: postId
			})
		)
		.catch(err => 
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})	
		);
}

// Add Like

export const likePost = postId => dispatch => {
	axios.post(`/api/posts/${postId}/like`)
		.then(res => dispatch(getPosts()))
		.catch(err => 
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})	
		);
}

// Set Loading

export const setPostLoading = () => {
	return {
		type: POST_LOADING
	}
}



