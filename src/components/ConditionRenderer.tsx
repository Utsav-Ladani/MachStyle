import { __ } from '@wordpress/i18n';
import { CONDITION_LABELS } from '@/constants';
import type { Condition } from '@/types/condition';

export const ConditionRenderer = ( {
	condition,
}: {
	condition: Condition;
} ) => {
	if ( ! CONDITION_LABELS.hasOwnProperty( condition.type ) ) {
		return (
			<span className="text-xs italic">
				{ __( 'Unknown Condition', 'mach' ) }
			</span>
		);
	}

	if ( condition.type === 'global' || condition.type === 'home_page' ) {
		return (
			<span className="uppercase text-xs">
				{ CONDITION_LABELS[ condition.type ] }
			</span>
		);
	}

	if (
		condition.type === 'post_type_archive' ||
		condition.type === 'post_type_single'
	) {
		return (
			<span>
				<span>{ CONDITION_LABELS[ condition.type ] }: </span>
				<span className="text-md bg-gray-100 border border-gray-300 mx-1 px-2 py-1 rounded">
					{ condition.postType }
				</span>
			</span>
		);
	}

	return (
		<span>
			<span>{ CONDITION_LABELS[ condition.type ] }: </span>
			<span className="text-md bg-gray-100 border border-gray-300 mx-1 px-2 py-1 rounded">
				{ condition.value }
			</span>
		</span>
	);
};
