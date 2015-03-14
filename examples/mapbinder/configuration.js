module.exports =
[
	'./payment-service-provider/common/AuthorizeManager.js',
	{ path: './payment-service-provider/klarna/AuthorizeHandler.js', name: 'authorizeHandlers', mapbinder: 'klarna' },
	{ path: './payment-service-provider/paypal/AuthorizeHandler.js', name: 'authorizeHandlers', mapbinder: 'paypal' }
];
