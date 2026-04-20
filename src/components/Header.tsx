import { __ } from '@wordpress/i18n';

export const Header = () => {
	return (
		<div className="px-8 py-4 border-b border-gray-200 sticky top-[32px] bg-white z-10 h-[92px] box-border">
			<h1 className="text-3xl text-[var(--wp-admin-theme-color)] m-0">
				{ __( 'MachStyle Settings', 'mach-style' ) }
			</h1>
			<p className="text-gray-500 m-0 mt-1">
				{ __(
					'Optimize site performance by conditionally deferring the loading of CSS stylesheets.',
					'mach-style'
				) }
			</p>
		</div>
	);
};
