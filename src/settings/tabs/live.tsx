import {
	Button,
	Card,
	CardBody,
	Flex,
	ToggleControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { RulesList } from '@/components/RulesList';
import { ModalAddRule } from '@/components/ModalAddRule';

export const LiveTab = () => {
	const [ isOpen, setIsOpen ] = useState< boolean >( false );

	return (
		<div className="p-8">
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
						checked={ true }
						onChange={ () => {} }
					/>
				</CardBody>
			</Card>
			<Flex align="center" justify="space-between" className="mt-8 mb-4">
				<h2 className="text-xl text-gray-700 m-0">
					{ __( 'Active Optimization Rules', 'mach' ) }
				</h2>
				<Button
					__next40pxDefaultSize
					variant="secondary"
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
