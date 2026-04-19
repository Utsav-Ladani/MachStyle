export type ConditionType =
	| 'global'
	| 'home_page'
	| 'post_type_archive'
	| 'post_type_single'
	| 'exact_url'
	| 'starts_with'
	| 'ends_with';

export type ConditionGlobal = {
	type: 'global';
};

export type ConditionHomePage = {
	type: 'home_page';
};

export type ConditionPostTypeArchive = {
	type: 'post_type_archive';
	postType: string;
};

export type ConditionPostTypeSingle = {
	type: 'post_type_single';
	postType: string;
};

export type ConditionExactURL = {
	type: 'exact_url';
	value: string;
};

export type ConditionStartsWith = {
	type: 'starts_with';
	value: string;
};

export type ConditionEndsWith = {
	type: 'ends_with';
	value: string;
};

export type Condition =
	| ConditionGlobal
	| ConditionHomePage
	| ConditionPostTypeArchive
	| ConditionPostTypeSingle
	| ConditionExactURL
	| ConditionStartsWith
	| ConditionEndsWith;
