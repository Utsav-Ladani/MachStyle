<?php

declare( strict_types=1 );

namespace Mach;

use Mach\Traits\Singleton;
use Mach\Api\Rules;
use Mach\Api\RuleSetStatus;

/**
 * Plugin class to initialize the plugin.
 */
class Plugin {

	use Singleton;

	/**
	 * Constructor for the Plugin class.
	 */
	protected function __construct() {
		Menu::get_instance();
		Rules::get_instance();
		RuleSetStatus::get_instance();
	}
}
