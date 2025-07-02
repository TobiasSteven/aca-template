<?php
/**
 * Template Name: Page d'accueil
 *
 * @package Mon-Theme-ACA
 */

get_header();
?>

<main id="primary" class="site-main">
    <?php
    // Si la page est vide (nouvelle installation), insérer les blocs par défaut
    if (empty(trim(get_the_content()))) {
        echo '<!-- wp:hero-slider /-->';
        echo '<!-- wp:stats-cards /-->';
        echo '<!-- wp:recent-news /-->';
        echo '<!-- wp:nos-missions /-->';
        echo '<!-- wp:events /-->';
        echo '<!-- wp:testimonials /-->';
        echo '<!-- wp:newsletter /-->';
    } else {
        // Sinon, afficher le contenu normal de la page
        the_content();
    }
    ?>
</main><!-- #main -->

<?php
get_footer();