module.exports =
[
	'./payment-service-provider/common/AuthorizeManager.js',
	{ path: './payment-service-provider/klarna/AuthorizeHandler.js', mapbinder: 'authorizeHandlers', name: 'klarna' },
	{ path: './payment-service-provider/paypal/AuthorizeHandler.js', mapbinder: 'authorizeHandlers', name: 'paypal' }
];
