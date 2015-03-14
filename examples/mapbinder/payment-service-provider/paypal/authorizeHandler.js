/**
 * Handles authorization of payments through PayPal.
 * 
 * @author Anton Johansson
 */
var PayPalAuthorizeHandler = function()
{
};

/** Authorizes the payment. */
PayPalAuthorizeHandler.prototype.authorize = function(order)
{
	console.log("Successfully authorized %s for PayPal order %s", order.totalValue, order.orderId);
};

// Expose the class
module.exports = PayPalAuthorizeHandler;
