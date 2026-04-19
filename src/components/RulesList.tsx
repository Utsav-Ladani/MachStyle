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

export const RulesList = () => {
	const rules: Rule[] = [
		{
			id: 1,
			condition: { type: 'global' },
			styleHandles: [ 'handle1', 'handle2' ],
		},
		{
			id: 2,
			condition: { type: 'post_type_archive', postType: 'post' },
			styleHandles: [ 'handle3', 'handle4' ],
		},
		{
			id: 3,
			condition: { type: 'post_type_single', postType: 'product' },
			styleHandles: [ 'handle5' ],
		},
		{
			id: 4,
			condition: { type: 'starts_with', value: 'category-' },
			styleHandles: [ 'handle6', 'handle7' ],
		},
		{
			id: 5,
			condition: { type: 'ends_with', value: '-archive' },
			styleHandles: [ 'handle8' ],
		},
		{
			id: 6,
			condition: { type: 'exact_url', value: '/special-page' },
			styleHandles: [ 'handle9' ],
		},
		{
			id: 7,
			condition: { type: 'home_page' },
			styleHandles: [ 'handle10' ],
		},
	];

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
			label: __( 'Condition', 'mach' ),
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
			label: __( 'Style Handles', 'mach' ),
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
			label: __( 'Edit', 'mach' ),
			modalHeader: () => __( 'Edit Rule', 'mach' ),
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
			callback: async ( items: Rule[] ) => {
				// eslint-disable-next-line no-console
				console.log( 'Edit action triggered for items:', items );
			},
		},
		{
			id: 'delete',
			label: __( 'Delete', 'mach' ),
			modalHeader: () => __( 'Delete Rule', 'mach' ),
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
			callback: ( items: Rule[] ) => {
				// eslint-disable-next-line no-console
				console.log( 'Delete action triggered for items:', items );
			},
		},
	];

	const { data, paginationInfo } = filterSortAndPaginate< Rule >(
		rules,
		view,
		fields
	);

	return (
		<div className="rounded overflow-hidden ring-2 ring-gray-200 mb-10">
			<DataViews
				actions={ actions }
				data={ data }
				fields={ fields }
				view={ view }
				isLoading={ false }
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
