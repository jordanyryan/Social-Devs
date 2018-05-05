const Validator = require('validator');
const {checkMultipleEmpty, isEmpty} = require('./helpers');

module.exports = function validateExperienceInput(data) {
	let errors = {};

	checkMultipleEmpty(['title', 'company', 'from'], data, errors);
	console.log(data);
	
	return {
		errors,
		isValid: isEmpty(errors)
	}
}