import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { TabButton } from '@/components/TabButton';
import { LiveTab } from '@/settings/tabs/live';
import { TestTab } from '@/settings/tabs/test';
import { RuleSetId } from '@/types';
import { RuleSetContext } from '@/context/ruleset';

const tabs: {
	id: RuleSetId;
	label: string;
	description: string;
	component: React.ComponentType;
}[] = [
	{
		id: 'live',
		label: __( 'Live Settings (Production)', 'mach-style' ),
		description: __(
			'Rules here affect your production visitors in real time.',
			'mach-style'
		),
		component: LiveTab,
	},
	{
		id: 'test',
		label: __( 'Test Flight (Lab)', 'mach-style' ),
		description: __(
			'Rules here run only in Test Flight mode for safe testing.',
			'mach-style'
		),
		component: TestTab,
	},
];

export const Tabs = () => {
	const [ activeTab, setActiveTab ] = useState< RuleSetId >( 'live' );

	const ActiveComponent = tabs.find( ( tab ) => tab.id === activeTab )
		?.component;

	return (
		<>
			<div className="border-b border-gray-200 flex sticky top-[124px] bg-white z-10">
				{ tabs.map( ( tab ) => (
					<TabButton
						key={ tab.id }
						isActive={ activeTab === tab.id }
						onClick={ () => setActiveTab( tab.id ) }
					>
						<h2 className="text-lg text-gray-700 m-0">
							{ tab.label }
						</h2>
						<p className="text-sm text-gray-500 m-0">
							{ tab.description }
						</p>
					</TabButton>
				) ) }
			</div>
			<RuleSetContext.Provider value={ { id: activeTab } }>
				{ ActiveComponent && <ActiveComponent /> }
			</RuleSetContext.Provider>
		</>
	);
};
