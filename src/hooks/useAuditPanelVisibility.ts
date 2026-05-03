import { useState, useEffect } from '@wordpress/element';

export const useAuditPanelVisibility = () => {
	const [ isPanelOpen, setIsPanelOpen ] = useState< boolean >( false );

	useEffect( () => {
		const menuBtn = document.getElementById(
			'wp-admin-bar-mach-style-quick-access-audit-panel'
		);

		if ( ! menuBtn ) {
			return;
		}

		const clickHandler = () => {
			setIsPanelOpen( true );
		};

		menuBtn.addEventListener( 'click', clickHandler );

		return () => {
			menuBtn.removeEventListener( 'click', clickHandler );
		};
	}, [] );

	return { isPanelOpen, setIsPanelOpen };
};
