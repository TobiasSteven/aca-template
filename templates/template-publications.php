<?php
/**
 * Template Name: Page des publications
 *
 * @package Mon-Theme-ACA
 */

get_header();
?>

<main id="primary" class="site-main">
    <?php
    while (have_posts()) :
        the_post();
        
        the_content();
        
    endwhile; // End of the loop.
    ?>
</main><!-- #main -->

<?php
get_footer();