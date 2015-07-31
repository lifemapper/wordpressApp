<?php
/*
Template Name: Page
*/
?>
<?php get_header(); ?>
      <div id="sidebarx">
         <h5>
<?php 
 
$current = $post->ID;
$parent = $post->post_parent;
$grandparent_get = get_post($parent);
$grandparent = $grandparent_get->post_parent;
?>
<?php if ($root_parent = get_the_title($grandparent) !== $root_parent = get_the_title($current)) 
{
   echo get_the_title($grandparent); 
} else {
   echo get_the_title($parent); 
}?>
         </h5>
         <?php get_sidebar(); ?> 
      </div><!-- #sidebarx -->
      <div id="content">  
         <?php 
            $page_data = get_page( $page_id );
            echo $page_data->post_content;
         ?>
      </div><!-- #content -->
      <div class="clear"></div>  

<?php get_footer(); ?>
