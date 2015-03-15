/**
 * Validates persons.
 *
 * @author Anton Johansson
 */
var ValidationManager = function(validators)
{
	this.validators = validators;
};

/** Validates the person. */
ValidationManager.prototype.validate = function(person, success, failure)
{
	var validators = this.validators;

	for (var i = 0; i < validators.length; i++)
	{
		var result = validators[i].validate(person);

		if (!result.isValid)
		{
			failure(result.message);
			return;
		}
	}

	success();
};

// Expose the class
module.exports = ValidationManager;
module.exports.$dependencies = ['validators'];
