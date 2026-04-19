<?php

declare( strict_types=1 );

namespace Mach;

use Mach\Traits\Singleton;

/**
 * Menu class to handle admin menu.
 */
class Menu {

	use Singleton;

	/**
	 * Constructor for the Menu class.
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
			esc_html__( 'Mach Settings', 'mach' ),
			esc_html__( 'Mach Settings', 'mach' ),
			'manage_options',
			'mach-settings',
			array( $this, 'render_settings' ),
		);
	}

	/**
	 * Render settings page.
	 */
	public function render_settings(): void {
		?>
			<div id="mach-settings-root" class="mach-tailwind">
				<?php esc_html_e( 'Loading...', 'mach' ); ?>
				<noscript>
					<?php esc_html_e( 'JavaScript is required to view this page.', 'mach' ); ?>
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
		if ( 'settings_page_mach-settings' !== $admin_page ) {
			return;
		}

		$assets_file = include BUILD_DIR . 'settings.asset.php';

		wp_enqueue_script(
			'mach-settings-script',
			plugins_url( 'build/settings.js', BUILD_DIR ),
			$assets_file['dependencies'],
			$assets_file['version'],
			true
		);

		wp_localize_script(
			'mach-settings-script',
			'MACH_SETTINGS_DATA',
			array(
				'availablePostTypes' => array_keys( get_post_types( array( 'public' => true ), 'names' ) ),
				'siteUrl'            => home_url( '/' ),
			)
		);

		wp_enqueue_style(
			'mach-settings-style',
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
			'mach-runtime-script',
			plugins_url( 'build/runtime.js', BUILD_DIR ),
			$runtime_file['dependencies'],
			$runtime_file['version'],
			true
		);
	}
}
