import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { TabButton } from '@/components/TabButton';
import { LiveTab } from '@/settings/tabs/live';
import { TestTab } from '@/settings/tabs/test';
import { RuleSetId } from '@/types';
import { RuleSetContext } from '@/context/ruleset';

const tabs: { id: RuleSetId; label: string; component: React.ComponentType }[] =
	[
		{
			id: 'live',
			label: __( 'Live Settings (Production)', 'mach' ),
			component: LiveTab,
		},
		{
			id: 'test',
			label: __( 'Test Flight (Lab)', 'mach' ),
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
						{ tab.label }
					</TabButton>
				) ) }
			</div>
			<RuleSetContext.Provider value={ { id: activeTab } }>
				{ ActiveComponent && <ActiveComponent /> }
			</RuleSetContext.Provider>
		</>
	);
};
