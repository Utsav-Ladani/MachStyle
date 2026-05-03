import { createRoot, StrictMode } from '@wordpress/element';
import { App } from './App';

import '../tailwind.scss';

const rootElement = document.getElementById( 'mach-style-audit-panel-root' );

if ( rootElement ) {
	createRoot( rootElement ).render(
		<StrictMode>
			<App />
		</StrictMode>
	);
}
