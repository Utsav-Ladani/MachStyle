import {
	Button,
	Flex,
	FormTokenField,
	Modal,
	SelectControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { CONDITION_TYPE_OPTIONS } from '@/constants';
import type { Condition } from '@/types/condition';
import { ConditionFields } from '@/components/ConditionFields';
import { getEmptyCondition, isConditionValid } from '@/utils/condition';

type ModalAddRuleProps = {
	isOpen: boolean;
	onClose: () => void;
};

export const ModalAddRule = ( { isOpen, onClose }: ModalAddRuleProps ) => {
	const [ condition, setCondition ] = useState< Condition | null >( null );
	const [ styleHandles, setStyleHandles ] = useState< string[] >( [] );

	if ( ! isOpen ) {
		return null;
	}

	const handleAddRule = () => {
		onClose();
	};

	return (
		<Modal
			title={ __( 'Add New Rule', 'mach' ) }
			onRequestClose={ onClose }
			className="mach-tailwind"
		>
			<Flex direction="column" gap="4" className="w-lg">
				<SelectControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Select Condition', 'mach' ) }
					value={ condition?.type || '' }
					options={ CONDITION_TYPE_OPTIONS }
					onChange={ ( value ) => {
						setCondition( getEmptyCondition( value ) );
					} }
				/>
				{ condition && (
					<ConditionFields
						condition={ condition }
						setCondition={ setCondition }
					/>
				) }
				<FormTokenField
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Style Handles', 'mach' ) }
					placeholder={ __( 'Enter style handles to defer', 'mach' ) }
					value={ styleHandles }
					onChange={ ( newValue ) =>
						setStyleHandles( newValue as string[] )
					}
				/>
				<Flex align="center" justify="flex-end" gap="2">
					<Button variant="secondary" onClick={ onClose }>
						{ __( 'Cancel', 'mach' ) }
					</Button>
					<Button
						variant="primary"
						onClick={ handleAddRule }
						disabled={
							! isConditionValid( condition ) ||
							styleHandles.length === 0
						}
					>
						{ __( 'Add Rule', 'mach' ) }
					</Button>
				</Flex>
			</Flex>
		</Modal>
	);
};
