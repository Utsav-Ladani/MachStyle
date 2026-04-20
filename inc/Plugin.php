<?php

declare( strict_types=1 );

namespace MachStyle;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit();

use MachStyle\Traits\Singleton;
use MachStyle\Api\Rules;
use MachStyle\Api\RuleSetStatus;
use MachStyle\Api\TestFlightId;
use MachStyle\Menu\AdminBar;
use MachStyle\Menu\Settings;

/**
 * Plugin class to initialize the plugin.
 */
class Plugin {

	use Singleton;

	/**
	 * Constructor for the Plugin class.
	 */
	protected function __construct() {
		AdminBar::get_instance();
		Settings::get_instance();
		Rules::get_instance();
		RuleSetStatus::get_instance();
		TestFlightId::get_instance();
		Optimization::get_instance();
		StyleLoader::get_instance();
	}
}
