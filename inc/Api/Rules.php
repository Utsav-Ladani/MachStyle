<?php

declare(strict_types=1);

namespace Mach\Api;

use Mach\Traits\Singleton;

use WP_Error;
use WP_REST_Response;
use WP_REST_Server;

/**
 * Rules class to handle REST API endpoints for rules.
 */
class Rules {

	use Singleton;

	const ROUTE_NAMESPACE = 'mach/v1';
	const ROUTE_RULES     = '/rules';

	/**
	 * Constructor for the Rules class.
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
			self::ROUTE_RULES,
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_all' ),
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
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'add' ),
					'permission_callback' => array( $this, 'permission_check' ),
					'args'                => array(
						'ruleset_type' => array(
							'required' => true,
							'type'     => 'string',
							'enum'     => array( 'live', 'test' ),
						),
						'rule'         => array(
							'required'   => true,
							'type'       => 'object',
							'properties' => array(
								'condition' => array(
									'required'    => true,
									'type'        => 'object',
									'oneOf'       => array(
										array(
											'properties' => array(
												'type' => array(
													'required' => true,
													'type' => 'string',
													'enum' => array( 'global', 'home_page' ),
												),
											),
											'additionalProperties' => false,
										),
										array(
											'properties' => array(
												'type'     => array(
													'required' => true,
													'type' => 'string',
													'enum' => array( 'post_type_archive', 'post_type_single' ),
												),
												'postType' => array(
													'required' => true,
													'type' => 'string',
													'enum' => array_keys(
														get_post_types(
															array( 'public' => true )
														)
													),
												),
											),
											'additionalProperties' => false,
										),
										array(
											'properties' => array(
												'type'     => array(
													'required' => true,
													'type' => 'string',
													'enum' => array( 'exact_url', 'starts_with', 'ends_with' ),
												),
												'postType' => array(
													'required' => true,
													'type' => 'string',
													'pattern' => '^[a-zA-Z0-9/_-]+$',
												),
											),
											'additionalProperties' => false,
										),
									),
									'styleHandle' => array(
										'required' => true,
										'type'     => 'array',
										'items'    => array(
											'type'    => 'string',
											'pattern' => '^[a-zA-Z0-9_-]+$',
										),
									),
								),
							),
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
						'rule'         => array(
							'required'   => true,
							'type'       => 'object',
							'properties' => array(
								'id'        => array(
									'required' => true,
									'type'     => 'string',
									'pattern'  => '^[a-zA-Z0-9_-]+$',
								),
								'condition' => array(
									'required'    => true,
									'type'        => 'object',
									'oneOf'       => array(
										array(
											'properties' => array(
												'type' => array(
													'required' => true,
													'type' => 'string',
													'enum' => array( 'global', 'home_page' ),
												),
											),
											'additionalProperties' => false,
										),
										array(
											'properties' => array(
												'type'     => array(
													'required' => true,
													'type' => 'string',
													'enum' => array( 'post_type_archive', 'post_type_single' ),
												),
												'postType' => array(
													'required' => true,
													'type' => 'string',
													'enum' => array_keys(
														get_post_types(
															array( 'public' => true )
														)
													),
												),
											),
											'additionalProperties' => false,
										),
										array(
											'properties' => array(
												'type'     => array(
													'required' => true,
													'type' => 'string',
													'enum' => array( 'exact_url', 'starts_with', 'ends_with' ),
												),
												'postType' => array(
													'required' => true,
													'type' => 'string',
													'pattern' => '^[a-zA-Z0-9/_-]+$',
												),
											),
											'additionalProperties' => false,
										),
									),
									'styleHandle' => array(
										'required' => true,
										'type'     => 'array',
										'items'    => array(
											'type'    => 'string',
											'pattern' => '^[a-zA-Z0-9_-]+$',
										),
									),
								),
							),
						),
					),
				),
				array(
					'methods'             => WP_REST_Server::DELETABLE,
					'callback'            => array( $this, 'delete' ),
					'permission_callback' => array( $this, 'permission_check' ),
					'args'                => array(
						'ruleset_type' => array(
							'required' => true,
							'type'     => 'string',
							'enum'     => array( 'live', 'test' ),
						),
						'id'           => array(
							'required' => true,
							'type'     => 'string',
							'pattern'  => '^[a-zA-Z0-9_-]+$',
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
	 * Get all data sources.
	 *
	 * @return WP_REST_Response|WP_Error REST response containing all data sources or WP_Error on failure.
	 */
	public function get_all(): WP_REST_Response|WP_Error {
		return rest_ensure_response(
			array(
				array(
					'id'           => 'rule-1',
					'condition'    => array(
						'type' => 'home_page',
					),
					'styleHandles' => array( 'handle-1', 'handle-2' ),
				),
			) 
		);
	}

	/**
	 * Add a new rule.
	 *
	 * @return WP_REST_Response|WP_Error REST response containing the added rule or WP_Error on failure.
	 */
	public function add(): WP_REST_Response|WP_Error {
		return rest_ensure_response(
			array(
				'id'           => 'rule-2',
				'condition'    => array(
					'type' => 'home_page',
				),
				'styleHandles' => array( 'handle-111', 'handle-233' ),
			) 
		);
	}

	/**
	 * Update an existing rule.
	 *
	 * @return WP_REST_Response|WP_Error REST response containing the updated rule or WP_Error on failure.
	 */
	public function update(): WP_REST_Response|WP_Error {
		return rest_ensure_response(
			array(
				'id'           => 'rule-1',
				'condition'    => array(
					'type'  => 'exact_url',
					'value' => 'specific-page',
				),
				'styleHandles' => array( 'handle-1', 'handle-2', 'handle-3' ),
			) 
		);
	}

	/**
	 * Delete a rule.
	 *
	 * @return WP_REST_Response|WP_Error REST response confirming deletion or WP_Error on failure.
	 */
	public function delete(): WP_REST_Response|WP_Error {
		return rest_ensure_response( 'rule-1' );
	}
}
