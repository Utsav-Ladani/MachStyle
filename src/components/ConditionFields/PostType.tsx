import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { CONDITION_LABELS } from '@/constants';
import type {
	ConditionPostTypeArchive,
	ConditionPostTypeSingle,
} from '@/types/condition';

type PostTypeProps = {
	condition: ConditionPostTypeArchive | ConditionPostTypeSingle;
	setCondition: (
		condition: ConditionPostTypeArchive | ConditionPostTypeSingle | null
	) => void;
};

export const PostType = ( { condition, setCondition }: PostTypeProps ) => {
	const options = [
		{ value: '', label: __( 'Select Post Type', 'mach' ), disabled: true },
		...window.MACH_SETTINGS_DATA.availablePostTypes.map( ( postType ) => ( {
			value: postType,
			label: postType,
		} ) ),
	];

	return (
		<SelectControl
			__nextHasNoMarginBottom
			__next40pxDefaultSize
			label={ CONDITION_LABELS[ condition.type ] }
			value={ condition.postType || '' }
			options={ options }
			onChange={ ( newValue ) => {
				setCondition( {
					type: condition.type,
					postType: newValue,
				} );
			} }
		/>
	);
};
