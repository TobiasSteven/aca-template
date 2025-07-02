<?php
/**
 * Custom Navigation Walker for Desktop Menu
 *
 * @package Mon-Theme-ACA
 */

if (!class_exists('Mon_Theme_ACA_Nav_Walker')) {
    /**
     * Custom Navigation Walker for Desktop Menu
     */
    class Mon_Theme_ACA_Nav_Walker extends Walker_Nav_Menu
    {
        /**
         * Starts the element output.
         */
        public function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0)
        {
            $classes = empty($item->classes) ? array() : (array) $item->classes;

            // Add classes for styling
            $classes[] = 'menu-item-' . $item->ID;

            // Filter the CSS class to get WordPress default classes like current-menu-item
            $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args, $depth));

            // Check if the item is active
            $is_active = in_array('current-menu-item', $classes) || in_array('current_page_item', $classes);
            
            // Build the button class based on active state
            $button_class = 'px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ';
            $button_class .= $is_active 
                ? 'bg-[#2D9B8A] text-white' 
                : 'text-white hover:bg-[#A8E6CF] hover:text-[#1F6B5C]';

            // Build HTML
            $output .= '<button onclick="window.location.href=\'' . esc_url($item->url) . '\'"
                           class="' . $button_class . '">'
                . $item->title . '</button>';
        }
    }
}

if (!class_exists('Mon_Theme_ACA_Mobile_Nav_Walker')) {
    /**
     * Custom Navigation Walker for Mobile Menu
     */
    class Mon_Theme_ACA_Mobile_Nav_Walker extends Walker_Nav_Menu
    {
        /**
         * Starts the element output.
         */
        public function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0)
        {
            $classes = empty($item->classes) ? array() : (array) $item->classes;

            // Add classes for styling
            $classes[] = 'menu-item-' . $item->ID;

            // Filter the CSS class to get WordPress default classes like current-menu-item
            $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args, $depth));

            // Check if the item is active
            $is_active = in_array('current-menu-item', $classes) || in_array('current_page_item', $classes);
            
            // Build the button class based on active state
            $button_class = 'block w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ';
            $button_class .= $is_active 
                ? 'bg-[#2D9B8A] text-white' 
                : 'text-white hover:bg-[#A8E6CF] hover:text-[#1F6B5C]';

            // Build HTML
            $output .= '<button onclick="window.location.href=\'' . esc_url($item->url) . '\'"
                           class="' . $button_class . '">'
                . $item->title . '</button>';
        }
    }
}