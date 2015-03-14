var ModuleWithExternalDependency = function(http)
{
	this.http = http;
}

module.exports = ModuleWithExternalDependency;
module.exports.$dependencies = ['http'];
