module.exports =
[
	'./payment-service-provider/common/authorizeManager',
	{ path: './payment-service-provider/klarna/authorizeHandler', name: 'authorizeHandlers', mapbinder: 'klarna' },
	{ path: './payment-service-provider/paypal/authorizeHandler', name: 'authorizeHandlers', mapbinder: 'paypal' }
];
