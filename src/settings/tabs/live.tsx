import { Button, Flex } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { RulesList } from '@/components/RulesList';
import { ModalAddRule } from '@/components/ModalAddRule';
import { RulesetToggle } from '@/components/RulesetToggle';

export const LiveTab = () => {
	const [ isOpen, setIsOpen ] = useState< boolean >( false );

	return (
		<div className="p-8">
			<RulesetToggle />
			<Flex align="center" justify="space-between" className="mt-8 mb-4">
				<h2 className="text-xl text-gray-700 m-0">
					{ __( 'Active Optimization Rules', 'mach' ) }
				</h2>
				<Button
					__next40pxDefaultSize
					variant="primary"
					onClick={ () => setIsOpen( true ) }
				>
					{ __( 'Add New Rule', 'mach' ) }
				</Button>
			</Flex>
			<RulesList />
			<ModalAddRule
				isOpen={ isOpen }
				onClose={ () => setIsOpen( false ) }
			/>
		</div>
	);
};
