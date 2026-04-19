import { createReduxStore, register } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { Rule } from '@/types';

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
			const newRule = await apiFetch( {
				method: 'POST',
				path: '/mach/v1/rules',
				data: {
					ruleset_type: 'live',
					rule,
				},
			} );

			return { type: 'ADD_RULE', rule: newRule };
		} catch {
			return { type: 'NONE' };
		}
	},
	async updateRule( rule: Rule ) {
		try {
			const updatedRule = await apiFetch( {
				method: 'PUT',
				path: '/mach/v1/rules',
				data: {
					ruleset_type: 'live',
					rule,
				},
			} );

			return { type: 'UPDATE_RULE', rule: updatedRule };
		} catch {
			return { type: 'NONE' };
		}
	},
	async deleteRule( ruleId: string ) {
		try {
			const deletedRuleId = await apiFetch( {
				method: 'DELETE',
				path: '/mach/v1/rules',
				data: {
					ruleset_type: 'live',
					id: ruleId,
				},
			} );

			return { type: 'DELETE_RULE', id: deletedRuleId };
		} catch {
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
