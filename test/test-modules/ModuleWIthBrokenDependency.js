var ModuleWIthBrokenDependency = function(http)
{
	this.http = http;
}

module.exports = ModuleWIthBrokenDependency;
module.exports.$dependencies = ['http', 'some-non-existent-dependency'];
