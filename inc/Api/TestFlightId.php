<?php

declare(strict_types=1);

namespace Mach\Api;

use Mach\Traits\Singleton;

use WP_Error;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;

/**
 * TestFlightId class to handle REST API endpoints for test flight IDs.
 */
class TestFlightId {

	use Singleton;

	const ROUTE_NAMESPACE      = 'mach/v1';
	const ROUTE_TEST_FLIGHT_ID = '/test-flight-id';
	const OPTION_KEY           = 'mach_test_flight_id';

	/**
	 * Constructor for the TestFlightId class.
	 */
	protected function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Register REST API routes.
	 */
	public function register_routes(): void {
		register_rest_route(
			self::ROUTE_NAMESPACE,
			self::ROUTE_TEST_FLIGHT_ID,
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get' ),
					'permission_callback' => array( $this, 'permission_check' ),
				),
				array(
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'recreate' ),
					'permission_callback' => array( $this, 'permission_check' ),
				),
			),
		);
	}

	/**
	 * Permission check for REST API endpoints.
	 *
	 * @return bool True if the user has permission, false otherwise.
	 */
	public function permission_check(): bool {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Get the status of the test flight ID.
	 *
	 * @return WP_REST_Response|WP_Error REST response containing the test flight ID or WP_Error on failure.
	 */
	public function get(): WP_REST_Response|WP_Error {
		$status = get_option( self::OPTION_KEY, '' );

		return rest_ensure_response( $status );
	}

	/**
	 * Recreate the test flight ID.
	 *
	 * @return WP_REST_Response|WP_Error REST response indicating success or failure.
	 */
	public function recreate(): WP_REST_Response|WP_Error {
		$new_id = 'MACH-TF-' . wp_generate_password( 9, false, false );

		update_option( self::OPTION_KEY, $new_id );

		return rest_ensure_response( $new_id );
	}
}
