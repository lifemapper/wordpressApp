<?php
/*
Plugin Name: Lifemapper App
Plugin URI: http://lifemapper.org
Description: Implement the Lifemapper app within a WordPress Site
Author: James Bunch
Version: 1.0.1
Author URI: http://www.bunch-consulting.com
*/

define('LM_APP_VERSION', '1.0.1');


/* Include constants */
include 'lifemapper-config.php';

/*
   Create a constants array
  
   PHP variables have single scope.  To use this in the functions, must reference global
*/
$lmConstants = array(
   'pluginDir' => PLUGIN_DIR,
   'urlBase' => URL_BASE,
   'webServicesRoot' => WEBSERVICES_ROOT,
	'websiteRoot' => WEBSITE_ROOT
);

function lm_page()
{
   global $lmConstants;
   wp_enqueue_style("jquery-ui-all", plugins_url('/style/jquery.ui.all.css', __FILE__, "3.9"));

   wp_enqueue_style("species", plugins_url('/style/species.css', __FILE__, "3.9"));
   wp_enqueue_style("species-small", plugins_url('/style/species-small.css', __FILE__, "3.9", "screen and (max-width: 599px)"));
   wp_enqueue_style("species-medium", plugins_url('/style/species-medium.css', __FILE__, "3.9", "screen and (min-width: 600px) and (max-width: 899px)"));
   wp_enqueue_style("species-large", plugins_url('/style/species-large.css', __FILE__, "3.9", "screen and (min-width:900px)"));

   wp_enqueue_script("lm-jquery", plugins_url('/jquery/jquery-1.7.1.min.js', __FILE__, "3.9"));
   wp_enqueue_script("jquery.cookie", plugins_url('/jquery/jquery.cookies.2.2.0.min.js', __FILE__, "3.9"));
   wp_enqueue_script("jquery.ui", plugins_url('/jquery/jquery-ui-1.8.16.custom.js', __FILE__, "3.9"));

   wp_enqueue_script("lm-database", plugins_url('/data/CDatabase.js', __FILE__, "3.9"));
   wp_enqueue_script("lm-scenariotable", plugins_url('/data/CScenarioTable.js', __FILE__, "3.9"));

   wp_enqueue_script("lm-common", plugins_url('/common/CCommon.js', __FILE__, "3.9"));
   wp_localize_script('lm-common', 'lmConstants', $lmConstants);

   wp_enqueue_script("lm-cache", plugins_url('/common/CCache.js', __FILE__, "3.9"));
   wp_enqueue_script("lm-dialog", plugins_url('/common/CDialogControl.js', __FILE__, "3.9"));
   wp_enqueue_script("lm-tab", plugins_url('/common/CTabControl.js', __FILE__, "3.9"));
   wp_enqueue_script("lm-textchange", plugins_url('/common/CTextChangeMonitor.js', __FILE__, "3.9"));
   wp_enqueue_script("lm-dynamic-qs", plugins_url('/common/CDynamicQueryString.js', __FILE__, "3.9"));

}

function lm_species_page()
{
   global $lmConstants;
   lm_page();
   /*http://maps.googleapis.com/maps/api/js?key=<your google maps API key>&amp;sensor=true */
   wp_enqueue_script("google.maps", 'http://maps.googleapis.com/maps/api/js?sensor=true');

   wp_enqueue_script("lm-algorithmtable", plugins_url('/data/CAlgorithmTable.js', __FILE__, "3.9"));
   wp_enqueue_script("lm-experimenttable", plugins_url('/data/CExperimentTable.js', __FILE__, "3.9"));
   wp_enqueue_script("lm-modeltable", plugins_url('/data/CModelTable.js', __FILE__, "3.9"));
   wp_enqueue_script("lm-occurrencesettable", plugins_url('/data/COccurrenceSetTable.js', __FILE__, "3.9"));
   wp_enqueue_script("lm-lifemapdata", plugins_url('/data/lifemap.data.js', __FILE__, "3.9"));	
   wp_enqueue_script("lm-speciestable", plugins_url('/data/CSpeciesTable.js', __FILE__, "3.9"));

   wp_enqueue_script("lm-screen", plugins_url('/ui/CLifemapperScreen.js', __FILE__, "3.9"));
   wp_enqueue_script("lm-lifemap", plugins_url('/ui/CLifemap.js', __FILE__, "3.9"));
   wp_enqueue_script("lm-experimentcreator", plugins_url('/ui/CExperimentCreator.js', __FILE__, "3.9"));
   wp_localize_script('lm-experimentcreator', 'lmConstants', $lmConstants);

   wp_enqueue_script("lm-occurrencesetuploader", plugins_url('/ui/COccurrenceSetUploader.js', __FILE__, "3.9"));
   wp_enqueue_script("lm-projectionmaplayer", plugins_url('/ui/CProjectionMapLayer.js', __FILE__, "3.9"));
   wp_localize_script('lm-projectionmaplayer', 'lmConstants', $lmConstants);

   wp_enqueue_script("lm-speciesdatadownloader", plugins_url('/ui/CSpeciesDataDownloader.js', __FILE__, "3.9"));
   wp_enqueue_script("lm-speciesdetail", plugins_url('/ui/CSpeciesDetail.js', __FILE__, "3.9"));
   wp_localize_script('lm-speciesdetail', 'lmConstants', $lmConstants);

   wp_enqueue_script("lm-speciesmaplayer", plugins_url('/ui/CSpeciesMapLayer.js', __FILE__, "3.9"));
   wp_localize_script('lm-speciesmaplayer', 'lmConstants', $lmConstants);

   wp_enqueue_script("lm-speciesmapoverlay", plugins_url('/ui/CSpeciesMapOverlay.js', __FILE__, "3.9"));
   wp_enqueue_script("lm-speciesselector", plugins_url('/ui/CSpeciesSelector.js', __FILE__, "3.9"));
   wp_enqueue_script("lm-experimentlistview", plugins_url('/ui/CExperimentListView.js', __FILE__, "3.9"));
   wp_localize_script('lm-experimentlistview', 'lmConstants', $lmConstants);

   wp_enqueue_script("lm-userexperimentdetail", plugins_url('/ui/CUserExperimentDetail.js', __FILE__, "3.9"));
   wp_enqueue_script("lm-permalink", plugins_url('/ui/CPermalink.js', __FILE__, "3.9"));
   wp_enqueue_script("lm-speciesquerystring", plugins_url('/ui/CSpeciesQueryString.js', __FILE__, "3.9"));
   wp_localize_script('lm-speciesquerystring', 'lmConstants', $lmConstants);

   wp_enqueue_script("lm-defaultpage", plugins_url('/pages/CDefaultPage.js', __FILE__, "3.9"));
   wp_localize_script('lm-defaultpage', 'lmConstants', $lmConstants);
}

function lm_climate_page()
{
   global $lmConstants;
   lm_page();

   wp_enqueue_script("lm-scenariolistview", plugins_url('/ui/CScenarioListView.js', __FILE__, "3.9"));
   wp_localize_script('lm-scenariolistview', 'lmConstants', $lmConstants);

   wp_enqueue_script("lm-climatelayerdownloader", plugins_url('/ui/CClimateLayerDownloader.js', __FILE__, "3.9"));
   wp_enqueue_script("lm-climatelayerpage", plugins_url('/pages/CClimateLayerPage.js', __FILE__, "3.9"));
   wp_localize_script('lm-climatelayerpage', 'lmConstants', $lmConstants);
}


?>
