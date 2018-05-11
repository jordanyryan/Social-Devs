const Validator = require('validator');
const {isEmpty, checkMultipleEmpty} = require('./helpers');

module.exports = function validateRegisterInput(data) {
	let errors = {};
	if (!Validator.isEmail(data.email)) {
	    errors.email = 'Email is invalid';
	  }
	checkMultipleEmpty(['name', 'email', 'password'], data, errors);

	if(!Validator.isLength(data.name, {min: 2, max: 30})) {
		if (!errors.name) errors.name = 'Name must be between 2 and 30 characters';
	}

	if(!Validator.isLength(data.password, {min: 6, max: 30})) {
		if (!errors.password) errors.password = 'Password must be at least 6 characters';	
	}


	if(Validator.isEmpty(data.password2)) {
		errors.password2 = 'Confirm Password field is required';	
	}

	if(!Validator.equals(data.password, data.password2)) {
		if (!errors.password2) errors.password2 = 'Passwords must match';	
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}