/**
 * Core Blueprint file. Handles the creation of the IOC container.
 *
 * @author Anton Johansson
 */
var path = require("path");

module.exports =
{
	/** Creates the blueprint container. */
	create: function(base, configurationFile)
	{
		var configurationPath = path.join(base, configurationFile);
		var configuration = resolve(base, require(configurationPath));
		return new Blueprint(configuration);
	}
};

/** Resolves proper service configuration. */
function resolve(base, configuration)
{
	configuration.forEach(function(s, index)
	{
		if (typeof s === "string")
		{
			s = configuration[index] = { path: s };
		}

		// If the service is a package on the disk we need to load it
		if (s.hasOwnProperty("path"))
		{
			var servicePath = path.join(base, s.path);
			var initializer = require(servicePath);

			s.isLocal = true;
			s.initializer = initializer;
			s.dependencies = initializer.$dependencies || [];
			s.dependenciesLeft = s.dependencies.slice();
		}

		// Set helper properties
		s.isLocal = s.isLocal || false;
		s.isMultiBound = s.multibinder ? true : false;
		s.isMapBound = s.mapbinder ? true : false;
		s.name = s.name || s.external || deriveNameFromPath(s.path);

		// Set proper mapbinder data
		if (s.isMapBound)
		{
			var name = s.name;
			var mapbinder = s.mapbinder;

			s.name = mapbinder;
			s.mapbinder = name;
		}

		// Set proper multibinder data
		if (s.isMultiBound)
		{
			s.name = s.multibinder;
		}
	});

	return configuration;
}

/** Gets a service name by its path.  */
function deriveNameFromPath(path)
{
	var index = path.lastIndexOf('/');
	var serviceName = path.substring(index + 1);
	serviceName = serviceName.charAt(0).toLowerCase() + serviceName.slice(1);
	if (serviceName.indexOf('.js', serviceName.length - 3) !== -1)
	{
		serviceName = serviceName.substring(0, serviceName.length - 3);
	}
	return serviceName;
}

/** Constructs a new service instance. */
function construct(initializer, args)
{
	var instance = Object.create(initializer.prototype);
	initializer.apply(instance, args);
	return instance;
}

/** Builds the dependency tree and returns a sorted list of services. */
function getDependencyTree(services)
{
	var resolved = {};
	var changed = true;
	var sorted = [];

	while (services.length && changed)
	{
		changed = false;

		services.concat().forEach(function(s)
		{
			var index = services.indexOf(s);

			if (s.isLocal)
			{
				var dependencies = s.dependenciesLeft.concat();

				var resolvedAll = true;
				for (var i = 0; i < dependencies.length; i++)
				{
					var dependency = dependencies[i];
					if (!resolved[dependency])
					{
						resolvedAll = false;
					}
					else
					{
						s.dependenciesLeft.splice(s.dependenciesLeft.indexOf(dependency), 1);
					}
				}

				if (!resolvedAll)
				{
					return;
				}
			}

			// Add the dependency to the sorted list
			sorted.push(services[index]);

			// Remove the service from the list of remaining services
			services.splice(index, 1);

			// Mark the service as resolved
			resolved[s.name] = true;
			changed = true;
		});
	}

	// Check for missing dependencies, then return the sorted dependency tree
	checkForMissingDependencies(resolved, services);
	return sorted;
}

function checkForMissingDependencies(resolved, services)
{
	if (services.length)
	{
		var unresolved = {};
		services.forEach(function(service)
		{
			service.dependencies.forEach(function(dependency)
			{
				// If this dependency is resolved, do nothing
				if (resolved[dependency])
				{
					return;
				}

				// If we have no key for this service yet, create it
				if (!unresolved[service.name])
				{
					unresolved[service.name] = [];
				}

				// Push the dependency
				unresolved[service.name].push(dependency);
			});
		});

		// Log about missing dependencies and throw an error
		console.error("Could not resolve dependencies of all services");
		console.error("Resolved services:", Object.keys(resolved));
		Object.keys(unresolved).forEach(function(key)
		{
			console.error("'" + key + "' is missing these dependencies:", unresolved[key]);
		});
		throw new Error("Could not resolve dependencies");
	}
}

/** Registers all the services for given configuration. */
function registerServices(app, configuration)
{
	var dependencyTree = getDependencyTree(configuration);

	function next()
	{
		var service = dependencyTree.shift();
		if (service)
		{
			registerService(app, service, next);
		}
	}
	next();
}

/** Registers a service in the container. */
function registerService(app, service, next)
{
	var services = app.services;

	if (service.external)
	{
		// Require the instance
		var reference = require(service.name);
		app.services[service.name] = reference;
	}
	else
	{
		var dependencies = [];
		if (service.dependencies)
		{
			service.dependencies.forEach(function(dependency)
			{
				dependencies.push(services[dependency]);
			});
		}

		// Create the instance
	 	reference = construct(service.initializer, dependencies);

	 	// Bind the service
	 	if (service.isMapBound)
	 	{
	 		// If there is no map yet, create one
			if (!app.services[service.name])
			{
				app.services[service.name] = {};
			}

			// Bind the mapbinder with given service name
			app.services[service.name][service.mapbinder] = reference;
	 	}
	 	else if (service.isMultiBound)
	 	{
	 		// If there is no set yet, create one
	 		if (!app.services[service.multibinder])
	 		{
	 			app.services[service.multibinder] = [];
	 		}

	 		app.services[service.multibinder].push(reference);
	 	}
	 	else
	 	{
			app.services[service.name] = reference;
	 	}
	}

	// Create next service
	next();
}


/**
 * Blueprint constructor.
 *
 * @param configuration The configuration used to create the blueprint container.
 */
function Blueprint(configuration)
{
	var app = this;
	app.services = {};

	registerServices(app, configuration);
}

/**
 * Gets a service.
 *
 * @param serviceName The name of the service to get.
 */
Blueprint.prototype.get = function(serviceName)
{
	var app = this;
	return app.services[serviceName];
};
