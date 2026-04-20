# Mach - Speed Up Your Site with Smarter Style Loading

Mach helps your pages feel faster by loading critical styles first and delaying selected non-critical CSS.

You decide where this happens using simple rules. For many sites, this can improve Core Web Vitals.

## Screenshot

<img width="1278" height="758" alt="Mach Settings Screenshot" src="https://github.com/user-attachments/assets/914cd6f8-7869-49dd-bcbb-47d83fbda4e3" />

## Quick Start

1. Open Mach and go to Test Flight.
2. Add one rule for one page group (home page, a post type, or a URL pattern).
3. Add the style handles you want to defer.
4. Check the page on desktop and mobile.
5. If it looks good, keep it. If not, edit or remove the rule.
6. Run PageSpeed on the Test Flight URL and compare results with your live baseline.
7. When stable, copy rules to Live Settings and enable live optimization.

## Test With PageSpeed Before Going Live

1. Run PageSpeed on your normal live URL and save the baseline score.
2. Open the same page in Test Flight mode from the admin bar.
3. Run PageSpeed on that Test Flight URL.
4. Compare scores and metrics (especially LCP, INP, and CLS).
5. Keep only rules that improve speed without breaking layout.
6. Move final rules to Live Settings.

## What To Defer First

Start with styles that are useful but not needed immediately:

- footer styles
- slider and carousel styles
- form styles on pages that do not show forms right away
- social/share widget styles below the fold
- extra builder/block styles not needed at first paint

## What Not To Defer

Avoid deferring styles that control first-view layout:

- main theme layout styles
- header, menu, and hero section styles
- checkout/cart critical styles
- any style that causes layout jumps when delayed

## If Something Looks Wrong

1. Turn off the live toggle (instant rollback).
2. Check which rule was added last.
3. Remove or narrow that rule.
4. Retest in Test Flight.

## Why This Helps Core Web Vitals

- Faster first render can improve LCP.
- Smoother loading can reduce layout shifts (CLS).
- Cleaner early rendering can support better overall perceived speed.

Mach is best used in small steps: test, measure, then roll out.

## Author

- Name: Utsav Ladani
- WordPress.org: https://profile.wordpress.org/utsavladani
