var expect = require('expect');
var blueprint = require('../application-blueprint');

describe('application-blueprint.js', function()
{
	it('should put external modules in dependency graph', function(done)
	{
		var container = blueprint.create(__dirname, 'configuration-with-external.js');
		var moduleWithExternalDependency = container.get("moduleWithExternalDependency");

		var expected = require('http');
		var actual = moduleWithExternalDependency.http;

		expect(actual).toEqual(expected);

		done();
	});

	it('should put map bound modules in dependency graph correctly', function(done)
	{
		var container = blueprint.create(__dirname, 'configuration-with-mapbinder.js');
		var mapBoundHandlerService = container.get("mapBoundHandlerService");

		var value1 = mapBoundHandlerService.handle('service1');
		var value2 = mapBoundHandlerService.handle('service2');

		expect(value1).toEqual(1);
		expect(value2).toEqual(2);

		done();
	});

	it('should put multi bound modules in dependency graph correctly', function(done)
	{
		var container = blueprint.create(__dirname, 'configuration-with-multibinder.js');
		var handlers = container.get('handlers');

		expect(handlers).toBeAn(Array);
		expect(handlers.length).toEqual(2);
		expect(handlers[0].value()).toEqual(1);
		expect(handlers[1].value()).toEqual(2);

		done();
	});

	it('should throw an error when dependency graph cannot be built', function(done)
	{
		var call = function()
		{
			blueprint.create(__dirname, 'configuration-incomplete.js')
		};

		// Mute the error log
		var oldErrorLog = console.error;
		console.error = function() {};

		// Run the code
		expect(call).toThrow();

		// Re-enable the error logging
		console.error = oldErrorLog;

		done();
	});
});
