<?php
/*
Template Name: Home
*/
?><?php get_header(); ?>

      <div id="container">
         <div id="home1">
            <div id="image1">
            </div>
            <h3>The Lifemapper Project</h3>
            <p>
               For more than 300 years, tens of thousands of biologists around the world, through rugged exploration of the planet's wild places, 
               have strived to discover and document the diversity of life on earth.
            </p>
            <a href="<?php echo URL_BASE; ?>?page_id=2">Read More ... </a>
         </div>
            
         <div id="home2">
            <div id="image2">
            </div>
            <h3>Scientific Impacts</h3>
            <p>
               Where will invasive species next attack? What geographic areas are most vulnerable to the plague? These questions are being answered 
               by scientists who use Lifemapper to run predictive models.  
            </p>
            <a href="<?php echo URL_BASE; ?>?page_id=86">Read More ... </a>
         </div>
       
         <div id="home3">
            <a href="<?php echo URL_BASE; ?>?page_id=863#page:how-to-screen;">
               <div id="image3">
               </div>
            </a>

            <a style="text-decoration: none !important" href="<?php URL_BASE; ?>?page_id=863#page:how-to-screen;">
               <h3>Run a Model</h3>
            </a>
            <p>
               The Lifemapper team has created an interactive web application that offers a glimpse of Lifemapper's approach to Species Distribution 
               Modeling. Three interfaces offer a glimpse of our Modeling capabilities.
            </p>
            <a href="<?php URL_BASE; ?>?page_id=863#page:how-to-screen;">Run a Model</a>
         </div>

      </div> <!-- #container -->
      <div class="clear"></div>  
            
<?php get_footer(); ?>
            




