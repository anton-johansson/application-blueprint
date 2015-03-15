/**
 * Simple class that will be multibound in a unit test.
 *
 * @author Anton Johansson
 */

var MultiBoundService2 = function()
{
};

/** Gets the value. */
MultiBoundService2.prototype.value = function()
{
	return 2;
};

// Expose the class
module.exports = MultiBoundService2;
