/**
 * Simple class that will be multibound in a unit test.
 *
 * @author Anton Johansson
 */

var MultiBoundService1 = function()
{
};

/** Gets the value. */
MultiBoundService1.prototype.value = function()
{
	return 1;
};

// Expose the class
module.exports = MultiBoundService1;
