/**
 * Class for handling stuff.
 *
 * @author Anton Johansson
 */
var Handler = function(path)
{
	this.path = path;
};

/** Handles stuff. */
Handler.prototype.handle = function()
{
	console.log('Handled!');
	console.log('Path: %s', this.path.join('./components', 'test.js'));
};

// Expose the class
module.exports = Handler;
module.exports.$dependencies = ['path'];
