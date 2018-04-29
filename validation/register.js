const Validator = require('validator');
const {isEmpty, checkMultipleEmpty} = require('./helpers');

module.exports = function validateRegisterInput(data) {
	let errors = {};
	checkMultipleEmpty(['name', 'email', 'password', 'password2'], data, errors);

	if(!Validator.isLength(data.name, {min: 2, max: 30})) {
		errors.name = 'Name must be between 2 and 30 characters';
	}

	if(!Validator.isLength(data.password, {min: 6, max: 30})) {
		errors.password = 'Password must be at least 6 characters';	
	}



	if(Validator.isEmpty(data.password2)) {
		errors.password2 = 'Confirm Password field is required';	
	}

	if(!Validator.equals(data.password, data.password2)) {
		errors.password2 = 'Passwords must match';	
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}