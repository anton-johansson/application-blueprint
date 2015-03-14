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
	console.log("Successfully authorized %s for Klarna order %s", order.totalValue, order.orderId);
};

// Expose the class
module.exports = KlarnaAuthorizeHandler;
