import { useContext } from '@wordpress/element';
import { RuleSetContext } from '@/context/ruleset';
import { useSelect } from '@wordpress/data';
import { liveRuleSetStore } from '@/stores/ruleset/live';

export const useRuleSetSelect = ( callback: any, deps: any[] = [] ) => {
	const { id: ruleSetId } = useContext( RuleSetContext );

	return useSelect(
		( select ) =>
			callback( select, ruleSetId ? liveRuleSetStore : liveRuleSetStore ),
		[ ruleSetId, callback, ...deps ]
	);
};
