import {
	Button,
	Card,
	CardBody,
	Flex,
	FlexItem,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { RulesList } from '@/components/RulesList';

export const LiveTab = () => {
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
				<FlexItem>
					<h2 className="text-xl text-gray-700 m-0">
						{ __( 'Active Optimization Rules', 'mach' ) }
					</h2>
				</FlexItem>
				<FlexItem>
					<Button __next40pxDefaultSize variant="secondary">
						{ __( 'Add New Rule', 'mach' ) }
					</Button>
				</FlexItem>
			</Flex>
			<RulesList />
		</div>
	);
};
