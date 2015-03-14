/**
 * Service for handling things.
 * 
 * @author Anton Johansson
 */
var Service = function(handler)
{
	this.handler = handler;
};

/** Runs the service. */
Service.prototype.run = function()
{
	this.handler.handle();
};

// Expose the class
module.exports = Service;
module.exports.$dependencies = ['handler'];
