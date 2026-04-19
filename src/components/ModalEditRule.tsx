import {
	Button,
	Flex,
	FormTokenField,
	SelectControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { CONDITION_TYPE_OPTIONS } from '@/constants';
import type { Condition } from '@/types/condition';
import { ConditionFields } from '@/components/ConditionFields';
import { getEmptyCondition, isConditionValid } from '@/utils/condition';
import type { Rule } from '@/types';

type ModalEditRuleProps = {
	rule?: Rule;
	onClose?: () => void;
	onEdit?: ( rules: Rule[] ) => void;
};

export const ModalEditRule = ( {
	rule,
	onClose,
	onEdit,
}: ModalEditRuleProps ) => {
	const [ condition, setCondition ] = useState< Condition | null >(
		rule?.condition || null
	);
	const [ styleHandles, setStyleHandles ] = useState< string[] >(
		rule?.styleHandles || []
	);

	const handleEditRule = () => {
		onEdit?.( [
			{
				id: rule?.id || 0,
				condition: condition as Condition,
				styleHandles,
			},
		] );
		onClose?.();
	};

	return (
		<div className="mach-tailwind">
			<Flex direction="column" gap="4">
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
					<Button variant="secondary" onClick={ () => onClose?.() }>
						{ __( 'Cancel', 'mach' ) }
					</Button>
					<Button
						variant="primary"
						onClick={ handleEditRule }
						disabled={
							! isConditionValid( condition ) ||
							styleHandles.length === 0
						}
					>
						{ __( 'Edit Rule', 'mach' ) }
					</Button>
				</Flex>
			</Flex>
		</div>
	);
};
