const Validator = require('validator');
const {isEmpty, checkMultipleEmpty, checkValidUrl} = require('./helpers');

module.exports = function validateProfileInput(data) {
	let errors = {};

	checkMultipleEmpty(['handle', 'status', 'skills'], data, errors);

	if(!Validator.isLength(data.handle, {min: 2, max: 40})) {
		errors.handle = errors.handle ? errors.handle : 'Handle needs to be between 2 and 40 characters';
	}

	checkValidUrl(['website', 'youtube', 'twitter', 'facebook', 'linkedin', 'instagram'], data, errors);
	

	return {
		errors,
		isValid: isEmpty(errors)
	}
}