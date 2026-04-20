import { Button, Flex } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { RulesList } from '@/components/RulesList';
import { ModalAddRule } from '@/components/ModalAddRule';
import { CopyRulesButton } from '@/components/CopyRulesButton';
import { RulesetToggle } from '@/components/RulesetToggle';
import { TestFlightStatus } from '@/components/TestFlightStatus';

export const TestTab = () => {
	const [ isOpen, setIsOpen ] = useState< boolean >( false );

	return (
		<div className="p-6">
			<RulesetToggle
				label={ __(
					'Enable Optimization For Test Flight',
					'mach-style'
				) }
				help={ __(
					'Turn this on to enable optimizations for test flights.',
					'mach-style'
				) }
			/>
			<TestFlightStatus />
			<Flex align="center" justify="space-between" className="mt-6 mb-4">
				<h2 className="text-xl text-gray-700 m-0">
					{ __( 'Active Optimization Rules', 'mach-style' ) }
				</h2>
				<Flex align="center" gap="2" className="w-fit">
					<Button
						__next40pxDefaultSize
						variant="primary"
						onClick={ () => setIsOpen( true ) }
					>
						{ __( 'Add New Rule', 'mach-style' ) }
					</Button>
					<CopyRulesButton />
				</Flex>
			</Flex>
			<RulesList />
			<ModalAddRule
				isOpen={ isOpen }
				onClose={ () => setIsOpen( false ) }
			/>
		</div>
	);
};
