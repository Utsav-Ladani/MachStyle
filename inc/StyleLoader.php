<?php

declare( strict_types=1 );

namespace Mach;

use Mach\Traits\Singleton;

/**
 * StyleLoader class to initialize the plugin.
 */
class StyleLoader {

	use Singleton;

	/**
	 * Constructor for the StyleLoader class.
	 */
	protected function __construct() {
		add_filter( 'style_loader_tag', array( $this, 'handle_style_tag' ), 20, 2 );
	}

	/**
	 * Handle style loading optimization.
	 *
	 * @param string $tag The style tag.
	 * @param string $handle The style handle.
	 *
	 * @return string Modified style tag.
	 */
	public function handle_style_tag( $tag, $handle ) {
		$deferred_styles = Optimization::get_instance()->get_deferred_styles();

		if (
			empty( $deferred_styles ) ||
			! in_array( $handle, $deferred_styles, true ) ||
			strpos( $tag, "rel='stylesheet'" ) === false
		) {
			return $tag;
		}

		$noscript_tag = sprintf(
			'<noscript>%s</noscript>',
			$tag
		);

		$tag = str_replace(
			"rel='stylesheet'",
			"rel='stylesheet' media='print' onload='this.onload=null;this.media=\"all\"'",
			$tag
		);

		return $tag . $noscript_tag;
	}
}
