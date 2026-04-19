import { useContext } from '@wordpress/element';
import { RuleSetContext } from '@/context/ruleset';
import { useDispatch } from '@wordpress/data';
import { liveRuleSetStore } from '@/stores/ruleset/live';
import { testRuleSetStore } from '@/stores/ruleset/test';

export const useRuleSetDispatch = () => {
	const { id: ruleSetId } = useContext( RuleSetContext );

	return useDispatch(
		ruleSetId === 'live' ? liveRuleSetStore : testRuleSetStore
	);
};
