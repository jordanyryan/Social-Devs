import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
// Types
import {GET_ERRORS, SET_CURRENT_USER} from './types.js';


// Register User

export const registerUser = (userData, history) => dispatch => {
	axios.post('/api/users/register', userData)
		.then(res => history.push('/login'))
		.catch(err => 
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
}

// Login - Get User Token
export const loginUser = userData => dispatch => {
	axios.post('/api/users/login', userData)
		.then(res => {
			// Save to localStorage
			const {token} = res.data;
			// Set token to local Storage
			localStorage.setItem('jwtToken', token);

			// Set Token to auth Header
			setAuthToken(token);
			// Decode token to get user data

			const decoded = jwt_decode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch(err => 
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
}

// Set logged in user
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
}

// Log user out

export const logoutUser = () => dispatch => {
	// Remove jwt from localstorage
	localStorage.removeItem('jwtToken');
	// Remove auth header
	setAuthToken(false);
	// Set current user to empty object
	dispatch(setCurrentUser({}));
}




