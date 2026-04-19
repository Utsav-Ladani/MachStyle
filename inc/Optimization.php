<?php

declare( strict_types=1 );

namespace Mach;

use Mach\Api\Rules;
use Mach\Api\RuleSetStatus;
use Mach\Api\TestFlightId;
use Mach\Traits\Singleton;

/**
 * Optimization class to handle style loading optimization.
 */
class Optimization {

	use Singleton;

	/**
	 * Query variable name for test flight.
	 */
	const TEST_FLIGHT_QUERY_VAR_NAME = 'mach_test_flight';

	/**
	 * Array to hold deferred styles.
	 *
	 * @var array
	 */
	private $defered_styles = array();

	/**
	 * Constructor for the Optimization class.
	 */
	protected function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'prefill_deferred_styles' ) );
		add_filter( 'query_vars', array( $this, 'add_query_vars' ) );
	}

	/**
	 * Get deferred styles.
	 *
	 * @return array Array of deferred style handles.
	 */
	public function get_deferred_styles(): array {
		return $this->defered_styles;
	}

	/**
	 * Prefill deferred styles.
	 */
	public function prefill_deferred_styles(): void {
		if ( is_admin() ) {
			return;
		}

		$rules = array();

		if ( $this->should_optimize_for_test_flight() ) {
			$rules = $this->get_test_flight_deferred_styles();
		} elseif ( $this->should_optimize_for_live_site() ) {
			$rules = $this->get_live_site_deferred_styles();
		}

		$this->defered_styles = $this->get_deferred_styles_from_rules( $rules );
	}

	/**
	 * Determine if optimization should be applied for live site.
	 *
	 * @return bool True if optimization should be applied for live site, false otherwise.
	 */
	private function should_optimize_for_live_site(): bool {
		$live_option_key = RuleSetStatus::OPTION_KEY_PREFIX . 'live';
		return get_option( $live_option_key, '0' ) === '1';
	}

	/**
	 * Determine if optimization should be applied for test flight.
	 *
	 * @return bool True if optimization should be applied for test flight, false otherwise.
	 */
	private function should_optimize_for_test_flight(): bool {
		$test_option_key = RuleSetStatus::OPTION_KEY_PREFIX . 'test';
		$is_enabled      = get_option( $test_option_key, '0' ) === '1';

		if ( ! $is_enabled ) {
			return false;
		}

		$test_flight_id_from_query = get_query_var( self::TEST_FLIGHT_QUERY_VAR_NAME, '' );
		$test_flight_id_from_db    = get_option( TestFlightId::OPTION_KEY, '' );

		return (
			! empty( $test_flight_id_from_db ) &&
			! empty( $test_flight_id_from_query ) &&
			$test_flight_id_from_query === $test_flight_id_from_db
		);
	}

	/**
	 * Get deferred styles for live site.
	 *
	 * @return array Array of deferred style handles for live site.
	 */
	private function get_live_site_deferred_styles(): array {
		return get_option( Rules::OPTION_KEY_PREFIX . 'live', array() );
	}

	/**
	 * Get deferred styles for test flight.
	 *
	 * @return array Array of deferred style handles for test flight.
	 */
	private function get_test_flight_deferred_styles(): array {
		return get_option( Rules::OPTION_KEY_PREFIX . 'test', array() );
	}

	/**
	 * Add query variables for test flight.
	 *
	 * @param array $query_vars Array of existing query variables.
	 *
	 * @return array Modified array of query variables.
	 */
	public function add_query_vars( $query_vars ) {
		$query_vars[] = self::TEST_FLIGHT_QUERY_VAR_NAME;

		return $query_vars;
	}

	/**
	 * Extract deferred style handles from rules.
	 *
	 * @param array $rules Array of rules.
	 *
	 * @return array Array of deferred style handles.
	 */
	private function get_deferred_styles_from_rules( array $rules ): array {
		global $wp;
		$request_uri = isset( $wp->request ) ? $wp->request : '';

		$applied_rules = array();

		foreach ( $rules as $rule ) {
			switch ( $rule['condition']['type'] ) {
				case 'global':
					$applied_rules[] = $rule;
					break;
				case 'home_page':
					if ( is_home() ) {
						$applied_rules[] = $rule;
					}
					break;
				case 'post_type_archive':
					if ( is_post_type_archive( $rule['condition']['postType'] ) ) {
						$applied_rules[] = $rule;
					}
					break;
				case 'post_type_single':
					if ( is_singular( $rule['condition']['postType'] ) ) {
						$applied_rules[] = $rule;
					}
					break;
				case 'exact_url':
					if ( untrailingslashit( $rule['condition']['value'] ) === $request_uri ) {
						$applied_rules[] = $rule;
					}
					break;
				case 'starts_with':
					if ( strpos( $request_uri, untrailingslashit( $rule['condition']['value'] ) ) === 0 ) {
						$applied_rules[] = $rule;
					}
					break;
				case 'ends_with':
					if ( strrpos( $request_uri, untrailingslashit( $rule['condition']['value'] ) ) === strlen( $request_uri ) - strlen( untrailingslashit( $rule['condition']['value'] ) ) ) {
						$applied_rules[] = $rule;
					}
					break;
				default:
					// Unknown rule type, skip.
			}
		}

		$deferred_styles = array();

		foreach ( $applied_rules as $rule ) {
			if ( isset( $rule['styleHandles'] ) && is_array( $rule['styleHandles'] ) ) {
				$deferred_styles = array_merge( $deferred_styles, $rule['styleHandles'] );
			}
		}

		return array_values( array_unique( $deferred_styles ) );
	}
}
