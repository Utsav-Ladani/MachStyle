import { useState, useEffect } from '@wordpress/element';
import type { StyleHandle } from '../audit-panel/StyleDeferralRow';

const EXCLUDED_HANDLES = [
	'mach-style-audit-panel-style',
	'dashicons',
	'admin-bar',
];

const toHumanReadable = ( str: string ) => {
	return str
		.split( /[-_]/ )
		.map( ( word ) => word.charAt( 0 ).toUpperCase() + word.slice( 1 ) )
		.join( ' ' );
};

export const useStylesheets = ( isOpen: boolean ) => {
	const [ styles, setStyles ] = useState< StyleHandle[] >( [] );

	useEffect( () => {
		if ( ! isOpen ) {
			return;
		}

		const entries = performance.getEntriesByType(
			'resource'
		) as PerformanceResourceTiming[];

		const blockedSet = new Set(
			entries
				.filter( ( e: any ) => e.renderBlockingStatus === 'blocking' )
				.map( ( e ) => e.name )
		);

		const validStylesheets = Array.from( document.styleSheets )
			.filter(
				( s ) =>
					s.href && s.ownerNode && ( s.ownerNode as HTMLElement ).id
			)
			.filter( ( s ) => {
				const id = ( s.ownerNode as HTMLElement ).id;
				const handle = id.replace( /-css$/, '' );
				return ! EXCLUDED_HANDLES.includes( handle );
			} );

		const parsedStyles: StyleHandle[] = validStylesheets.map(
			( stylesheet ) => {
				const node = stylesheet.ownerNode as HTMLElement;
				const href = stylesheet.href!;
				const handle = node.id.replace( /-css$/, '' );

				const isDeferred = ! blockedSet.has( href );

				stylesheet.disabled = isDeferred;

				return {
					id: handle,
					name: toHumanReadable( handle ),
					isDeferred,
				};
			}
		);

		setStyles( parsedStyles );

		// Remove selection on menu close
		return () => {
			validStylesheets.forEach( ( stylesheet ) => {
				stylesheet.disabled = false;
			} );
		};
	}, [ isOpen ] );

	const toggleStyle = ( id: string, isDeferred: boolean ) => {
		setStyles( ( prev ) =>
			prev.map( ( s ) => ( s.id === id ? { ...s, isDeferred } : s ) )
		);

		const node = document.getElementById( id + '-css' ) as
			| HTMLLinkElement
			| HTMLStyleElement
			| null;

		if ( node && node.sheet ) {
			node.sheet.disabled = isDeferred;
		}
	};

	const resetStyles = () => {
		setStyles( ( prev ) =>
			prev.map( ( s ) => {
				const node = document.getElementById( s.id + '-css' ) as
					| HTMLLinkElement
					| HTMLStyleElement
					| null;
				if ( node && node.sheet ) {
					node.sheet.disabled = false;
				}
				return { ...s, isDeferred: false };
			} )
		);
	};

	return { styles, toggleStyle, resetStyles };
};
