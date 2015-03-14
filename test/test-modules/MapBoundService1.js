/**
 * Simple class that will be map bound in a unit test.
 *
 * @author Anton Johansson
 */

var MapBoundService1 = function()
{
};

/** Gets the value. */
MapBoundService1.prototype.value = function()
{
	return 1;
};

// Expose the class
module.exports = MapBoundService1;
