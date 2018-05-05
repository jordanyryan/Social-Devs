const Validator = require('validator');
const {checkMultipleEmpty, isEmpty} = require('./helpers');

module.exports = function validateExperienceInput(data) {
	let errors = {};

	checkMultipleEmpty(['school', 'degree', 'fieldofstudy', 'from'], data, errors);
	
	return {
		errors,
		isValid: isEmpty(errors)
	}
}