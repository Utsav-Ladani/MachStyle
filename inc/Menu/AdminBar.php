<?php

declare( strict_types=1 );

namespace MachStyle\Menu;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit();

use MachStyle\Api\RuleSetStatus;
use MachStyle\Api\TestFlightId;
use MachStyle\Optimization;
use MachStyle\Traits\Singleton;
use WP_Admin_Bar;

/**
 * AdminBar class to handle admin bar menu.
 */
class AdminBar {

	use Singleton;

	/**
	 * Menu slug for the quick access link in the admin bar.
	 */
	const MENU_SLUG = 'mach-style-quick-access';

	/**
	 * Constructor for the AdminBar class.
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

		// Parent menu item for MachStyle.
		$admin_bar->add_menu(
			array(
				'id'    => self::MENU_SLUG,
				'title' => esc_html__( 'MachStyle', 'mach-style' ),
				'href'  => admin_url( 'options-general.php?page=mach-style-settings' ),
				'meta'  => array(
					'title' => esc_html__( 'MachStyle Quick Access Menu', 'mach-style' ),
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
				'title'  => esc_html__( 'Open in Test Flight', 'mach-style' ),
				'href'   => $test_flight_url,
				'meta'   => array(
					'title' => esc_html__( 'Open this page in Test Flight', 'mach-style' ),
				),
			)
		);
	}
}
