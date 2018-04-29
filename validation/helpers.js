const Validator = require('validator');
const isEmpty = value => 
		value === undefined ||
		value === null ||
		(typeof value === 'object' && Object.keys(value).length === 0) || 
		(typeof value === 'string' && value.trim().length === 0);


const checkMultipleEmpty = (fields, data, errors) => {
	fields.forEach(field => {
		if(isEmpty(data[field])) {
			data[field] = '';
			errors[field] = `${field[0].toUpperCase() + field.slice(1)} field is required`;
		}
	});
}

const checkValidUrl = (fields, data, errors) => {
	fields.forEach(field => {
		if(!isEmpty(data[field])) {
			if(!Validator.isURL(data[field])) {
				errors[field] = 'Not a valid URL';
			}
		}
	});
}


module.exports = {isEmpty, checkMultipleEmpty, checkValidUrl};