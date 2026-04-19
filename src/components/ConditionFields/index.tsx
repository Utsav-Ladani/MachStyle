import { __ } from '@wordpress/i18n';

import { CONDITION_LABELS } from '@/constants';
import { PostType } from '@/components/ConditionFields/PostType';
import { Text } from '@/components/ConditionFields/Text';
import type { Condition } from '@/types/condition';

export const ConditionFields = ( {
	condition,
	setCondition,
}: {
	condition: Condition;
	setCondition: ( condition: Condition | null ) => void;
} ) => {
	if ( ! CONDITION_LABELS.hasOwnProperty( condition.type ) ) {
		return (
			<span className="text-xs italic">
				{ __( 'Unknown Condition', 'mach' ) }
			</span>
		);
	}

	if ( condition.type === 'global' || condition.type === 'home_page' ) {
		return null;
	}

	if (
		condition.type === 'post_type_archive' ||
		condition.type === 'post_type_single'
	) {
		return (
			<PostType condition={ condition } setCondition={ setCondition } />
		);
	}

	return <Text condition={ condition } setCondition={ setCondition } />;
};
