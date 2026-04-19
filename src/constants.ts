import { __ } from '@wordpress/i18n';
import type { ConditionType } from '@/types/condition';

export const CONDITION_LABELS: Record< ConditionType, string > = {
	global: __( 'Global', 'mach' ),
	home_page: __( 'Home Page', 'mach' ),
	post_type_archive: __( 'Post Type Archive', 'mach' ),
	post_type_single: __( 'Post Type Single', 'mach' ),
	exact_url: __( 'Exact URL', 'mach' ),
	starts_with: __( 'URL Starts With', 'mach' ),
	ends_with: __( 'URL Ends With', 'mach' ),
};

type ConditionTypeOption = {
	value: ConditionType | '';
	label: string;
	disabled?: boolean;
};

export const CONDITION_TYPE_OPTIONS: ConditionTypeOption[] = [
	{ value: '', label: __( 'Select Condition', 'mach' ), disabled: true },
	...Object.entries( CONDITION_LABELS ).map(
		( [ value, label ] ) => ( { value, label } ) as ConditionTypeOption
	),
];
