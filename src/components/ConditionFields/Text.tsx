import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { CONDITION_LABELS } from '@/constants';
import type {
	ConditionExactURL,
	ConditionStartsWith,
	ConditionEndsWith,
} from '@/types/condition';

type TextProps = {
	condition: ConditionExactURL | ConditionStartsWith | ConditionEndsWith;
	setCondition: (
		condition:
			| ConditionExactURL
			| ConditionStartsWith
			| ConditionEndsWith
			| null
	) => void;
};

export const Text = ( { condition, setCondition }: TextProps ) => {
	return (
		<TextControl
			__nextHasNoMarginBottom
			__next40pxDefaultSize
			label={ CONDITION_LABELS[ condition.type ] }
			placeholder={ __( 'Enter value', 'mach-style' ) }
			value={ condition.value }
			onChange={ ( newValue ) => {
				const sanitizedValue = newValue
					.trim()
					.replace( /[^a-zA-Z0-9-_/]/g, '' );

				setCondition( {
					type: condition.type,
					value: sanitizedValue,
				} );
			} }
		/>
	);
};
