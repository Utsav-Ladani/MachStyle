import { Button, Card, CardBody, Flex } from '@wordpress/components';
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
						'mach-style'
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
		createNotice(
			__( 'Recreating Test Flight ID…', 'mach-style' ),
			'info'
		);

		try {
			const id = await recreateTestFlightId();
			setTestFlightId( id );
			createNotice(
				__( 'Test Flight ID recreated successfully.', 'mach-style' ),
				'success'
			);
		} catch {
			createNotice(
				__(
					'Failed to recreate Test Flight ID. Please try again.',
					'mach-style'
				),
				'error'
			);
		} finally {
			setIsRecreating( false );
		}
	};

	const handleCopyQueryParams = async () => {
		try {
			await navigator.clipboard.writeText( testFlightId );
			createNotice(
				__( 'Test Flight ID copied to clipboard.', 'mach-style' ),
				'success'
			);
		} catch {
			createNotice(
				__(
					'Failed to copy Test Flight ID. Please try again.',
					'mach-style'
				),
				'error'
			);
		}
	};

	return (
		<Card className="mt-6">
			<CardBody>
				<Flex direction="column" align="start" gap={ 1 }>
					<h2 className="text-gray-600 m-0 mb-1">
						{ __( 'Test Flight ID', 'mach-style' ) }
					</h2>
					<p className="text-sm text-gray-500 m-0 mb-2">
						{ __(
							'Use the MachStyle Quick Access menu in the Admin Bar on any page to open that page in Test Flight instantly.',
							'mach-style'
						) }
					</p>
					<Flex justify="start" gap={ 4 }>
						{ testFlightUrl && (
							<Button
								__next40pxDefaultSize
								variant="secondary"
								href={ testFlightUrl }
								target="_blank"
								disabled={ ! testFlightId }
							>
								{ __( 'Open Test Flight URL', 'mach-style' ) }
							</Button>
						) }
						<Button
							__next40pxDefaultSize
							variant="secondary"
							onClick={ handleCopyQueryParams }
							disabled={ ! testFlightId }
						>
							{ __( 'Copy Test Flight ID', 'mach-style' ) }
						</Button>
						<Button
							__next40pxDefaultSize
							variant="secondary"
							onClick={ handleRecreateId }
							isBusy={ isRecreating }
							disabled={ isRecreating || isFetching }
						>
							{ __( 'Recreate Test Flight ID', 'mach-style' ) }
						</Button>
					</Flex>
				</Flex>
			</CardBody>
		</Card>
	);
};
