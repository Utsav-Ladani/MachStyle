import { __ } from '@wordpress/i18n';
import type { ConditionType } from '@/types/condition';

export const CONDITION_LABELS: Record< ConditionType, string > = {
	global: __( 'Global', 'mach-style' ),
	home_page: __( 'Home Page', 'mach-style' ),
	post_type_archive: __( 'Post Type Archive', 'mach-style' ),
	post_type_single: __( 'Post Type Single', 'mach-style' ),
	exact_url: __( 'Exact URL', 'mach-style' ),
	starts_with: __( 'URL Starts With', 'mach-style' ),
	ends_with: __( 'URL Ends With', 'mach-style' ),
};

type ConditionTypeOption = {
	value: ConditionType | '';
	label: string;
	disabled?: boolean;
};

export const CONDITION_TYPE_OPTIONS: ConditionTypeOption[] = [
	{
		value: '',
		label: __( 'Select Condition', 'mach-style' ),
		disabled: true,
	},
	...Object.entries( CONDITION_LABELS ).map(
		( [ value, label ] ) => ( { value, label } ) as ConditionTypeOption
	),
];
