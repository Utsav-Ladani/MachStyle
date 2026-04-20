<?php

declare( strict_types=1 );

namespace MachStyle\Menu;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit();

use MachStyle\Traits\Singleton;

use const MachStyle\BUILD_DIR;

/**
 * Settings class to handle admin settings menu.
 */
class Settings {

	use Singleton;

	/**
	 * Constructor for the Settings class.
	 */
	protected function __construct() {
		add_action( 'admin_menu', array( $this, 'register_admin_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_assets' ) );
	}

	/**
	 * Register admin menu.
	 */
	public function register_admin_menu(): void {
		add_submenu_page(
			'options-general.php',
			esc_html__( 'MachStyle Settings', 'mach-style' ),
			esc_html__( 'MachStyle', 'mach-style' ),
			'manage_options',
			'mach-style-settings',
			array( $this, 'render_settings' ),
		);
	}

	/**
	 * Render settings page.
	 */
	public function render_settings(): void {
		?>
			<div id="mach-style-settings-root" class="mach-style-tailwind">
				<?php esc_html_e( 'Loading...', 'mach-style' ); ?>
				<noscript>
					<?php esc_html_e( 'JavaScript is required to view this page.', 'mach-style' ); ?>
				</noscript>
			</div>
		<?php
	}

	/**
	 * Enqueue admin assets.
	 *
	 * @param string $admin_page The current page slug.
	 */
	public function enqueue_admin_assets( string $admin_page ): void {
		if ( 'settings_page_mach-style-settings' !== $admin_page ) {
			return;
		}

		$assets_file = include BUILD_DIR . 'settings.asset.php';

		wp_enqueue_script(
			'mach-style-settings-script',
			plugins_url( 'build/settings.js', BUILD_DIR ),
			$assets_file['dependencies'],
			$assets_file['version'],
			true
		);

		wp_localize_script(
			'mach-style-settings-script',
			'MACH_STYLE_SETTINGS_DATA',
			array(
				'availablePostTypes' => array_keys( get_post_types( array( 'public' => true ), 'names' ) ),
				'siteUrl'            => home_url( '/' ),
			)
		);

		wp_enqueue_style(
			'mach-style-settings-style',
			plugins_url( 'build/settings.css', BUILD_DIR ),
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
}
