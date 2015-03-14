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
});
