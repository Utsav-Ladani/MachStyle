import apiFetch from '@wordpress/api-fetch';

export const getTestFlightUrl = ( testFlightId: string ) => {
	try {
		const url = new URL( window.MACH_STYLE_SETTINGS_DATA.siteUrl );
		url.searchParams.set( 'mach_style_test_flight', testFlightId );
		return url.toString();
	} catch {
		return `?mach_style_test_flight=${ encodeURIComponent(
			testFlightId
		) }`;
	}
};

export const getTestFlightId = async (): Promise< string > => {
	return apiFetch< string >( {
		method: 'GET',
		path: '/mach-style/v1/test-flight-id',
		cache: 'no-cache',
	} );
};

export const recreateTestFlightId = async (): Promise< string > => {
	return apiFetch< string >( {
		method: 'PUT',
		path: '/mach-style/v1/test-flight-id',
		cache: 'no-cache',
	} );
};
