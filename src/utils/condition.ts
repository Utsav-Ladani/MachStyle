import { __ } from '@wordpress/i18n';

import type {
	Condition,
	ConditionPostTypeArchive,
	ConditionPostTypeSingle,
	ConditionExactURL,
	ConditionStartsWith,
	ConditionEndsWith,
	ConditionType,
} from '@/types/condition';
import { CONDITION_LABELS } from '@/constants';

export const getEmptyCondition = (
	conditionType: ConditionType | ''
): Condition | null => {
	switch ( conditionType ) {
		case 'global':
			return { type: 'global' };
		case 'home_page':
			return { type: 'home_page' };
		case 'post_type_archive':
			return { type: 'post_type_archive', postType: '' };
		case 'post_type_single':
			return { type: 'post_type_single', postType: '' };
		case 'exact_url':
			return { type: 'exact_url', value: '' };
		case 'starts_with':
			return { type: 'starts_with', value: '' };
		case 'ends_with':
			return { type: 'ends_with', value: '' };
		default:
			return null;
	}
};

export const isConditionValid = ( condition: Condition | null ): boolean => {
	if ( ! condition ) {
		return false;
	}

	switch ( condition.type ) {
		case 'global':
		case 'home_page':
			return true;
		case 'post_type_archive':
		case 'post_type_single':
			return !! (
				condition as ConditionPostTypeArchive | ConditionPostTypeSingle
			 ).postType;
		case 'exact_url':
		case 'starts_with':
		case 'ends_with':
			return !! (
				condition as
					| ConditionExactURL
					| ConditionStartsWith
					| ConditionEndsWith
			 ).value;
		default:
			return false;
	}
};

export const getHumanReadableCondition = ( condition: Condition ): string => {
	switch ( condition.type ) {
		case 'global':
		case 'home_page':
			return CONDITION_LABELS[ condition.type ];
		case 'post_type_archive':
		case 'post_type_single':
			return `${ CONDITION_LABELS[ condition.type ] }: ${
				(
					condition as
						| ConditionPostTypeArchive
						| ConditionPostTypeSingle
				 ).postType
			}`;
		case 'exact_url':
		case 'starts_with':
		case 'ends_with':
			return `${ CONDITION_LABELS[ condition.type ] }: ${
				(
					condition as
						| ConditionExactURL
						| ConditionStartsWith
						| ConditionEndsWith
				 ).value
			}`;
		default:
			return __( 'Unknown Condition', 'mach' );
	}
};
