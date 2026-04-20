import { Button, Flex } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import type { Rule } from '@/types';
import { useRuleSetDispatch } from '@/hooks/useRuleSetDispatch';

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
	const { deleteRule } = useRuleSetDispatch();

	const handleDeleteRule = () => {
		if ( ! rule ) {
			onClose?.();
			return;
		}

		onDelete?.( [ rule ] );
		deleteRule( rule.id );
		onClose?.();
	};

	return (
		<div className="mach-style-tailwind">
			<Flex direction="column" gap="4">
				<p className="text-sm text-gray-600">
					{ __(
						'Are you sure you want to delete this rule? This action cannot be undone.',
						'mach-style'
					) }
				</p>
				<Flex align="center" justify="flex-end" gap="2">
					<Button variant="secondary" onClick={ () => onClose?.() }>
						{ __( 'Cancel', 'mach-style' ) }
					</Button>
					<Button
						variant="primary"
						isDestructive
						onClick={ handleDeleteRule }
					>
						{ __( 'Delete Rule', 'mach-style' ) }
					</Button>
				</Flex>
			</Flex>
		</div>
	);
};
