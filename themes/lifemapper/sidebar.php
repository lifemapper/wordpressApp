<?php

if ($post->post_parent)	{
   $ancestors=get_post_ancestors($post->ID);
   $root=count($ancestors)-1;
   $parent = $ancestors[$root];
} else {
   $parent = $post->ID;
}

$children = wp_list_pages("title_li=&child_of=". $parent ."&echo=0" ."&exclude=71,132,136,140,181,191,730,738,746,750,754,863,883,966");

if ($children) { ?>
   <ul class="children">
<?php echo $children; ?>
<?php
if (is_page( array(12,63,99,593))) { ?>
   <ul>
<?php
 echo "<li><a href='" . URL_BASE . "?page_id=883'>Climate Layers</a></li>";
 echo "<li><a href='" . URL_BASE . "?page_id=863#page:species-archive;'>Species Archive</a></li>";
 echo "<li><a href='" . URL_BASE . "?page_id=863#page:create-experiment;'>New Experiment</a></li>";
}
?>
      </ul>
   </ul>

<?php } ?>









