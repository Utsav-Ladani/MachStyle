import apiFetch from '@wordpress/api-fetch';

import type { RuleSetId } from '@/types';

export const copyRules = (
	sourceRuleset: RuleSetId,
	targetRuleset: RuleSetId
): Promise< boolean > => {
	return apiFetch< boolean >( {
		method: 'POST',
		path: '/mach/v1/rules/copy',
		data: {
			source_ruleset: sourceRuleset,
			target_ruleset: targetRuleset,
		},
	} );
};
