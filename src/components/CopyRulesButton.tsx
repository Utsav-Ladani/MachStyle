import { Button } from '@wordpress/components';
import { useContext, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';

import { ModalCopyRules } from '@/components/ModalCopyRules';
import { RuleSetContext } from '@/context/ruleset';
import { useRuleSetDispatch } from '@/hooks/useRuleSetDispatch';
import { copyRules } from '@/utils/rules';
import { createNotice } from '@/utils/notice';

export const CopyRulesButton = () => {
	const { id: targetRuleset } = useContext( RuleSetContext );

	const sourceRuleset = targetRuleset === 'live' ? 'test' : 'live';

	const sourceLabel =
		sourceRuleset === 'live'
			? __( 'Live Settings', 'mach-style' )
			: __( 'Test Flight', 'mach-style' );
	const targetLabel =
		targetRuleset === 'live'
			? __( 'Live Settings', 'mach-style' )
			: __( 'Test Flight', 'mach-style' );

	const buttonLabel = sprintf(
		/* translators: %s is either "Live Settings" or "Test Flight" */
		__( 'Copy Rules from %s', 'mach-style' ),
		sourceLabel
	);

	const successNotice = sprintf(
		/* translators: %1$s and %2$s are either "Live Settings" or "Test Flight" */
		__( '%1$s rules replaced with %2$s rules.', 'mach-style' ),
		targetLabel,
		sourceLabel
	);
	const errorNotice = sprintf(
		/* translators: %s is either "Live Settings" or "Test Flight" */
		__( 'Failed to copy %s rules.', 'mach-style' ),
		sourceLabel
	);

	const [ isCopyModalOpen, setIsCopyModalOpen ] =
		useState< boolean >( false );
	const [ isCopying, setIsCopying ] = useState< boolean >( false );

	const { invalidateResolution } = useRuleSetDispatch();

	const handleCopy = async () => {
		setIsCopying( true );

		try {
			await copyRules( sourceRuleset, targetRuleset );

			invalidateResolution( 'getRules', [] );
			setIsCopyModalOpen( false );
			createNotice( successNotice );
		} catch {
			createNotice( errorNotice, 'error' );
		} finally {
			setIsCopying( false );
		}
	};

	return (
		<>
			<Button
				__next40pxDefaultSize
				variant="secondary"
				onClick={ () => setIsCopyModalOpen( true ) }
				isDestructive
				isBusy={ isCopying }
				disabled={ isCopying }
			>
				{ buttonLabel }
			</Button>
			<ModalCopyRules
				isOpen={ isCopyModalOpen }
				sourceLabel={ sourceLabel }
				targetLabel={ targetLabel }
				isSubmitting={ isCopying }
				onClose={ () => setIsCopyModalOpen( false ) }
				onConfirm={ handleCopy }
			/>
		</>
	);
};
