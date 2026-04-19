import { RuleSetId } from '@/types';
import { createContext } from '@wordpress/element';

type RuleSetContextType = {
	id: RuleSetId;
};

export const RuleSetContext = createContext< RuleSetContextType >( {
	id: 'live',
} );
