const Validator = require('validator');
const {checkMultipleEmpty, isEmpty} = require('./helpers');

module.exports = function validateExperienceInput(data) {
	let errors = {};

	checkMultipleEmpty(['title', 'company', 'from'], data, errors);
	
	return {
		errors,
		isValid: isEmpty(errors)
	}
}