const Validator = require('validator');
const {checkMultipleEmpty, isEmpty} = require('./helpers');

module.exports = function validateLoginInput(data) {
	let errors = {};

	checkMultipleEmpty(['email', 'password'], data, errors);

	if(!Validator.isEmail(data.email)) {
		errors.email = errors.email ? errors.email : 'Email is invalid' ;	
	}
	
	return {
		errors,
		isValid: isEmpty(errors)
	}
}