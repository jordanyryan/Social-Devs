const Validator = require('validator');
const {checkMultipleEmpty, isEmpty} = require('./helpers');

module.exports = function validateExperienceInput(data) {
	let errors = {};

	checkMultipleEmpty(['school', 'degree', 'fieldofstudy', 'from'], data, errors);
	if(isEmpty(data.fieldofstudy)) {
			data.fieldofstudy = '';
			errors.fieldofstudy = `Field of study is required`;
		}
	
	return {
		errors,
		isValid: isEmpty(errors)
	}
}