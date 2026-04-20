import { Button, Flex, Modal } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

type ModalCopyRulesProps = {
	isOpen: boolean;
	sourceLabel: string;
	targetLabel: string;
	isSubmitting?: boolean;
	onClose: () => void;
	onConfirm: () => void;
};

export const ModalCopyRules = ( {
	isOpen,
	sourceLabel,
	targetLabel,
	isSubmitting = false,
	onClose,
	onConfirm,
}: ModalCopyRulesProps ) => {
	if ( ! isOpen ) {
		return null;
	}

	const title = sprintf(
		/* translators: %s is either "Live Settings" or "Test Flight" */
		__( 'Copy Rules from %s', 'mach-style' ),
		sourceLabel
	);
	const description = sprintf(
		/* translators: %1$s and %2$s are either "Live Settings" or "Test Flight" */
		__(
			'This will replace all rules in %1$s with rules from %2$s. Existing rules in %1$s will be permanently removed. Are you sure you want to proceed?',
			'mach-style'
		),
		targetLabel,
		sourceLabel
	);

	return (
		<Modal
			title={ title }
			onRequestClose={ onClose }
			className="mach-style-tailwind"
		>
			<Flex direction="column" gap="4" className="w-lg">
				<p className="text-sm text-gray-600 m-0">{ description }</p>
				<Flex align="center" justify="flex-end" gap="2">
					<Button
						variant="secondary"
						onClick={ onClose }
						disabled={ isSubmitting }
					>
						{ __( 'Cancel', 'mach-style' ) }
					</Button>
					<Button
						variant="primary"
						onClick={ onConfirm }
						isBusy={ isSubmitting }
						disabled={ isSubmitting }
					>
						{ __( 'Yes, Copy Rules', 'mach-style' ) }
					</Button>
				</Flex>
			</Flex>
		</Modal>
	);
};
