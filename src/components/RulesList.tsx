import { Icon } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	DataViews,
	filterSortAndPaginate,
	type Action,
	type Field,
	type View,
} from '@wordpress/dataviews/wp';
import type { Condition, ConditionType } from '@/types/condition';

type Rule = {
	id: number;
	condition: Condition;
	styleHandles: string[];
};

const RULE_LABELS: Record< ConditionType, string > = {
	global: __( 'Global', 'mach' ),
	home_page: __( 'Home Page', 'mach' ),
	post_type_archive: __( 'Post Type Archive', 'mach' ),
	post_type_single: __( 'Post Type Single', 'mach' ),
	exact_url: __( 'Exact URL', 'mach' ),
	starts_with: __( 'URL Starts With', 'mach' ),
	ends_with: __( 'URL Ends With', 'mach' ),
};

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
			getValue: ( args ) => {
				const condition = args.item.condition;

				if ( ! RULE_LABELS.hasOwnProperty( condition.type ) ) {
					return __( 'Unknown Condition', 'mach' );
				}

				if (
					condition.type === 'global' ||
					condition.type === 'home_page'
				) {
					return RULE_LABELS[ condition.type ];
				}

				if (
					condition.type === 'post_type_archive' ||
					condition.type === 'post_type_single'
				) {
					return `${ RULE_LABELS[ condition.type ] }: ${
						condition.postType
					}`;
				}

				return `${ RULE_LABELS[ condition.type ] }: ${
					condition.value
				}`;
			},
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
			callback: async ( items: Rule[] ) => {
				// eslint-disable-next-line no-console
				console.log( 'Edit action triggered for items:', items );
			},
		},
		{
			id: 'delete',
			label: __( 'Delete', 'mach' ),
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
				empty={ <EmptyState /> }
			/>
		</div>
	);
};

const EmptyState = () => {
	return (
		<div className="text-center py-16">
			<Icon icon="info" size={ 48 } className="text-gray-400 mb-4" />
			<h2 className="text-xl text-gray-700 m-0 mb-2">
				{ __( 'No active optimization rules', 'mach' ) }
			</h2>
			<p className="text-gray-500 m-0 mb-6">
				{ __(
					'Create rules to conditionally defer CSS loading and improve site performance.',
					'mach'
				) }
			</p>
		</div>
	);
};

const ConditionRenderer = ( { condition }: { condition: Condition } ) => {
	if ( ! RULE_LABELS.hasOwnProperty( condition.type ) ) {
		return (
			<span className="text-xs italic">
				{ __( 'Unknown Condition', 'mach' ) }
			</span>
		);
	}

	if ( condition.type === 'global' || condition.type === 'home_page' ) {
		return (
			<span className="uppercase text-xs">
				{ RULE_LABELS[ condition.type ] }
			</span>
		);
	}

	if (
		condition.type === 'post_type_archive' ||
		condition.type === 'post_type_single'
	) {
		return (
			<span>
				<span>{ RULE_LABELS[ condition.type ] }: </span>
				<span className="text-md bg-gray-100 border border-gray-300 mx-1 px-2 py-1 rounded">
					{ condition.postType }
				</span>
			</span>
		);
	}

	return (
		<span>
			<span>{ RULE_LABELS[ condition.type ] }: </span>
			<span className="text-md bg-gray-100 border border-gray-300 mx-1 px-2 py-1 rounded">
				{ condition.value }
			</span>
		</span>
	);
};

const StyleHandlesRenderer = ( {
	styleHandles,
}: {
	styleHandles: string[];
} ) => {
	return (
		<div>
			{ styleHandles.map( ( handle ) => (
				<span
					key={ handle }
					className="text-md text-[var(--wp-admin-theme-color)] border border-[var(--wp-admin-theme-color)] mx-1 px-2 py-1 rounded"
				>
					{ handle }
				</span>
			) ) }
		</div>
	);
};
