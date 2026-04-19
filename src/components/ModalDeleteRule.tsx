import { Button, Flex } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import type { Rule } from '@/types';

type ModalDeleteRuleProps = {
	rule?: Rule;
	onClose?: () => void;
	onDelete?: ( rules: Rule[] ) => void;
};

export const ModalDeleteRule = ( {
	rule,
	onClose,
	onDelete,
}: ModalDeleteRuleProps ) => {
	const handleDeleteRule = () => {
		onDelete?.( rule ? [ rule ] : [] );
		onClose?.();
	};

	return (
		<div className="mach-tailwind">
			<Flex direction="column" gap="4">
				<p className="text-sm text-gray-600">
					{ __(
						'Are you sure you want to delete this rule? This action cannot be undone.',
						'mach'
					) }
				</p>
				<Flex align="center" justify="flex-end" gap="2">
					<Button variant="secondary" onClick={ () => onClose?.() }>
						{ __( 'Cancel', 'mach' ) }
					</Button>
					<Button
						variant="primary"
						isDestructive
						onClick={ handleDeleteRule }
					>
						{ __( 'Delete Rule', 'mach' ) }
					</Button>
				</Flex>
			</Flex>
		</div>
	);
};
