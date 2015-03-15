/**
 * Application main entry-point.
 *
 * @author Anton Johansson
 */
var blueprint = require('../../application-blueprint');

// Create container
var container = blueprint.create(__dirname, 'configuration.js');

// Create the person
var person =
{
	name: 'Anton Johansson',
	age: 24
};

// Validate the person
var validationManager = container.get('validationManager');
validationManager.validate(person, function()
{
	console.log('Person was OK');
}, function(message)
{
	console.log('Person was not OK:');
	console.log(message);
});
