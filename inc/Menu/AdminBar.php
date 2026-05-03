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

use const MachStyle\BUILD_DIR;

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
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_audit_panel_assets' ) );
		add_action( 'wp_footer', array( $this, 'add_audit_panel_root' ) );
	}

	/**
	 * Check if the current user can access the menu.
	 *
	 * @return bool
	 */
	private function can_access_menu(): bool {
		return ! is_admin() && current_user_can( 'manage_options' );
	}

	/**
	 * Register admin bar menu.
	 *
	 * @param WP_Admin_Bar $admin_bar The WP_Admin_Bar instance.
	 *
	 * @return void
	 */
	public function register_admin_bar_menu( WP_Admin_Bar $admin_bar ): void {
		if ( ! $this->can_access_menu() ) {
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

		$this->add_test_flight_submenu( $admin_bar );
		$this->add_audit_panel_submenu( $admin_bar );
	}

	/**
	 * Add test flight open submenu.
	 *
	 * @param WP_Admin_Bar $admin_bar The WP_Admin_Bar instance.
	 *
	 * @return void
	 */
	private function add_test_flight_submenu( WP_Admin_Bar $admin_bar ): void {
		global $wp;

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

	/**
	 * Add audit panel submenu.
	 *
	 * @param WP_Admin_Bar $admin_bar The WP_Admin_Bar instance.
	 *
	 * @return void
	 */
	private function add_audit_panel_submenu( WP_Admin_Bar $admin_bar ): void {
		$admin_bar->add_menu(
			array(
				'id'     => self::MENU_SLUG . '-audit-panel',
				'parent' => self::MENU_SLUG,
				'title'  => esc_html__( 'Open Audit Panel', 'mach-style' ),
				'meta'   => array(
					'title' => esc_html__( 'Open Audit Panel', 'mach-style' ),
				),
			)
		);
	}

	/**
	 * Enqueue audit panel assets.
	 *
	 * @return void
	 */
	public function enqueue_audit_panel_assets(): void {
		if ( ! $this->can_access_menu() ) {
			return;
		}

		$assets_file = include BUILD_DIR . 'audit-panel.asset.php';

		wp_enqueue_script(
			'mach-style-audit-panel-script',
			plugins_url( 'build/audit-panel.js', BUILD_DIR ),
			$assets_file['dependencies'],
			$assets_file['version'],
			true
		);

		wp_enqueue_style(
			'mach-style-audit-panel-style',
			plugins_url( 'build/audit-panel.css', BUILD_DIR ),
			array(),
			$assets_file['version']
		);

		// Enqueue runtime script in debug mode only.
		if ( ! defined( 'SCRIPT_DEBUG' ) || ! SCRIPT_DEBUG ) {
			return;
		}

		$runtime_file = include BUILD_DIR . 'runtime.asset.php';

		if ( ! $runtime_file ) {
			return;
		}

		wp_enqueue_script(
			'mach-style-runtime-script',
			plugins_url( 'build/runtime.js', BUILD_DIR ),
			$runtime_file['dependencies'],
			$runtime_file['version'],
			true
		);
	}

	/**
	 * Add audit panel root.
	 *
	 * @return void
	 */
	public function add_audit_panel_root(): void {
		if ( ! $this->can_access_menu() ) {
			return;
		}

		?>
		<div id="mach-style-audit-panel-root" class="mach-style-tailwind"></div>
		<?php
	}
}
