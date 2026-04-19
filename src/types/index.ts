import type { Condition } from '@/types/condition';

export type Rule = {
	id: string;
	condition: Condition;
	styleHandles: string[];
};

export type RuleSetId = 'live' | 'test';
