<?php

/**
 * Custom Blocks Registration
 *
 * @package Mon-Theme-ACA
 */

/**
 * Register custom blocks
 */
function mon_theme_aca_register_blocks()
{
    // Enregistrer le bloc stats-cards
    register_block_type(get_template_directory() . '/blocks/stats-cards');

    // Enregistrer le bloc hero-slider
    register_block_type(get_template_directory() . '/blocks/hero-slider');

    // Enregistrer le bloc recent-news
    register_block_type(get_template_directory() . '/blocks/recent-news');

    // Enregistrer le bloc nos-missions
    register_block_type(get_template_directory() . '/blocks/nos-missions');

    // Enregistrer le bloc events
    register_block_type(get_template_directory() . '/blocks/events');

    // Enregistrer le bloc testimonials
    register_block_type(get_template_directory() . '/blocks/testimonials');

    // Enregistrer le bloc partners
    register_block_type(get_template_directory() . '/blocks/partners');

    // Enregistrer le bloc newsletter
    register_block_type(get_template_directory() . '/blocks/newsletter');

    // Enregistrer le bloc featured-post
    register_block_type(get_template_directory() . '/blocks/featured-post');

    // Enregistrer le bloc filtered-posts
    register_block_type(get_template_directory() . '/blocks/filtered-posts');
    
    // Enregistrer le bloc timeline
    register_block_type(get_template_directory() . '/blocks/timeline');
    
    // Enregistrer les blocs de contact
    register_block_type(get_template_directory() . '/blocks/contact-hero');
    register_block_type(get_template_directory() . '/blocks/contact-form');
    register_block_type(get_template_directory() . '/blocks/contact-sidebar');
    register_block_type(get_template_directory() . '/blocks/contact-offices');
    register_block_type(get_template_directory() . '/blocks/contact-map');
    register_block_type(get_template_directory() . '/blocks/contact-success');
    
    // Enregistrer les blocs de publications
    register_block_type(get_template_directory() . '/blocks/publications-hero');
    register_block_type(get_template_directory() . '/blocks/publications-tabs');
    register_block_type(get_template_directory() . '/blocks/publications-collections');
    register_block_type(get_template_directory() . '/blocks/publications-grid');
    register_block_type(get_template_directory() . '/blocks/publications-modal');
    
    // Enregistrer le bloc our-history
    register_block_type(get_template_directory() . '/blocks/our-history');
    
    // Enregistrer le bloc hero-banner
    register_block_type(get_template_directory() . '/blocks/hero-banner');
}
add_action('init', 'mon_theme_aca_register_blocks');

/**
 * Enqueue block assets for both frontend and editor
 */
function mon_theme_aca_enqueue_block_assets()
{
    // Enqueue FontAwesome for icons - works for both frontend and editor
    wp_enqueue_style(
        'fontawesome',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
        array(),
        '6.5.1'
    );

    // S'assurer que les styles des blocks sont chargés
    if (has_block('mon-theme-aca/recent-news')) {
        wp_enqueue_style(
            'mon-theme-aca-recent-news-style',
            get_template_directory_uri() . '/blocks/recent-news/build/style-index.css',
            array(),
            filemtime(get_template_directory() . '/blocks/recent-news/build/style-index.css')
        );
    }

    // S'assurer que les styles du block newsletter sont chargés
    if (has_block('mon-theme-aca/newsletter')) {
        wp_enqueue_style(
            'mon-theme-aca-newsletter-style',
            get_template_directory_uri() . '/blocks/newsletter/build/style-index.css',
            array(),
            filemtime(get_template_directory() . '/blocks/newsletter/build/style-index.css')
        );
    }

    // S'assurer que les styles du block featured-post sont chargés
    if (has_block('mon-theme-aca/featured-post')) {
        wp_enqueue_style(
            'mon-theme-aca-featured-post-style',
            get_template_directory_uri() . '/blocks/featured-post/build/style-index.css',
            array(),
            filemtime(get_template_directory() . '/blocks/featured-post/build/style-index.css')
        );
    }

    // S'assurer que les styles du block filtered-posts sont chargés
    if (has_block('mon-theme-aca/filtered-posts')) {
        wp_enqueue_style(
            'mon-theme-aca-filtered-posts-style',
            get_template_directory_uri() . '/blocks/filtered-posts/build/style-index.css',
            array(),
            filemtime(get_template_directory() . '/blocks/filtered-posts/build/style-index.css')
        );
    }
    
    // S'assurer que les styles des blocs de contact sont chargés
    $contact_blocks = [
        'contact-hero',
        'contact-form',
        'contact-sidebar',
        'contact-offices',
        'contact-map',
        'contact-success'
    ];
    
    foreach ($contact_blocks as $block) {
        if (has_block('mon-theme-aca/' . $block)) {
            wp_enqueue_style(
                'mon-theme-aca-' . $block . '-style',
                get_template_directory_uri() . '/blocks/' . $block . '/style-index.css',
                array(),
                filemtime(get_template_directory() . '/blocks/' . $block . '/style-index.css')
            );
        }
    }
    
    // S'assurer que les styles des blocs de publications sont chargés
    $publications_blocks = [
        'publications-hero',
        'publications-tabs',
        'publications-collections',
        'publications-grid',
        'publications-modal'
    ];
    
    foreach ($publications_blocks as $block) {
        if (has_block('mon-theme-aca/' . $block)) {
            wp_enqueue_style(
                'mon-theme-aca-' . $block . '-style',
                get_template_directory_uri() . '/blocks/' . $block . '/style-index.css',
                array(),
                filemtime(get_template_directory() . '/blocks/' . $block . '/style-index.css')
            );
        }
    }
    
    // S'assurer que les styles du bloc our-history sont chargés
    if (has_block('mon-theme-aca/our-history')) {
        wp_enqueue_style(
            'mon-theme-aca-our-history-style',
            get_template_directory_uri() . '/blocks/our-history/style-index.css',
            array(),
            filemtime(get_template_directory() . '/blocks/our-history/style-index.css')
        );
    }
    
    // S'assurer que les styles du bloc hero-banner sont chargés
    if (has_block('mon-theme-aca/hero-banner')) {
        wp_enqueue_style(
            'mon-theme-aca-hero-banner-style',
            get_template_directory_uri() . '/blocks/hero-banner/style-index.css',
            array(),
            filemtime(get_template_directory() . '/blocks/hero-banner/style-index.css')
        );
    }

    // Enqueue des scripts JavaScript pour les blocs
    if (has_block('mon-theme-aca/events')) {
        wp_enqueue_script(
            'mon-theme-aca-events-view',
            get_template_directory_uri() . '/blocks/events/view.js',
            array(),
            filemtime(get_template_directory() . '/blocks/events/view.js'),
            true
        );
    }

    if (has_block('mon-theme-aca/partners')) {
        wp_enqueue_script(
            'mon-theme-aca-partners-view',
            get_template_directory_uri() . '/blocks/partners/view.js',
            array(),
            filemtime(get_template_directory() . '/blocks/partners/view.js'),
            true
        );
    }

    if (has_block('mon-theme-aca/hero-slider')) {
        wp_enqueue_script(
            'mon-theme-aca-hero-slider-view',
            get_template_directory_uri() . '/blocks/hero-slider/view.js',
            array(),
            filemtime(get_template_directory() . '/blocks/hero-slider/view.js'),
            true
        );
    }

    // Enqueue des scripts pour le bloc filtered-posts
    if (has_block('mon-theme-aca/filtered-posts')) {
        wp_enqueue_script(
            'mon-theme-aca-filtered-posts-view',
            get_template_directory_uri() . '/blocks/filtered-posts/view.js',
            array(),
            filemtime(get_template_directory() . '/blocks/filtered-posts/view.js'),
            true
        );

        // Localiser le script avec les données AJAX
        wp_localize_script(
            'mon-theme-aca-filtered-posts-view',
            'filteredPostsAjax',
            array(
                'ajaxurl' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('filtered_posts_nonce'),
            )
        );
    }
    
    // Enqueue des scripts pour le bloc contact-form
    if (has_block('mon-theme-aca/contact-form')) {
        wp_enqueue_script(
            'mon-theme-aca-contact-form-view',
            get_template_directory_uri() . '/blocks/contact-form/view.js',
            array('jquery'),
            filemtime(get_template_directory() . '/blocks/contact-form/view.js'),
            true
        );

        // Localiser le script avec les données AJAX
        wp_localize_script(
            'mon-theme-aca-contact-form-view',
            'contactFormData',
            array(
                'ajaxurl' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('contact_form_nonce'),
            )
        );
    }
    
    // Enqueue des scripts pour les blocs de publications
    if (has_block('mon-theme-aca/publications-grid') || has_block('mon-theme-aca/publications-modal')) {
        wp_enqueue_script(
            'mon-theme-aca-publications-view',
            get_template_directory_uri() . '/blocks/publications-grid/view.js',
            array('jquery'),
            filemtime(get_template_directory() . '/blocks/publications-grid/view.js'),
            true
        );
    }
    
    if (has_block('mon-theme-aca/publications-tabs')) {
        wp_enqueue_script(
            'mon-theme-aca-publications-tabs-view',
            get_template_directory_uri() . '/blocks/publications-tabs/view.js',
            array('jquery'),
            filemtime(get_template_directory() . '/blocks/publications-tabs/view.js'),
            true
        );
    }
}
add_action('enqueue_block_assets', 'mon_theme_aca_enqueue_block_assets');

/**
 * Force l'enqueue des styles de blocks même si has_block ne fonctionne pas
 */
function mon_theme_aca_force_block_styles()
{
    // Enqueue forcé des styles du block recent-news
    wp_enqueue_style(
        'mon-theme-aca-recent-news-frontend',
        get_template_directory_uri() . '/blocks/recent-news/build/style-index.css',
        array(),
        filemtime(get_template_directory() . '/blocks/recent-news/build/style-index.css')
    );

    // Enqueue forcé des styles du block events
    if (file_exists(get_template_directory() . '/blocks/events/build/style-index.css')) {
        wp_enqueue_style(
            'mon-theme-aca-events-frontend',
            get_template_directory_uri() . '/blocks/events/build/style-index.css',
            array(),
            filemtime(get_template_directory() . '/blocks/events/build/style-index.css')
        );
    }

    // Enqueue forcé du script JavaScript du block events
    if (file_exists(get_template_directory() . '/blocks/events/view.js')) {
        wp_enqueue_script(
            'mon-theme-aca-events-view-js',
            get_template_directory_uri() . '/blocks/events/view.js',
            array(),
            filemtime(get_template_directory() . '/blocks/events/view.js'),
            true
        );
    }

    // Enqueue forcé du script JavaScript du block partners
    if (file_exists(get_template_directory() . '/blocks/partners/view.js')) {
        wp_enqueue_script(
            'mon-theme-aca-partners-view-js',
            get_template_directory_uri() . '/blocks/partners/view.js',
            array(),
            filemtime(get_template_directory() . '/blocks/partners/view.js'),
            true
        );
    }

    // Enqueue forcé du script JavaScript du block hero-slider
    if (file_exists(get_template_directory() . '/blocks/hero-slider/view.js')) {
        wp_enqueue_script(
            'mon-theme-aca-hero-slider-view-js',
            get_template_directory_uri() . '/blocks/hero-slider/view.js',
            array(),
            filemtime(get_template_directory() . '/blocks/hero-slider/view.js'),
            true
        );
    }

    // Enqueue forcé des styles du block testimonials
    if (file_exists(get_template_directory() . '/blocks/testimonials/style-index.css')) {
        wp_enqueue_style(
            'mon-theme-aca-testimonials-frontend',
            get_template_directory_uri() . '/blocks/testimonials/style-index.css',
            array(),
            filemtime(get_template_directory() . '/blocks/testimonials/style-index.css')
        );
    }

    // Enqueue forcé des styles du block newsletter
    if (file_exists(get_template_directory() . '/blocks/newsletter/build/style-index.css')) {
        wp_enqueue_style(
            'mon-theme-aca-newsletter-frontend',
            get_template_directory_uri() . '/blocks/newsletter/build/style-index.css',
            array(),
            filemtime(get_template_directory() . '/blocks/newsletter/build/style-index.css')
        );
    }

    // Enqueue forcé des styles du block featured-post
    if (file_exists(get_template_directory() . '/blocks/featured-post/build/style-index.css')) {
        wp_enqueue_style(
            'mon-theme-aca-featured-post-frontend',
            get_template_directory_uri() . '/blocks/featured-post/build/style-index.css',
            array(),
            filemtime(get_template_directory() . '/blocks/featured-post/build/style-index.css')
        );
    }

    // Enqueue forcé des styles du block filtered-posts
    if (file_exists(get_template_directory() . '/blocks/filtered-posts/build/style-index.css')) {
        wp_enqueue_style(
            'mon-theme-aca-filtered-posts-frontend',
            get_template_directory_uri() . '/blocks/filtered-posts/build/style-index.css',
            array(),
            filemtime(get_template_directory() . '/blocks/filtered-posts/build/style-index.css')
        );
    }
    
    // Enqueue forcé des styles du block timeline
    if (file_exists(get_template_directory() . '/blocks/timeline/style-index.css')) {
        wp_enqueue_style(
            'mon-theme-aca-timeline-frontend',
            get_template_directory_uri() . '/blocks/timeline/style-index.css',
            array(),
            filemtime(get_template_directory() . '/blocks/timeline/style-index.css')
        );
    }
    
    // Enqueue forcé des styles des blocs de contact
    $contact_blocks = [
        'contact-hero',
        'contact-form',
        'contact-sidebar',
        'contact-offices',
        'contact-map',
        'contact-success'
    ];
    
    foreach ($contact_blocks as $block) {
        $style_path = get_template_directory() . '/blocks/' . $block . '/style-index.css';
        if (file_exists($style_path)) {
            wp_enqueue_style(
                'mon-theme-aca-' . $block . '-frontend',
                get_template_directory_uri() . '/blocks/' . $block . '/style-index.css',
                array(),
                filemtime($style_path)
            );
        }
    }
    
    // Enqueue forcé du script JavaScript du block contact-form
    if (file_exists(get_template_directory() . '/blocks/contact-form/view.js')) {
        wp_enqueue_script(
            'mon-theme-aca-contact-form-view-js',
            get_template_directory_uri() . '/blocks/contact-form/view.js',
            array('jquery'),
            filemtime(get_template_directory() . '/blocks/contact-form/view.js'),
            true
        );
        
        // Localiser le script avec les données AJAX
        wp_localize_script(
            'mon-theme-aca-contact-form-view-js',
            'contactFormData',
            array(
                'ajaxurl' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('contact_form_nonce'),
            )
        );
    }
    
    // Enqueue forcé des styles des blocs de publications
    $publications_blocks = [
        'publications-hero',
        'publications-tabs',
        'publications-collections',
        'publications-grid',
        'publications-modal'
    ];
    
    foreach ($publications_blocks as $block) {
        $style_path = get_template_directory() . '/blocks/' . $block . '/style-index.css';
        if (file_exists($style_path)) {
            wp_enqueue_style(
                'mon-theme-aca-' . $block . '-frontend',
                get_template_directory_uri() . '/blocks/' . $block . '/style-index.css',
                array(),
                filemtime($style_path)
            );
        }
    }
    
    // Enqueue forcé des scripts JavaScript des blocs de publications
    if (file_exists(get_template_directory() . '/blocks/publications-grid/view.js')) {
        wp_enqueue_script(
            'mon-theme-aca-publications-view-js',
            get_template_directory_uri() . '/blocks/publications-grid/view.js',
            array('jquery'),
            filemtime(get_template_directory() . '/blocks/publications-grid/view.js'),
            true
        );
    }
    
    if (file_exists(get_template_directory() . '/blocks/publications-tabs/view.js')) {
        wp_enqueue_script(
            'mon-theme-aca-publications-tabs-view-js',
            get_template_directory_uri() . '/blocks/publications-tabs/view.js',
            array('jquery'),
            filemtime(get_template_directory() . '/blocks/publications-tabs/view.js'),
            true
        );
    }
    
    // Enqueue forcé des styles du bloc our-history
    if (file_exists(get_template_directory() . '/blocks/our-history/style-index.css')) {
        wp_enqueue_style(
            'mon-theme-aca-our-history-frontend',
            get_template_directory_uri() . '/blocks/our-history/style-index.css',
            array(),
            filemtime(get_template_directory() . '/blocks/our-history/style-index.css')
        );
    }
    
    // Enqueue forcé des styles du bloc hero-banner
    if (file_exists(get_template_directory() . '/blocks/hero-banner/style-index.css')) {
        wp_enqueue_style(
            'mon-theme-aca-hero-banner-frontend',
            get_template_directory_uri() . '/blocks/hero-banner/style-index.css',
            array(),
            filemtime(get_template_directory() . '/blocks/hero-banner/style-index.css')
        );
    }
}
add_action('wp_enqueue_scripts', 'mon_theme_aca_force_block_styles', 20);

/**
 * Enqueue block editor specific assets
 */
function mon_theme_aca_enqueue_block_editor_assets()
{
    // Add CSS personnalisé pour forcer l'affichage des icônes dans l'éditeur
    $custom_css = '
        .wp-block-mon-theme-aca-stats-cards .stat-icon-editor i {
            font-family: "Font Awesome 6 Free", "Font Awesome 6 Pro", "Font Awesome 6 Brands", "FontAwesome" !important;
            font-weight: 900 !important;
            font-style: normal !important;
            font-variant: normal !important;
            text-rendering: auto !important;
            line-height: 1 !important;
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
        }
        
        .components-panel__body .stat-icon-preview i {
            font-family: "Font Awesome 6 Free", "Font Awesome 6 Pro", "Font Awesome 6 Brands", "FontAwesome" !important;
            font-weight: 900 !important;
            font-style: normal !important;
            font-variant: normal !important;
            text-rendering: auto !important;
            line-height: 1 !important;
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
        }
    ';

    // FontAwesome is enqueued via enqueue_block_assets hook, so we can add inline styles to it
    wp_add_inline_style('fontawesome', $custom_css);
}
add_action('enqueue_block_editor_assets', 'mon_theme_aca_enqueue_block_editor_assets', 15);

/**
 * Add block category for theme blocks
 */
function mon_theme_aca_block_categories($categories, $post)
{
    return array_merge(
        $categories,
        array(
            array(
                'slug'  => 'mon-theme-aca',
                'title' => __('Mon Thème ACA', 'mon-theme-aca'),
                'icon'  => 'chart-bar',
            ),
        )
    );
}
add_filter('block_categories_all', 'mon_theme_aca_block_categories', 10, 2);

/**
 * AJAX handler for filtered posts
 */
function mon_theme_aca_filtered_posts_ajax_handler()
{
    // Nettoyer tout output buffer pour éviter les fuites HTML
    if (ob_get_level()) {
        ob_clean();
    }

    // Vérifier le nonce
    if (!wp_verify_nonce($_POST['nonce'], 'filtered_posts_nonce')) {
        wp_send_json_error('Security check failed');
        return;
    }

    try {
        // Récupérer les paramètres
        $page = intval($_POST['page']) ?: 1;
        $posts_per_page = intval($_POST['posts_per_page']) ?: 6;
        $orderby = sanitize_text_field($_POST['orderby']) ?: 'date';
        $order = sanitize_text_field($_POST['order']) ?: 'desc';
        $search = sanitize_text_field($_POST['search']) ?: '';
        $categories = isset($_POST['categories']) ? array_map('intval', $_POST['categories']) : [];
        $temporal_filter = intval($_POST['temporal_filter']) ?: 0;
        $geographic_filter = intval($_POST['geographic_filter']) ?: 0;
        $load_more = isset($_POST['load_more']) && $_POST['load_more'] === 'true';

        // Arguments de base pour WP_Query
        $query_args = [
            'post_type' => 'post',
            'post_status' => 'publish',
            'posts_per_page' => $posts_per_page,
            'paged' => $page,
            'orderby' => $orderby,
            'order' => $order,
        ];

        // Ajouter la recherche
        if (!empty($search)) {
            $query_args['s'] = $search;
        }

        // Ajouter les catégories
        if (!empty($categories)) {
            $query_args['category__in'] = $categories;
        }

        // Ajouter les meta_query pour les taxonomies personnalisées
        $tax_query = [];

        if (!empty($temporal_filter) && taxonomy_exists('filtres_temporels')) {
            $tax_query[] = [
                'taxonomy' => 'filtres_temporels',
                'field' => 'term_id',
                'terms' => $temporal_filter,
            ];
        }

        if (!empty($geographic_filter) && taxonomy_exists('filtres_geographiques')) {
            $tax_query[] = [
                'taxonomy' => 'filtres_geographiques',
                'field' => 'term_id',
                'terms' => $geographic_filter,
            ];
        }

        if (!empty($tax_query)) {
            $query_args['tax_query'] = $tax_query;
            if (count($tax_query) > 1) {
                $query_args['tax_query']['relation'] = 'AND';
            }
        }

        // Effectuer la requête
        $posts_query = new WP_Query($query_args);

        // Préparer la réponse
        $response = [
            'posts_html' => '',
            'pagination_html' => '',
            'total_posts' => $posts_query->found_posts,
            'max_pages' => $posts_query->max_num_pages,
            'current_page' => $page,
            'has_more_posts' => $page < $posts_query->max_num_pages,
        ];

        // Générer le HTML des posts
        if ($posts_query->have_posts()) {
            // Utiliser un buffer pour capturer toute sortie inattendue
            ob_start();
            try {
                $posts_html = mon_theme_aca_render_posts_grid($posts_query);
            } catch (Exception $e) {
                ob_get_clean(); // Nettoyer le buffer
                wp_send_json_error('Erreur lors du rendu des posts: ' . $e->getMessage());
                return;
            }
            $unwanted_output = ob_get_clean();

            if ($unwanted_output) {
                error_log('Output inattendu dans filtered posts AJAX: ' . $unwanted_output);
            }

            $response['posts_html'] = $posts_html;

            // Générer la pagination si ce n'est pas un "load more"
            if (!$load_more && $posts_query->max_num_pages > 1) {
                ob_start();
                try {
                    $pagination_html = mon_theme_aca_render_pagination_with_current($posts_query, 'numbered', $page);
                } catch (Exception $e) {
                    ob_get_clean(); // Nettoyer le buffer
                    wp_send_json_error('Erreur lors du rendu de la pagination: ' . $e->getMessage());
                    return;
                }
                $unwanted_output2 = ob_get_clean();
                $response['pagination_html'] = $pagination_html;
            }
        } else {
            $response['posts_html'] = '<p class="no-posts">' . __('Aucun article trouvé avec ces critères.', 'mon-theme-aca') . '</p>';
        }

        wp_reset_postdata();

        wp_send_json_success($response);
    } catch (Exception $e) {
        wp_send_json_error('Une erreur est survenue: ' . $e->getMessage());
    }
}

// Enregistrer les handlers AJAX
add_action('wp_ajax_filtered_posts_ajax', 'mon_theme_aca_filtered_posts_ajax_handler');
add_action('wp_ajax_nopriv_filtered_posts_ajax', 'mon_theme_aca_filtered_posts_ajax_handler');

/**
 * AJAX handler for contact form
 */
function mon_theme_aca_contact_form_submit()
{
    // Nettoyer tout output buffer pour éviter les fuites HTML
    if (ob_get_level()) {
        ob_clean();
    }

    // Vérifier le nonce
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'contact_form_nonce')) {
        wp_send_json_error([
            'message' => __('Erreur de sécurité. Veuillez rafraîchir la page et réessayer.', 'mon-theme-aca')
        ]);
        return;
    }

    // Récupérer les données du formulaire
    $form_id = sanitize_text_field($_POST['form_id'] ?? '');
    $first_name = sanitize_text_field($_POST['firstName'] ?? '');
    $last_name = sanitize_text_field($_POST['lastName'] ?? '');
    $email = sanitize_email($_POST['email'] ?? '');
    $phone = sanitize_text_field($_POST['phone'] ?? '');
    $organization = sanitize_text_field($_POST['organization'] ?? '');
    $contact_reason = sanitize_text_field($_POST['contactReason'] ?? '');
    $subject = sanitize_text_field($_POST['subject'] ?? '');
    $message = sanitize_textarea_field($_POST['message'] ?? '');
    $preferred_contact = sanitize_text_field($_POST['preferredContact'] ?? 'email');

    // Validation des champs obligatoires
    if (empty($first_name) || empty($last_name) || empty($email) || empty($subject) || empty($message)) {
        wp_send_json_error([
            'message' => __('Veuillez remplir tous les champs obligatoires.', 'mon-theme-aca')
        ]);
        return;
    }

    // Validation de l'email
    if (!is_email($email)) {
        wp_send_json_error([
            'message' => __('Veuillez entrer une adresse email valide.', 'mon-theme-aca')
        ]);
        return;
    }

    // Récupérer l'email destinataire depuis les options du bloc
    $recipient_email = get_option('contact_form_recipient_' . $form_id, get_option('admin_email'));

    // Construire le message
    $email_subject = sprintf(__('[Contact] %s', 'mon-theme-aca'), $subject);
    
    $email_body = sprintf(__('Nom: %s %s', 'mon-theme-aca'), $first_name, $last_name) . "\r\n\r\n";
    $email_body .= sprintf(__('Email: %s', 'mon-theme-aca'), $email) . "\r\n";
    
    if (!empty($phone)) {
        $email_body .= sprintf(__('Téléphone: %s', 'mon-theme-aca'), $phone) . "\r\n";
    }
    
    if (!empty($organization)) {
        $email_body .= sprintf(__('Organisation: %s', 'mon-theme-aca'), $organization) . "\r\n";
    }
    
    if (!empty($contact_reason)) {
        $email_body .= sprintf(__('Motif de contact: %s', 'mon-theme-aca'), $contact_reason) . "\r\n";
    }
    
    $email_body .= sprintf(__('Méthode de contact préférée: %s', 'mon-theme-aca'), $preferred_contact) . "\r\n\r\n";
    $email_body .= __('Message:', 'mon-theme-aca') . "\r\n" . $message;

    // En-têtes de l'email
    $headers = array(
        'Content-Type: text/plain; charset=UTF-8',
        'From: ' . $first_name . ' ' . $last_name . ' <' . $email . '>',
        'Reply-To: ' . $email
    );

    // Envoyer l'email
    $sent = wp_mail($recipient_email, $email_subject, $email_body, $headers);

    if ($sent) {
        // Récupérer le message de succès depuis les options du bloc
        $success_message = get_option('contact_form_success_' . $form_id, __('Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.', 'mon-theme-aca'));
        
        wp_send_json_success([
            'message' => $success_message
        ]);
    } else {
        // Récupérer le message d'erreur depuis les options du bloc
        $error_message = get_option('contact_form_error_' . $form_id, __('Une erreur s\'est produite lors de l\'envoi du message. Veuillez réessayer.', 'mon-theme-aca'));
        
        wp_send_json_error([
            'message' => $error_message
        ]);
    }
}

// Enregistrer les handlers AJAX pour le formulaire de contact
add_action('wp_ajax_contact_form_submit', 'mon_theme_aca_contact_form_submit');
add_action('wp_ajax_nopriv_contact_form_submit', 'mon_theme_aca_contact_form_submit');

/**
 * AJAX handler for publications filtering
 */
function mon_theme_aca_publications_filter_handler() {
    // Nettoyer tout output buffer pour éviter les fuites HTML
    if (ob_get_level()) {
        ob_clean();
    }

    // Vérifier le nonce
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'publications_filter_nonce')) {
        wp_send_json_error([
            'message' => __('Erreur de sécurité. Veuillez rafraîchir la page et réessayer.', 'mon-theme-aca')
        ]);
        return;
    }

    // Récupérer les paramètres
    $search = sanitize_text_field($_POST['search'] ?? '');
    $types = isset($_POST['types']) ? array_map('sanitize_text_field', $_POST['types']) : [];
    $themes = isset($_POST['themes']) ? array_map('sanitize_text_field', $_POST['themes']) : [];
    $languages = isset($_POST['languages']) ? array_map('sanitize_text_field', $_POST['languages']) : [];
    $levels = isset($_POST['levels']) ? array_map('sanitize_text_field', $_POST['levels']) : [];
    $sort_by = sanitize_text_field($_POST['sortBy'] ?? 'date');
    $sort_order = sanitize_text_field($_POST['sortOrder'] ?? 'desc');
    $view_mode = sanitize_text_field($_POST['viewMode'] ?? 'grid');
    $page = intval($_POST['page'] ?? 1);
    $per_page = intval($_POST['perPage'] ?? 9);
    $active_tab = sanitize_text_field($_POST['activeTab'] ?? 'tous');

    // Récupérer les publications depuis les attributs du bloc
    $block_id = sanitize_text_field($_POST['blockId'] ?? '');
    $publications = get_option('publications_data_' . $block_id, []);

    // Filtrer les publications
    $filtered_publications = array_filter($publications, function($pub) use ($search, $types, $themes, $languages, $levels, $active_tab) {
        // Filtrer par recherche
        if (!empty($search)) {
            $search_in = strtolower($pub['title'] . ' ' . $pub['description'] . ' ' . $pub['author']);
            if (strpos($search_in, strtolower($search)) === false) {
                return false;
            }
        }
        
        // Filtrer par type
        if (!empty($types) && !in_array($pub['type'], $types)) {
            return false;
        }
        
        // Filtrer par thème
        if (!empty($themes) && !in_array($pub['theme'], $themes)) {
            return false;
        }
        
        // Filtrer par langue
        if (!empty($languages) && !in_array($pub['language'], $languages)) {
            return false;
        }
        
        // Filtrer par niveau
        if (!empty($levels) && !in_array($pub['level'], $levels)) {
            return false;
        }
        
        // Filtrer par onglet
        if ($active_tab !== 'tous') {
            $tab_mapping = [
                'rapports' => ['Rapport'],
                'guides' => ['Guide'],
                'bulletins' => ['Bulletin'],
                'recherches' => ['Étude', 'Recherche'],
                'medias' => ['Vidéo', 'Audio', 'Infographie']
            ];
            
            if (isset($tab_mapping[$active_tab]) && !in_array($pub['type'], $tab_mapping[$active_tab])) {
                return false;
            }
        }
        
        return true;
    });

    // Trier les publications
    usort($filtered_publications, function($a, $b) use ($sort_by, $sort_order) {
        $result = 0;
        
        switch ($sort_by) {
            case 'date':
                $result = strtotime($a['date']) - strtotime($b['date']);
                break;
            case 'title':
                $result = strcmp($a['title'], $b['title']);
                break;
            case 'downloads':
                $result = $a['downloads'] - $b['downloads'];
                break;
            case 'rating':
                $result = $a['rating'] - $b['rating'];
                break;
            default:
                $result = 0;
        }
        
        return $sort_order === 'desc' ? -$result : $result;
    });

    // Pagination
    $total = count($filtered_publications);
    $max_pages = ceil($total / $per_page);
    $offset = ($page - 1) * $per_page;
    $paginated_publications = array_slice($filtered_publications, $offset, $per_page);

    // Préparer la réponse
    $response = [
        'publications' => $paginated_publications,
        'total' => $total,
        'page' => $page,
        'perPage' => $per_page,
        'maxPages' => $max_pages,
        'viewMode' => $view_mode
    ];

    wp_send_json_success($response);
}

// Enregistrer les handlers AJAX pour les publications
add_action('wp_ajax_publications_filter', 'mon_theme_aca_publications_filter_handler');
add_action('wp_ajax_nopriv_publications_filter', 'mon_theme_aca_publications_filter_handler');

/**
 * Fonction helper pour rendre la pagination avec page courante
 */
function mon_theme_aca_render_pagination_with_current($posts_query, $pagination_type, $current_page = 1)
{
    if ($pagination_type === 'load-more') {
        if ($posts_query->max_num_pages > 1) {
            return '<button class="load-more-btn" data-page="' . $current_page . '" data-max-pages="' . $posts_query->max_num_pages . '">' .
                __('Charger plus d\'articles', 'mon-theme-aca') . '</button>';
        }
        return '';
    }

    // Pagination numérotée
    $pagination = paginate_links([
        'total' => $posts_query->max_num_pages,
        'current' => $current_page,
        'format' => '?paged=%#%',
        'show_all' => false,
        'end_size' => 1,
        'mid_size' => 2,
        'prev_next' => true,
        'prev_text' => '← ' . __('Précédent', 'mon-theme-aca'),
        'next_text' => __('Suivant', 'mon-theme-aca') . ' →',
        'type' => 'plain',
        'add_args' => false,
    ]);

    return $pagination ? '<nav class="pagination-nav">' . $pagination . '</nav>' : '';
}

/**
 * Fonction helper pour rendre la grille d'articles
 * Déplacée ici depuis render.php pour être disponible dans les requêtes AJAX
 */
if (!function_exists('mon_theme_aca_render_posts_grid')) {
    function mon_theme_aca_render_posts_grid($posts_query)
    {
        if (!$posts_query->have_posts()) {
            return '<p class="no-posts">' . __('Aucun article trouvé.', 'mon-theme-aca') . '</p>';
        }

        $date_colors = ['date-green', 'date-blue', 'date-green'];
        $output = '<div class="news-cards-container">';
        $post_index = 0;

        while ($posts_query->have_posts()) :
            $posts_query->the_post();
            $date_color_class = $date_colors[$post_index % count($date_colors)];
            $post_index++;

            $output .= '<article class="news-card">';
            $output .= '<div class="card-image-container">';

            if (has_post_thumbnail()) {
                $output .= get_the_post_thumbnail(get_the_ID(), 'medium', [
                    'alt' => get_the_title(),
                    'loading' => 'lazy'
                ]);
            } else {
                $output .= '<div class="placeholder-image">' . __('Pas d\'image', 'mon-theme-aca') . '</div>';
            }

            // Afficher la première catégorie en badge sur l'image
            $categories = get_the_category();
            if (!empty($categories)) {
                $first_category = $categories[0];
                $output .= '<span class="card-category">' . esc_html($first_category->name) . '</span>';
            }

            $output .= '</div>';

            $output .= '<div class="card-content">';

            // En-tête de l'article
            $output .= '<div class="content-header">';

            // Métadonnées de l'article avec catégorie et date
            $output .= '<div class="article-meta">';

            // Afficher la première catégorie du post
            $categories = get_the_category();
            if (!empty($categories)) {
                $first_category = $categories[0];
                $output .= '<span class="article-category">' . esc_html($first_category->name) . '</span> • ';
            }

            // Afficher la date de publication
            $output .= '<span class="article-date">' . get_the_date() . '</span> • ';

            $output .= esc_html(ceil(str_word_count(strip_tags(get_the_content())) / 200)) . ' min de lecture';
            $output .= '</div>';

            $output .= '<h3><a href="' . get_permalink() . '" title="' . esc_attr(get_the_title()) . '">';
            $output .= get_the_title();
            $output .= '</a></h3>';

            $output .= '<p>' . wp_trim_words(get_the_excerpt(), 20, '...') . '</p>';

            $output .= '</div>'; // fin content-header

            // Pied de l'article 
            $output .= '<div class="content-footer">';

            // Tags de l'article
            $post_tags = get_the_tags();
            if (!empty($post_tags)) {
                $output .= '<div class="article-tags">';
                foreach (array_slice($post_tags, 0, 3) as $tag) {
                    $output .= '<span class="tag">#' . esc_html($tag->name) . '</span>';
                }
                $output .= '</div>';
            } else {
                $output .= '<div class="article-tags"></div>'; // div vide pour maintenir la structure
            }

            // Auteur de l'article
            $output .= '<div class="article-author">';
            $output .= sprintf(__('Par: %s', 'mon-theme-aca'), get_the_author());
            $output .= '</div>';

            // Actions de l'article
            $output .= '<div class="article-actions">';
            $output .= '<a href="' . get_permalink() . '" class="read-more" title="' . esc_attr(get_the_title()) . '">';
            $output .= __('Lire plus', 'mon-theme-aca');
            $output .= '</a>';
            $output .= '<div class="action-buttons">';
            $output .= '<button class="action-btn share-btn" title="' . __('Partager', 'mon-theme-aca') . '"></button>';
            $output .= '<button class="action-btn bookmark-btn" title="' . __('Marquer comme favori', 'mon-theme-aca') . '"></button>';
            $output .= '</div>';
            $output .= '</div>';

            $output .= '</div>'; // fin content-footer

            $output .= '</div>';
            $output .= '</article>';
        endwhile;

        $output .= '</div>';
        return $output;
    }
}