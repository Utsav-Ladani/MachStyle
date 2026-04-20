import { createReduxStore, register } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { Rule } from '@/types';
import { createNotice } from '@/utils/notice';

const STORE_NAME = 'mach-style/test-ruleset';

type State = {
	enabled: boolean;
	rules: Rule[];
};

const DEFAULT_STATE: State = {
	enabled: false,
	rules: [],
};

const reducer = ( state = DEFAULT_STATE, action: any ) => {
	switch ( action.type ) {
		case 'SET_ENABLED':
			return { ...state, enabled: action.enabled };
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
	setEnabled( enabled: boolean ) {
		return { type: 'SET_ENABLED', enabled };
	},
	setRules( rules: Rule[] ) {
		return { type: 'SET_RULES', rules };
	},
	async persistEnabled( enabled: boolean, previousEnabled: boolean ) {
		try {
			const newEnabled = await apiFetch( {
				method: 'POST',
				path: '/mach-style/v1/ruleset-status',
				data: {
					ruleset_type: 'test',
					enabled,
				},
			} );

			return { type: 'SET_ENABLED', enabled: newEnabled };
		} catch {
			createNotice( 'Failed to update ruleset status', 'error' );

			return { type: 'SET_ENABLED', enabled: previousEnabled };
		}
	},
	async addRule( rule: Omit< Rule, 'id' > ) {
		try {
			createNotice( 'Adding rule...', 'info' );

			const newRule = await apiFetch( {
				method: 'POST',
				path: '/mach-style/v1/rules',
				data: {
					ruleset_type: 'test',
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
				path: '/mach-style/v1/rules',
				data: {
					ruleset_type: 'test',
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
				path: '/mach-style/v1/rules',
				data: {
					ruleset_type: 'test',
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
	isEnabled( state: State ) {
		return state.enabled;
	},
	getRules( state: State ) {
		return state.rules;
	},
};

const resolvers = {
	isEnabled() {
		return async ( { dispatch }: { dispatch: any } ) => {
			try {
				const urlSearchParams = new URLSearchParams( {
					ruleset_type: 'test',
				} );

				const path = `/mach-style/v1/ruleset-status?${ urlSearchParams.toString() }`;

				const enabled = await apiFetch( {
					method: 'GET',
					path,
					cache: 'no-cache',
				} );

				dispatch.setEnabled( enabled );
			} catch {
				dispatch.setEnabled( false );

				createNotice( 'Failed to fetch ruleset status', 'error' );
			}
		};
	},
	getRules() {
		return async ( { dispatch }: { dispatch: any } ) => {
			try {
				const searchParams = new URLSearchParams( {
					ruleset_type: 'test',
				} );

				const path = `/mach-style/v1/rules?${ searchParams.toString() }`;

				const rules = await apiFetch( {
					method: 'GET',
					path,
					cache: 'no-cache',
				} );

				dispatch.setRules( rules );
			} catch {
				dispatch.setRules( [] );

				createNotice( 'Failed to fetch rules', 'error' );
			}
		};
	},
};

export const testRuleSetStore = createReduxStore( STORE_NAME, {
	reducer,
	actions,
	selectors,
	resolvers,
} );

register( testRuleSetStore );
