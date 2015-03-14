/**
 * Handles authorization of payments through Klarna.
 *
 * @author Anton Johansson
 */
var KlarnaAuthorizeHandler = function()
{
};

/** Authorizes the payment. */
KlarnaAuthorizeHandler.prototype.authorize = function(order)
{
	console.log("Successfully authorized %s %s for Klarna order %s", order.totalValue, order.currency, order.orderId);
};

// Expose the class
module.exports = KlarnaAuthorizeHandler;
