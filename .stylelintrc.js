const defaultConfig = require( '@wordpress/scripts/config/.stylelintrc.json' );

module.exports = {
	...defaultConfig,
	rules: {
		...defaultConfig.rules,
		'scss/at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [ 'config' ],
			},
		]
	},
};
