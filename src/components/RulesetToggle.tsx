import { Card, CardBody, ToggleControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

import { useRuleSetDispatch } from '@/hooks/useRuleSetDispatch';
import { useRuleSetSelect } from '@/hooks/useRuleSetSelect';

type RulesetToggleProps = {
	label: string;
	help: string;
};

export const RulesetToggle = ( { label, help }: RulesetToggleProps ) => {
	const { setEnabled, persistEnabled } = useRuleSetDispatch();

	const { enabled, resolving } = useRuleSetSelect(
		( select: any, rulesetStore: any ) => ( {
			enabled: select( rulesetStore ).isEnabled(),
			resolving: select( rulesetStore ).isResolving( 'isEnabled' ),
		} )
	);

	const [ saving, setSaving ] = useState( false );

	const onChange = async ( nextValue: boolean ) => {
		const previousValue = enabled;

		setEnabled( nextValue );
		setSaving( true );

		try {
			await persistEnabled( nextValue, previousValue );
		} finally {
			setSaving( false );
		}
	};

	return (
		<Card>
			<CardBody>
				<ToggleControl
					__nextHasNoMarginBottom
					label={
						<span className="text-lg font-medium">{ label }</span>
					}
					help={ help }
					checked={ enabled }
					disabled={ resolving || saving }
					onChange={ onChange }
				/>
			</CardBody>
		</Card>
	);
};
