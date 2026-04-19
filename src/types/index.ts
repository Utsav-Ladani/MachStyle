import type { Condition } from '@/types/condition';

export type Rule = {
	id: number;
	condition: Condition;
	styleHandles: string[];
};

export type TabId = 'live' | 'test';
