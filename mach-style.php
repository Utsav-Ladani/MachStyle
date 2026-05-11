<?php
/**
 * Plugin Name:       MachStyle
 * Description:       Speed Up Your Site with Smarter Style Loading.
 * Version:           1.1.1
 * Requires at least: 6.5
 * Requires PHP:      8.1
 * Author:            utsavladani
 * Author URI:        https://profile.wordpress.org/utsavladani
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       mach-style
 *
 * @package MachStyle
 */

declare( strict_types=1 );

namespace MachStyle;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit();

use MachStyle\Api\TestFlightId;

const BUILD_DIR = __DIR__ . '/build/';

if ( ! file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	return;
}

require_once __DIR__ . '/vendor/autoload.php';

Plugin::get_instance();

/**
 * Activation hook to set up the test flight ID.
 */
function activate_mach() {
	TestFlightId::setup_test_flight_id();
}
register_activation_hook( __FILE__, __NAMESPACE__ . '\activate_mach' );
