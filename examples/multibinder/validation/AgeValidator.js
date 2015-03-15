/**
 * Validates the age of a person.
 *
 * @author Anton Johansson
 */
var AgeValidator = function()
{
};

/** Validates the person. */
AgeValidator.prototype.validate = function(person)
{
	var result = { isValid: true };

	if (!(person.age && person.age > 18))
	{
		result.isValid = false;
		result.message = 'You must be at least 18 years old to participate';
	}

	return result;
};

// Expose the class
module.exports = AgeValidator;
