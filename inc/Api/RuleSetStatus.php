<?php

declare(strict_types=1);

namespace MachStyle\Api;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit();

use MachStyle\Traits\Singleton;

use WP_Error;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;

/**
 * RuleSetStatus class to handle REST API endpoints for ruleset status.
 */
class RuleSetStatus {

	use Singleton;

	const ROUTE_NAMESPACE      = 'mach-style/v1';
	const ROUTE_RULESET_STATUS = '/ruleset-status';
	const OPTION_KEY_PREFIX    = 'mach_style_ruleset_status_';

	/**
	 * Constructor for the RuleSetStatus class.
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
			self::ROUTE_RULESET_STATUS,
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get' ),
					'permission_callback' => array( $this, 'permission_check' ),
					'args'                => array(
						'ruleset_type' => array(
							'required' => true,
							'type'     => 'string',
							'enum'     => array( 'live', 'test' ),
						),
					),
				),
				array(
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update' ),
					'permission_callback' => array( $this, 'permission_check' ),
					'args'                => array(
						'ruleset_type' => array(
							'required' => true,
							'type'     => 'string',
							'enum'     => array( 'live', 'test' ),
						),
						'enabled'      => array(
							'required' => true,
							'type'     => 'boolean',
						),
					),
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
	 * Get the status of the ruleset.
	 *
	 * @param WP_REST_Request $request The REST request object.
	 *
	 * @return WP_REST_Response|WP_Error REST response containing the ruleset status or WP_Error on failure.
	 */
	public function get( WP_REST_Request $request ): WP_REST_Response|WP_Error {
		$ruleset_type = $request->get_param( 'ruleset_type' );

		$option_key = self::OPTION_KEY_PREFIX . $ruleset_type;

		$status = get_option( $option_key, false );

		return rest_ensure_response( $status );
	}

	/**
	 * Update the status of the ruleset.
	 *
	 * @param WP_REST_Request $request The REST request object containing the 'ruleset_type' and 'enabled' parameters.
	 *
	 * @return WP_REST_Response|WP_Error REST response indicating success or failure.
	 */
	public function update( WP_REST_Request $request ): WP_REST_Response|WP_Error {
		$ruleset_type = $request->get_param( 'ruleset_type' );
		$enabled      = $request->get_param( 'enabled' );

		$option_key = self::OPTION_KEY_PREFIX . $ruleset_type;

		update_option( $option_key, $enabled );

		return rest_ensure_response( $enabled );
	}
}
