import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	DataViews,
	filterSortAndPaginate,
	type Action,
	type Field,
	type View,
} from '@wordpress/dataviews/wp';
import { EmptyRuleList } from '@/components/EmptyRuleList';
import { StyleHandlesRenderer } from '@/components/StyleHandlesRenderer';
import { ConditionRenderer } from '@/components/ConditionRenderer';
import { getHumanReadableCondition } from '@/utils/condition';
import { ModalEditRule } from '@/components/ModalEditRule';
import { ModalDeleteRule } from '@/components/ModalDeleteRule';
import type { Rule } from '@/types';
import { useRuleSetSelect } from '@/hooks/useRuleSetSelect';

export const RulesList = () => {
	const { rules, isLoading } = useRuleSetSelect(
		( select: any, rulesetStore: any ) => {
			return {
				rules: select( rulesetStore ).getRules(),
				isLoading: select( rulesetStore ).isResolving( 'getRules' ),
			};
		}
	);

	const [ view, setView ] = useState< View >( {
		type: 'table',
		perPage: 10,
		page: 1,
		search: '',
		fields: [ 'condition', 'styleHandles' ],
	} );

	const fields: Field< Rule >[] = [
		{
			id: 'condition',
			label: __( 'Condition', 'mach-style' ),
			enableGlobalSearch: true,
			enableSorting: false,
			getValue: ( args ) =>
				getHumanReadableCondition( args.item.condition ),
			render: ( { item }: { item: Rule } ) => (
				<ConditionRenderer condition={ item.condition } />
			),
		},
		{
			id: 'styleHandles',
			label: __( 'Style Handles', 'mach-style' ),
			enableGlobalSearch: true,
			enableSorting: false,
			render: ( { item }: { item: Rule } ) => (
				<StyleHandlesRenderer styleHandles={ item.styleHandles } />
			),
		},
	];

	const actions: Action< Rule >[] = [
		{
			id: 'edit',
			label: __( 'Edit', 'mach-style' ),
			modalHeader: () => __( 'Edit Rule', 'mach-style' ),
			RenderModal: ( { items, closeModal, onActionPerformed } ) => {
				const rule = items[ 0 ];

				return (
					<ModalEditRule
						rule={ rule }
						onClose={ closeModal }
						onEdit={ onActionPerformed }
					/>
				);
			},
		},
		{
			id: 'delete',
			label: __( 'Delete', 'mach-style' ),
			modalHeader: () => __( 'Delete Rule', 'mach-style' ),
			RenderModal: ( { items, closeModal, onActionPerformed } ) => {
				const rule = items[ 0 ];

				return (
					<ModalDeleteRule
						rule={ rule }
						onClose={ closeModal }
						onDelete={ onActionPerformed }
					/>
				);
			},
		},
	];

	const { data, paginationInfo } = filterSortAndPaginate< Rule >(
		rules,
		view,
		fields
	);

	return (
		<div className="rounded overflow-hidden ring-1 ring-gray-300 mb-10">
			<DataViews
				actions={ actions }
				data={ data }
				fields={ fields }
				view={ view }
				isLoading={ isLoading }
				onChangeView={ setView }
				paginationInfo={ paginationInfo }
				defaultLayouts={ {
					table: {},
				} }
				config={ { perPageSizes: [ 10, 20 ] } }
				getItemId={ ( item: Rule ) => item.id.toString() }
				empty={ <EmptyRuleList /> }
			/>
		</div>
	);
};
