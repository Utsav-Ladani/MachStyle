import {
	Button,
	Card,
	CardBody,
	ExternalLink,
	Flex,
	Tooltip,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import {
	getTestFlightId,
	getTestFlightUrl,
	recreateTestFlightId,
} from '@/utils/test-flight';
import { createNotice } from '@/utils/notice';

export const TestFlightStatus = () => {
	const [ testFlightId, setTestFlightId ] = useState< string >( '' );
	const [ isFetching, setIsFetching ] = useState< boolean >( false );
	const [ isRecreating, setIsRecreating ] = useState< boolean >( false );

	const testFlightUrl = getTestFlightUrl( testFlightId );

	useEffect( () => {
		let isMounted = true;

		const fetchTestFlightId = async () => {
			setIsFetching( true );
			try {
				const id = await getTestFlightId();

				if ( isMounted ) {
					setTestFlightId( id );
				}
			} catch {
				createNotice(
					__(
						'Failed to fetch Test Flight ID. Please refresh the page.',
						'mach'
					),
					'error'
				);
			} finally {
				if ( isMounted ) {
					setIsFetching( false );
				}
			}
		};

		fetchTestFlightId();

		return () => {
			isMounted = false;
		};
	}, [] );

	const handleRecreateId = async () => {
		setIsRecreating( true );
		createNotice( __( 'Recreating Test Flight ID…', 'mach' ), 'info' );

		try {
			const id = await recreateTestFlightId();
			setTestFlightId( id );
			createNotice(
				__( 'Test Flight ID recreated successfully.', 'mach' ),
				'success'
			);
		} catch {
			createNotice(
				__(
					'Failed to recreate Test Flight ID. Please try again.',
					'mach'
				),
				'error'
			);
		} finally {
			setIsRecreating( false );
		}
	};

	const handleCopyQueryParams = async () => {
		const queryParam = `?mach_test_flight=${ encodeURIComponent(
			testFlightId
		) }`;

		try {
			await navigator.clipboard.writeText( queryParam );
			createNotice(
				__( 'Query parameter copied to clipboard.', 'mach' ),
				'success'
			);
		} catch {
			createNotice(
				__(
					'Failed to copy query parameter. Please try again.',
					'mach'
				),
				'error'
			);
		}
	};

	return (
		<Card className="mt-6">
			<CardBody>
				<Flex direction="column" align="start" gap={ 1 }>
					<h2 className="text-gray-600 m-0">
						{ __( 'Test Flight ID', 'mach' ) }
					</h2>
					<p className="text-sm text-gray-500 m-0 mb-1">
						{ __(
							'Add this ID to your test URLs using the "mach_test_flight" query parameter to enable test flight optimizations.',
							'mach'
						) }
					</p>
					{ testFlightId && (
						<div className="bg-gray-100 p-3 rounded mb-2">
							<span>{ __( 'Example:', 'mach' ) } </span>
							<ExternalLink href={ testFlightUrl }>
								{ testFlightUrl }
							</ExternalLink>
						</div>
					) }
					<Flex justify="start" gap={ 4 }>
						<Tooltip text={ __( 'Click to copy', 'mach' ) }>
							<Button
								__next40pxDefaultSize
								variant="secondary"
								onClick={ handleCopyQueryParams }
								disabled={ ! testFlightId }
							>
								{ __( 'Copy Query Parameter', 'mach' ) }
							</Button>
						</Tooltip>
						<Button
							__next40pxDefaultSize
							variant="secondary"
							onClick={ handleRecreateId }
							isBusy={ isRecreating }
							disabled={ isRecreating || isFetching }
						>
							{ __( 'Recreate Test Flight ID', 'mach' ) }
						</Button>
					</Flex>
				</Flex>
			</CardBody>
		</Card>
	);
};
