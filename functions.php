<?php

/**
 * Functions and definitions
 *
 * @package Mon-Theme-ACA
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Include theme parts
 */
require_once get_template_directory() . '/functions-parts/constants.php';
require_once MON_THEME_ACA_DIR . '/functions-parts/theme-setup.php';
require_once MON_THEME_ACA_DIR . '/functions-parts/widgets.php';
require_once MON_THEME_ACA_DIR . '/functions-parts/enqueue.php';
require_once MON_THEME_ACA_DIR . '/functions-parts/menu-filters.php';
require_once MON_THEME_ACA_DIR . '/functions-parts/events.php';
require_once MON_THEME_ACA_DIR . '/functions-parts/blocks.php';
require_once MON_THEME_ACA_DIR . '/functions-parts/theme-includes.php';
require_once MON_THEME_ACA_DIR . '/inc/class-mon-theme-aca-nav-walker.php';

/**
 * Ensure threaded comments are enabled
 */
function mon_theme_aca_enable_threaded_comments()
{
    if (!get_option('thread_comments')) {
        update_option('thread_comments', 1);
    }

    // Set maximum comment depth to 5 if not already set
    if (get_option('thread_comments_depth') < 3) {
        update_option('thread_comments_depth', 5);
    }
}
add_action('after_setup_theme', 'mon_theme_aca_enable_threaded_comments');

/**
 * Add custom CSS for button hover styles
 */
function mon_theme_aca_button_hover_styles() {
    ?>
<style>
/* Button hover styles */
button:hover,
button:hover,
input[type="button"]:hover,
input[type="reset"]:hover,
input[type="submit"]:hover {
    background-color: #2D9B8A !important;
    color: white !important;
}

/* Form buttons */
.btn:hover,
.button:hover,
.wp-block-button__link:hover,
.wp-element-button:hover {
    background-color: #2D9B8A !important;
    color: white !important;
}

/* Special buttons that need to maintain white text */
.bg-[#28A745]:hover,
.member-button:hover,
button.bg-[#28A745]:hover,
.btn-success:hover,
.btn-primary:hover {
    background-color: #1F6B5C !important;
    color: white !important;
}
</style>
<?php
}
add_action('wp_head', 'mon_theme_aca_button_hover_styles', 101);