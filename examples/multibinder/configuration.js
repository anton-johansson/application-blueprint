module.exports =
[
	'./validation/ValidationManager.js',
	{ path: './validation/NameValidator.js', multibinder: 'validators' },
	{ path: './validation/AgeValidator.js', multibinder: 'validators' }
];
