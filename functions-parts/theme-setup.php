<?php

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function mon_theme_aca_setup()
{
    /*
     * Make theme available for translation.
     */
    load_theme_textdomain('mon-theme-aca', MON_THEME_ACA_DIR . '/languages');

    // Add default posts and comments RSS feed links to head.
    add_theme_support('automatic-feed-links');

    /*
     * Let WordPress manage the document title.
     */
    add_theme_support('title-tag');

    /*
     * Enable support for Post Thumbnails on posts and pages.
     */
    add_theme_support('post-thumbnails');

    // Set default thumbnail size
    set_post_thumbnail_size(1200, 9999);

    // Register navigation menus
    register_nav_menus(
        array(
            'primary'            => esc_html__('Menu principal', 'mon-theme-aca'),
            'footer'             => esc_html__('Menu pied de page', 'mon-theme-aca'),
            'footer_quick_links' => esc_html__('Liens Rapides du Pied de Page', 'mon-theme-aca'),
        )
    );

    /*
     * Switch default core markup to output valid HTML5.
     */
    add_theme_support(
        'html5',
        array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
            'style',
            'script',
        )
    );

    // Add theme support for selective refresh for widgets.
    add_theme_support('customize-selective-refresh-widgets');

    // Add support for Block Styles.
    add_theme_support('wp-block-styles');

    // Add support for full and wide alignment.
    add_theme_support('align-wide');

    // Add support for editor styles.
    add_theme_support('editor-styles');

    // Add support for responsive embedded content.
    add_theme_support('responsive-embeds');

    // Add support for custom line height controls.
    add_theme_support('custom-line-height');

    // Add support for custom units.
    add_theme_support('custom-units');

    // Add support for experimental cover block spacing.
    add_theme_support('custom-spacing');

    // Add support for custom logo
    add_theme_support('custom-logo', array(
        'height'      => 80,
        'width'       => 250,
        'flex-height' => true,
        'flex-width'  => true,
    ));
}
add_action('after_setup_theme', 'mon_theme_aca_setup');

/**
 * Créer les pages par défaut et le menu lors de l'activation du thème
 */
function mon_theme_aca_create_default_pages_and_menu() {
    // Créer les pages par défaut si elles n'existent pas
    $default_pages = array(
        'accueil' => array(
            'title' => 'Accueil',
            'template' => 'templates/template-home.php',
            'content' => ''
        ),
        'a-propos' => array(
            'title' => 'À Propos',
            'template' => '',
            'content' => '<!-- wp:paragraph --><p>À propos de l\'Association Cotonnière Africaine.</p><!-- /wp:paragraph -->'
        ),
        'membres' => array(
            'title' => 'Membres',
            'template' => '',
            'content' => '<!-- wp:paragraph --><p>Découvrez nos membres.</p><!-- /wp:paragraph -->'
        ),
        'actualites' => array(
            'title' => 'Actualités',
            'template' => '',
            'content' => '<!-- wp:paragraph --><p>Dernières actualités de l\'ACA.</p><!-- /wp:paragraph -->'
        ),
        'publications' => array(
            'title' => 'Publications',
            'template' => 'templates/template-publications.php',
            'content' => '<!-- wp:publications-hero /--><!-- wp:publications-tabs /--><!-- wp:publications-collections /--><!-- wp:publications-grid /--><!-- wp:publications-modal /-->'
        ),
        'contact' => array(
            'title' => 'Contact',
            'template' => 'templates/template-contact.php',
            'content' => '<!-- wp:contact-hero /--><!-- wp:contact-form /--><!-- wp:contact-sidebar /--><!-- wp:contact-offices /--><!-- wp:contact-map /-->'
        ),
    );

    $page_ids = array();

    foreach ($default_pages as $slug => $page_data) {
        // Vérifier si la page existe déjà
        $existing_page = get_page_by_path($slug);
        
        if (!$existing_page) {
            // Créer la page
            $page_id = wp_insert_post(array(
                'post_title'    => $page_data['title'],
                'post_name'     => $slug,
                'post_content'  => $page_data['content'],
                'post_status'   => 'publish',
                'post_type'     => 'page',
                'post_author'   => 1,
                'menu_order'    => 0,
                'page_template' => $page_data['template']
            ));
            
            if ($page_id && !is_wp_error($page_id)) {
                $page_ids[$slug] = $page_id;
                
                // Définir la page d'accueil
                if ($slug === 'accueil') {
                    update_option('page_on_front', $page_id);
                    update_option('show_on_front', 'page');
                }
            }
        } else {
            $page_ids[$slug] = $existing_page->ID;
        }
    }

    // Créer le menu principal s'il n'existe pas
    $menu_name = 'Menu Principal';
    $menu_exists = wp_get_nav_menu_object($menu_name);
    
    if (!$menu_exists) {
        $menu_id = wp_create_nav_menu($menu_name);
        
        if ($menu_id && !is_wp_error($menu_id)) {
            // Ajouter les pages au menu
            $menu_order = 1;
            foreach ($default_pages as $slug => $page_data) {
                if (isset($page_ids[$slug])) {
                    wp_update_nav_menu_item($menu_id, 0, array(
                        'menu-item-title'   => $page_data['title'],
                        'menu-item-object'  => 'page',
                        'menu-item-object-id' => $page_ids[$slug],
                        'menu-item-type'    => 'post_type',
                        'menu-item-status'  => 'publish',
                        'menu-item-position' => $menu_order
                    ));
                    $menu_order++;
                }
            }
            
            // Assigner le menu à l'emplacement 'primary'
            $locations = get_theme_mod('nav_menu_locations');
            $locations['primary'] = $menu_id;
            set_theme_mod('nav_menu_locations', $locations);
        }
    }
}
add_action('after_switch_theme', 'mon_theme_aca_create_default_pages_and_menu');