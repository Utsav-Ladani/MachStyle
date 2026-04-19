<?php

declare( strict_types=1 );

namespace Mach;

use Mach\Api\RuleSetStatus;
use Mach\Api\TestFlightId;
use Mach\Traits\Singleton;
use WP_Admin_Bar;

/**
 * AdminMenu class to handle admin menu.
 */
class AdminMenu {

	use Singleton;

	/**
	 * Menu slug for the quick access link in the admin bar.
	 */
	const MENU_SLUG = 'mach-quick-access';

	/**
	 * Constructor for the AdminMenu class.
	 */
	protected function __construct() {
		add_action( 'admin_bar_menu', array( $this, 'register_admin_bar_menu' ), 100 );
	}

	/**
	 * Register admin bar menu.
	 *
	 * @param WP_Admin_Bar $admin_bar The WP_Admin_Bar instance.
	 *
	 * @return void
	 */
	public function register_admin_bar_menu( WP_Admin_Bar $admin_bar ): void {
		global $wp;

		if ( is_admin() || ! current_user_can( 'manage_options' ) ) {
			return;
		}

		// Parent menu item for Mach.
		$admin_bar->add_menu(
			array(
				'id'    => self::MENU_SLUG,
				'title' => esc_html__( 'Mach', 'mach' ),
				'href'  => admin_url( 'options-general.php?page=mach-settings' ),
				'meta'  => array(
					'title' => esc_html__( 'Mach Quick Access Menu', 'mach' ),
				),
			)
		);

		// Submenu item to open the current page in Test Flight.
		$test_option_key        = RuleSetStatus::OPTION_KEY_PREFIX . 'test';
		$is_test_flight_enabled = get_option( $test_option_key, '0' ) === '1';

		if ( ! $is_test_flight_enabled ) {
			return;
		}

		$test_flight_id  = get_option( TestFlightId::OPTION_KEY );
		$test_flight_url = home_url(
			add_query_arg(
				array(
					Optimization::TEST_FLIGHT_QUERY_VAR_NAME => $test_flight_id,
				),
				$wp->request
			)
		);

		$admin_bar->add_menu(
			array(
				'id'     => self::MENU_SLUG . '-open',
				'parent' => self::MENU_SLUG,
				'title'  => esc_html__( 'Open in Test Flight', 'mach' ),
				'href'   => $test_flight_url,
				'meta'   => array(
					'title' => esc_html__( 'Open this page in Test Flight', 'mach' ),
				),
			)
		);
	}
}
