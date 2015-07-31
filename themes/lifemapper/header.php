<?php
/**
 * The Header for the Lifemapper theme.

 */
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
   <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width; initial-scale=1.0" />

      <script type="text/javascript">
         var metas = document.getElementsByTagName('meta');
         var i;
         if (navigator.userAgent.match(/iPhone/i)) {
            for (i=0; i<metas.length; i++) {
               if (metas[i].name == "viewport") {
                  metas[i].content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
               }
            }
            document.addEventListener("gesturestart", gestureStart, false);
         }

         function gestureStart() {
            for (i=0; i<metas.length; i++) {
               if (metas[i].name == "viewport") {
                  metas[i].content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
               }
            }
         }
      </script>

<?php if (is_home()) { ?>
      <title><?php bloginfo('name'); ?></title>
<?php } else { ?>
      <title><?php bloginfo('name'); ?> <?php wp_title(); ?></title>
<?php } ?>

      <!-- Favicon -->
      <link rel="shortcut icon" href="<?php bloginfo( 'stylesheet_directory'); ?>/images/favicon.ico" />

      <!--Stylesheets-->
      <link href="<?php bloginfo( 'stylesheet_directory'); ?>/lifemapper_big.css" type="text/css" media="screen and (min-width: 900px)" rel="stylesheet" />

      <link href="<?php bloginfo( 'stylesheet_directory'); ?>/lifemapper_mobile.css"  media="screen and (max-width: 640px)" rel="stylesheet" />

      <link href="<?php bloginfo( 'stylesheet_directory'); ?>/style.css"  media="screen and (min-width: 640px) and (max-width: 900px)" rel="stylesheet" />

<?php
      /* This JavaScript is here to be used by plugins
      */
      wp_head();
?>

   </head>   
   <body>
      <div id="wrapper">
         <div id="header">
<?php
function is_tree( $pid ) {      // $pid = The ID of the page we're looking for pages underneath
   global $post;               // load details about this page

   if ( is_page($pid) )
      return true;            // we're at the page or at a sub page

   $anc = get_post_ancestors( $post->ID );
   foreach ( $anc as $ancestor ) {
      if( is_page() && $ancestor == $pid ) {
         return true;
      }
   }

   return false;  // we aren't at the page, and the page is not an ancestor
}
?>

<?php /* Pick a logo */ ?>
<?php if (is_tree('18')) { ?>
            <img src="<?php bloginfo( 'template_directory'); ?>/images/flower_logo_new.png" />
<?php } elseif(is_tree('12')){ ?>
            <img src="<?php bloginfo( 'template_directory'); ?>/images/butterfly_logo_new.png" alt="" />
<?php } elseif(is_tree('360')){ ?>
            <img src="<?php bloginfo( 'template_directory'); ?>/images/treefrog_logo_new.png" />
<?php } elseif(is_tree('15')){ ?>
            <img src="<?php bloginfo( 'template_directory'); ?>/images/owl_logo_new.png" />
<?php } elseif(is_tree('2')){ ?>
            <img src="<?php bloginfo( 'template_directory'); ?>/images/treefrog_logo_new.png" />
<?php } elseif(is_tree('444')){ ?>
            <img src="<?php bloginfo( 'template_directory'); ?>/images/world_logo_blue_new.png" />
<?php } elseif(is_home() ) { ?>
            <img src="<?php bloginfo( 'template_directory'); ?>/images/world_logo_blue_new.png" />
<?php } elseif(is_search() ) { ?>
            <img src="<?php bloginfo( 'template_directory'); ?>/images/world_logo_blue_new.png" />
<?php } ?>

            <div id="nav_menu">
               <ul>
<?php wp_list_pages('sort_column=menu_order&title_li=&title=&depth=1&exclude=211'); ?>
               </ul>
            </div>  <!--#nav_menu -->
            <form method="get" id="searchform" action="<?php bloginfo('home'); ?>/">
               <div>
                  <input type="text" size="18" value="<?php echo wp_specialchars($s, 1); ?>" name="s" id="s" />
                  <input type="submit" id="searchsubmit" value="Search" class="btn" />
               </div>
            </form>
         </div>  <!--#header -->
         <div class="clear"></div>
