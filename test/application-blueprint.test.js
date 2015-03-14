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
});
