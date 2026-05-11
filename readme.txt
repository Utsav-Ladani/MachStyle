=== MachStyle ===

Contributors: utsavladani
Requires at least: 6.5
Requires PHP: 8.1
Tested up to: 6.9
Stable tag: 1.1.1
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Tags: performance, optimization, css, stylesheets, core web vitals
Donate link: https://github.com/Utsav-Ladani/MachStyle

MachStyle helps your pages feel faster by loading critical styles first and delaying selected non-critical CSS.

== Description ==

MachStyle helps your pages feel faster by loading critical styles first and delaying selected non-critical CSS.

You decide where this happens using simple rules. For many sites, this can help improve Core Web Vitals.

MachStyle is designed for practical, low-risk testing:

* Create rules for specific page groups, post types, or URL patterns.
* Test changes safely in Test Flight before they affect real visitors.
* Compare results in performance tools like PageSpeed Insights before going live.
* Copy tested rules to live settings when ready.

Small, measured changes work best. Test, compare, then roll out.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/mach-style` directory, or install the plugin through the WordPress plugins screen.
2. Activate the plugin through the `Plugins` screen in WordPress.

== How to Use ==

1. Open MachStyle and go to `Test Flight`.
2. Add one rule for one page group, such as the home page, a post type, or a URL pattern.
3. Add the style handles you want to defer. Use the Audit Panel to find style handles.
4. Check the page on desktop and mobile.
5. Run PageSpeed on the Test Flight URL and compare the result with your normal live URL.
6. If the page looks correct and the metrics improve, copy the rules to `Live Settings`.
7. Enable live optimization.

== How to Use Audit Panel ==

Audit Panel is a tool that helps you find style handles to defer.

1. Open the frontend of your website and open Audit Panel from MachStyle menu in admin bar.
2. Click on any stylesheet to temporarily remove its styling. This shows you what the page looks like for a fraction of second during load.
3. Look at the top of your site. If it still looks readable and organized without that style, it's a great candidate to stay deferred.
4. If the page looks messy or the header breaks, that style is important for the first impression. Click it again to turn it back on.
5. Once finished, click **Copy Handles** button to get your optimized list and add it to your MachStyle settings.

== What to Defer First ==

Start with styles that are useful but not needed immediately:

* Footer styles
* Slider and carousel styles
* Form styles on pages that do not show forms right away
* Social share or widget styles below the fold
* Extra builder or block styles not needed at first paint

== What Not to Defer ==

Avoid deferring styles that control first-view layout:

* Main theme layout styles
* Header, menu, and hero section styles
* Checkout and cart critical styles
* Any style that causes visible layout shifts when delayed

== Development & Contribution ==

MachStyle is open source and welcomes contributions!

* **GitHub Repository**: https://github.com/Utsav-Ladani/MachStyle
* **Report Issues**: https://github.com/Utsav-Ladani/MachStyle/issues
* **Feature Requests**: https://github.com/Utsav-Ladani/MachStyle/issues
* **Contribute Code**: Fork the repository and submit pull requests

== Screenshots ==

1. MachStyle Live Settings page
2. MachStyle Test Flight page
3. Audit Panel

== FAQ ==

= What is Test Flight? =

Test Flight is a safe testing mode. It lets you preview optimization rules without affecting real visitors.

= Can I use PageSpeed Insights before going live? =

Yes. A good workflow is to record a baseline score on the normal page, then run the same test against the Test Flight URL and compare metrics like LCP, INP, and CLS.

= What happens if something looks wrong? =

Turn off live optimization, remove or narrow the last rule you added, and retest in Test Flight.

= Does MachStyle remove CSS? =

No. It changes when selected styles load on matching pages. The goal is to keep important styles available first and delay less-critical styles.

== Changelog ==

= 1.1.1 =

* Minor bug fixes.

= 1.1.0 =

* Added Audit Panel. It helps you find style handles to defer.

= 1.0.0 =

* Initial release.
* Added conditional CSS defer rules for selected page conditions.
* Added separate Live Settings and Test Flight modes.
* Added Test Flight ID tools and admin bar quick access.
* Added rule copy workflow from test to live.

== Upgrade Notice ==

= 1.1.1 =

* Minor bug fixes.

= 1.1.0 =

* Added Audit Panel. It helps you find style handles to defer.

= 1.0.0 =

Initial release of MachStyle.
