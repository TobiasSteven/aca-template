<?php
/**
 * Fonctions pour créer le contenu par défaut lors de l'activation du thème
 *
 * @package Mon-Theme-ACA
 */

/**
 * Ajouter les blocs par défaut à la page d'accueil lors de l'activation du thème
 */
function mon_theme_aca_setup_home_page_content() {
    // Récupérer la page d'accueil
    $home_page = get_page_by_path('accueil');
    
    if ($home_page && empty(trim($home_page->post_content))) {
        // Contenu par défaut pour la page d'accueil
        $default_content = '<!-- wp:hero-slider /-->

<!-- wp:stats-cards /-->

<!-- wp:recent-news /-->

<!-- wp:nos-missions /-->

<!-- wp:events /-->

<!-- wp:testimonials /-->

<!-- wp:newsletter /-->';
        
        // Mettre à jour la page d'accueil avec le contenu par défaut
        wp_update_post(array(
            'ID' => $home_page->ID,
            'post_content' => $default_content
        ));
    }
}
add_action('after_switch_theme', 'mon_theme_aca_setup_home_page_content');