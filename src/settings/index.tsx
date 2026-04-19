import { createRoot, StrictMode } from '@wordpress/element';
import { App } from './App';

import '../tailwind.scss';
import './styles.scss';

const rootElement = document.querySelector( '#mach-settings-root' );

if ( rootElement ) {
	createRoot( rootElement ).render(
		<StrictMode>
			<App />
		</StrictMode>
	);
}
