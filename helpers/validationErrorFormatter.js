function formatValidationError(error) {
	let formattedError = {};

	for (let key in error.errors) {
		formattedError[key] =
			error.errors[key].message || error.errors[key].properties.message;
	}

	return formattedError;
}

function formatDuplicateError(error) {
	let formattedError = {};

	for (let key in error.keyValue) {
		formattedError[
			key
		] = `The ${key} "${error.keyValue[key]}" is already taken.`;
	}

	return formattedError;
}

module.exports = { formatValidationError, formatDuplicateError };
