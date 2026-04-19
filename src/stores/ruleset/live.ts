import { createReduxStore, register } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { Rule } from '@/types';
import { createNotice } from '@/utils/notice';

const STORE_NAME = 'mach/live-ruleset';

type State = {
	rules: Rule[];
};

const DEFAULT_STATE: State = {
	rules: [],
};

const reducer = ( state = DEFAULT_STATE, action: any ) => {
	switch ( action.type ) {
		case 'SET_RULES':
			return { ...state, rules: action.rules };
		case 'ADD_RULE':
			return {
				...state,
				rules: [ ...state.rules, action.rule ],
			};
		case 'UPDATE_RULE':
			return {
				...state,
				rules: state.rules.map( ( r ) =>
					r.id === action.rule.id ? action.rule : r
				),
			};
		case 'DELETE_RULE':
			return {
				...state,
				rules: state.rules.filter( ( r ) => r.id !== action.id ),
			};
		default:
			return state;
	}
};

const actions = {
	setRules( rules: Rule[] ) {
		return { type: 'SET_RULES', rules };
	},
	async addRule( rule: Omit< Rule, 'id' > ) {
		try {
			createNotice( 'Adding rule...', 'info' );

			const newRule = await apiFetch( {
				method: 'POST',
				path: '/mach/v1/rules',
				data: {
					ruleset_type: 'live',
					rule,
				},
			} );

			createNotice( 'Rule added successfully!' );

			return { type: 'ADD_RULE', rule: newRule };
		} catch {
			createNotice( 'Failed to add rule', 'error' );

			return { type: 'NONE' };
		}
	},
	async updateRule( rule: Rule ) {
		try {
			createNotice( 'Updating rule...', 'info' );

			const updatedRule = await apiFetch( {
				method: 'PUT',
				path: '/mach/v1/rules',
				data: {
					ruleset_type: 'live',
					rule,
				},
			} );

			createNotice( 'Rule updated successfully!' );

			return { type: 'UPDATE_RULE', rule: updatedRule };
		} catch {
			createNotice( 'Failed to update rule', 'error' );

			return { type: 'NONE' };
		}
	},
	async deleteRule( ruleId: string ) {
		try {
			createNotice( 'Deleting rule...', 'info' );

			const deletedRuleId = await apiFetch( {
				method: 'DELETE',
				path: '/mach/v1/rules',
				data: {
					ruleset_type: 'live',
					id: ruleId,
				},
			} );

			createNotice( 'Rule deleted successfully!' );

			return { type: 'DELETE_RULE', id: deletedRuleId };
		} catch {
			createNotice( 'Failed to delete rule', 'error' );

			return { type: 'NONE' };
		}
	},
};

const selectors = {
	getRules( state: State ) {
		return state.rules;
	},
};

const resolvers = {
	getRules() {
		return async ( { dispatch }: { dispatch: any } ) => {
			try {
				const searchParams = new URLSearchParams( {
					ruleset_type: 'live',
				} );

				const path = `/mach/v1/rules?${ searchParams.toString() }`;

				const rules = await apiFetch( {
					method: 'GET',
					path,
				} );

				dispatch.setRules( rules );
			} catch {
				dispatch.setRules( [] );

				createNotice( 'Failed to fetch rules', 'error' );
			}
		};
	},
};

export const liveRuleSetStore = createReduxStore( STORE_NAME, {
	reducer,
	actions,
	selectors,
	resolvers,
} );

register( liveRuleSetStore );
