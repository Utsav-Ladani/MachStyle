export type ConditionType =
	| 'global'
	| 'home_page'
	| 'post_type_archive'
	| 'post_type_single'
	| 'exact_url'
	| 'starts_with'
	| 'ends_with';

type ConditionGlobal = {
	type: 'global';
};

type ConditionHomePage = {
	type: 'home_page';
};

type ConditionPostTypeArchive = {
	type: 'post_type_archive';
	postType: string;
};

type ConditionPostTypeSingle = {
	type: 'post_type_single';
	postType: string;
};

type ConditionExactURL = {
	type: 'exact_url';
	value: string;
};

type ConditionStartsWith = {
	type: 'starts_with';
	value: string;
};

type ConditionEndsWith = {
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
