<?php
/**
 * Plugin Name:       Mach
 * Description:       A plugin to optimize site performance by conditionally deferring the loading of CSS styles.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      8.1
 * Author:            utsavladani
 * Author URI:        https://profile.wordpress.org/utsavladani
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       mach
 *
 * @package Mach
 */

declare( strict_types=1 );

namespace Mach;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit();

if ( ! file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	return;
}

require_once __DIR__ . '/vendor/autoload.php';
