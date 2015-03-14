/**
 * Application main entry-point.
 * 
 * @author Anton Johansson
 */
var blueprint = require('../../application-blueprint');

// Create container
var container = blueprint.create(__dirname, 'configuration.js');

// Create orders
var order1 =
{
	orderId: 15,
	totalValue: 99.90,
	paymentServiceProvider: 'paypal'
};
var order2 =
{
	orderId: 23,
	totalValue: 123.45,
	paymentServiceProvider: 'klarna'
};

// Auhtorize the payments
var authorizeManager = container.get('authorizeManager');
authorizeManager.authorize(order1);
authorizeManager.authorize(order2);
