/**
 * Simple class that will handle map bound dependencies in a unit test.
 *
 * @author Anton Johansson
 */

var MapBoundHandlerService = function(handlers)
{
	this.handlers = handlers;
};

/** Handles it! */
MapBoundHandlerService.prototype.handle = function(key)
{
	return this.handlers[key].value();
};

// Expose the class
module.exports = MapBoundHandlerService;
module.exports.$dependencies = ['handlers'];
