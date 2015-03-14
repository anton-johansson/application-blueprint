/**
 * Application main entry-point.
 *
 * @author Anton Johansson
 */
var blueprint = require('../../application-blueprint');

// Create container
var container = blueprint.create(__dirname, 'configuration.js');
var service = container.get('service');

// Execute the service
service.run();
