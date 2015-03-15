/**
 * Validates the name of a person.
 *
 * @author Anton Johansson
 */
var NameValidator = function()
{
};

/** Validates the person. */
NameValidator.prototype.validate = function(person)
{
	var result = { isValid: true };

	if (!(person.name && person.name.length > 3))
	{
		result.isValid = false;
		result.message = 'Name must be at least three characters long';
	}

	return result;
};

// Expose the class
module.exports = NameValidator;
