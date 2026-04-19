import { Card, CardBody, ToggleControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { useRuleSetDispatch } from '@/hooks/useRuleSetDispatch';
import { useRuleSetSelect } from '@/hooks/useRuleSetSelect';

export const RulesetToggle = () => {
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
						<span className="text-lg font-medium">
							{ __(
								'Enable Optimization For Live Site',
								'mach'
							) }
						</span>
					}
					help={ __(
						'Turn this off to instantly stop all live optimizations.',
						'mach'
					) }
					checked={ enabled }
					disabled={ resolving || saving }
					onChange={ onChange }
				/>
			</CardBody>
		</Card>
	);
};
