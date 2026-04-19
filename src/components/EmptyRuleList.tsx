import { Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export const EmptyRuleList = () => {
	return (
		<div className="text-center py-16">
			<Icon icon="info" size={ 48 } className="text-gray-400 mb-4" />
			<h2 className="text-xl text-gray-700 m-0 mb-2">
				{ __( 'No active optimization rules', 'mach' ) }
			</h2>
			<p className="text-gray-500 m-0 mb-6">
				{ __(
					'Create rules to conditionally defer CSS loading and improve site performance.',
					'mach'
				) }
			</p>
		</div>
	);
};
