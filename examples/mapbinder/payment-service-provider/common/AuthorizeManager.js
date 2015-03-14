/**
 * Handles authorization of payments through Klarna.
 *
 * @author Anton Johansson
 */
var AuthorizeManager = function(authorizeHandlers)
{
	this.authorizeHandlers = authorizeHandlers;
};

/** Authorizes the payment of an order. */
AuthorizeManager.prototype.authorize = function(order)
{
	var authorizeHandler = this.authorizeHandlers[order.paymentServiceProvider];
	authorizeHandler.authorize(order);
};

// Expose the class
module.exports = AuthorizeManager;
module.exports.$dependencies = ['authorizeHandlers'];
