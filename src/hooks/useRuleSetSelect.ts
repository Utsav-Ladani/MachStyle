import { useContext } from '@wordpress/element';
import { RuleSetContext } from '@/context/ruleset';
import { useSelect } from '@wordpress/data';
import { liveRuleSetStore } from '@/stores/ruleset/live';
import { testRuleSetStore } from '@/stores/ruleset/test';

export const useRuleSetSelect = ( callback: any, deps: any[] = [] ) => {
	const { id: ruleSetId } = useContext( RuleSetContext );

	return useSelect(
		( select ) =>
			callback(
				select,
				ruleSetId === 'live' ? liveRuleSetStore : testRuleSetStore
			),
		[ ruleSetId, callback, ...deps ]
	);
};
