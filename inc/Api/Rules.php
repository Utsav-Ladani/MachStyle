<?php

declare(strict_types=1);

namespace Mach\Api;

use Mach\Traits\Singleton;

use WP_Error;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;

/**
 * Rules class to handle REST API endpoints for rules.
 */
class Rules {

	use Singleton;

	const ROUTE_NAMESPACE   = 'mach/v1';
	const ROUTE_RULES       = '/rules';
	const ROUTE_COPY_RULES  = '/rules/copy';
	const OPTION_KEY_PREFIX = 'mach_rule_';

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
												'type'  => array(
													'required' => true,
													'type' => 'string',
													'enum' => array( 'exact_url', 'starts_with', 'ends_with' ),
												),
												'value' => array(
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
												'type'  => array(
													'required' => true,
													'type' => 'string',
													'enum' => array( 'exact_url', 'starts_with', 'ends_with' ),
												),
												'value' => array(
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

		register_rest_route(
			self::ROUTE_NAMESPACE,
			self::ROUTE_COPY_RULES,
			array(
				array(
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'copy_rules' ),
					'permission_callback' => array( $this, 'permission_check' ),
					'args'                => array(
						'source_ruleset' => array(
							'required' => true,
							'type'     => 'string',
							'enum'     => array( 'live', 'test' ),
						),
						'target_ruleset' => array(
							'required' => true,
							'type'     => 'string',
							'enum'     => array( 'live', 'test' ),
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
	 * Get all data rules.
	 *
	 * @param WP_REST_Request $request The REST request object, which contains query parameters such as 'ruleset_type'.
	 *
	 * @return WP_REST_Response|WP_Error REST response containing all data rules or WP_Error on failure.
	 */
	public function get_all( WP_REST_Request $request ): WP_REST_Response|WP_Error {
		$ruleset_type = $request->get_param( 'ruleset_type' );

		$option_key = self::OPTION_KEY_PREFIX . $ruleset_type;

		$rules = get_option( $option_key, array() );

		return rest_ensure_response( $rules );
	}

	/**
	 * Add a new rule.
	 *
	 * @param WP_REST_Request $request The REST request object, which contains the new rule data and 'ruleset_type' parameter.
	 *
	 * @return WP_REST_Response|WP_Error REST response containing the added rule or WP_Error on failure.
	 */
	public function add( WP_REST_Request $request ): WP_REST_Response|WP_Error {
		$ruleset_type = $request->get_param( 'ruleset_type' );
		$rule         = $request->get_param( 'rule' );

		$option_key = self::OPTION_KEY_PREFIX . $ruleset_type;

		$rules = get_option( $option_key, array() );

		$new_rule = array(
			'id'           => sprintf( 'rule-%d-%d', time(), wp_rand( 10, 100 ) ),
			'condition'    => $rule['condition'],
			'styleHandles' => $rule['styleHandles'],
		);

		$rules[] = $new_rule;
		update_option( $option_key, $rules );

		return rest_ensure_response( $new_rule );
	}

	/**
	 * Update an existing rule.
	 *
	 * @param WP_REST_Request $request The REST request object, which contains the updated rule data and 'ruleset_type' parameter.
	 *
	 * @return WP_REST_Response|WP_Error REST response containing the updated rule or WP_Error on failure.
	 */
	public function update( WP_REST_Request $request ): WP_REST_Response|WP_Error {
		$ruleset_type = $request->get_param( 'ruleset_type' );
		$rule         = $request->get_param( 'rule' );

		$option_key = self::OPTION_KEY_PREFIX . $ruleset_type;

		$rules = get_option( $option_key, array() );

		$updated_rules = array();
		$updated_rule  = null;

		foreach ( $rules as $existing_rule ) {
			if ( $existing_rule['id'] === $rule['id'] ) {
				$updated_rule    = array(
					'id'           => $existing_rule['id'],
					'condition'    => $rule['condition'],
					'styleHandles' => $rule['styleHandles'],
				);
				$updated_rules[] = $updated_rule;
			} else {
				$updated_rules[] = $existing_rule;
			}
		}

		if ( ! $updated_rule ) {
			return new WP_Error( 'rule_not_found', 'Rule not found', array( 'status' => 404 ) );
		}

		update_option( $option_key, $updated_rules );

		return rest_ensure_response( $updated_rule );
	}

	/**
	 * Delete a rule.
	 *
	 * @param WP_REST_Request $request The REST request object, which contains the 'id' of the rule to delete and 'ruleset_type' parameter.
	 *
	 * @return WP_REST_Response|WP_Error REST response confirming deletion or WP_Error on failure.
	 */
	public function delete( WP_REST_Request $request ): WP_REST_Response|WP_Error {
		$ruleset_type = $request->get_param( 'ruleset_type' );
		$id           = $request->get_param( 'id' );

		$option_key = self::OPTION_KEY_PREFIX . $ruleset_type;

		$rules = get_option( $option_key, array() );

		$updated_rules = array();
		$deleted_rule  = null;

		foreach ( $rules as $existing_rule ) {
			if ( $existing_rule['id'] === $id ) {
				$deleted_rule = $existing_rule;
			} else {
				$updated_rules[] = $existing_rule;
			}
		}

		if ( ! $deleted_rule ) {
			return new WP_Error( 'rule_not_found', 'Rule not found', array( 'status' => 404 ) );
		}

		update_option( $option_key, $updated_rules );

		return rest_ensure_response( $id );
	}

	/**
	 * Copy all rules from a source ruleset and replace rules in a target ruleset.
	 *
	 * @param WP_REST_Request $request The REST request object containing source and target ruleset IDs.
	 *
	 * @return WP_REST_Response|WP_Error REST response containing the copied rules or WP_Error on failure.
	 */
	public function copy_rules( WP_REST_Request $request ): WP_REST_Response|WP_Error {
		$source_ruleset = $request->get_param( 'source_ruleset' );
		$target_ruleset = $request->get_param( 'target_ruleset' );

		if ( $source_ruleset === $target_ruleset ) {
			return new WP_Error( 'invalid_ruleset', 'Source and target rulesets must be different', array( 'status' => 400 ) );
		}

		$source_option_key = self::OPTION_KEY_PREFIX . $source_ruleset;
		$target_option_key = self::OPTION_KEY_PREFIX . $target_ruleset;

		$source_rules = get_option( $source_option_key, array() );

		update_option( $target_option_key, $source_rules );

		return rest_ensure_response( true );
	}
}
