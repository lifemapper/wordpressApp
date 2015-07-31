<?php
/*
Template Name: Climate Layer
*/
lm_climate_page();
?>

<?php get_header(); 
?>

      <div id="container">
         <div id="page-container">
            <div id="climate-map">
               <div class="map-content">
                  <div class="map-image-container">
                     <img class="climate-map-image" src="<?php echo PLUGIN_DIR; ?>images/climate_blank_map.png?v=3.7" alt="" />
                  </div>
               </div>
            </div>
            <div id="about-page">
               <img id="page-help" class="climate-layer-button" src="<?php echo PLUGIN_DIR; ?>images/help_button.png?v=3.7"
                        alt="About Species Distribution" />
            </div>
            <div id="download-link">
               <img class="hover-button" src="<?php echo PLUGIN_DIR; ?>images/download.png?v=3.9" alt="Download" />
            </div>
            <div id="download-container">
               <div class="point">
                  <div class="label">
                     Points:
                  </div>
                  <div>
                     <a href="http://lifemapper.org/services/sdm/layers/[itemId]/atom" target="_blank">ATOM</a>
                  </div>
                  <div>
                     <a href="http://lifemapper.org/services/sdm/layers/[itemId]/eml" target="_blank">EML</a>
                  </div>
                  <div>
                     <a href="http://lifemapper.org/services/sdm/layers/[itemId]/kml">KML</a>
                  </div>
                  <div>
                     <a href="http://lifemapper.org/services/sdm/layers/[itemId]/tiff" target="_blank">TIFF</a>
                  </div>
                  <div>
                     <a href="http://lifemapper.org/services/sdm/layers/[itemId]/xml" target="_blank">XML</a>
                  </div>
               </div>
            </div>
         </div>
         <div id="how-to-create-experiment" class="how-to-dialog" title="Create a New Experiment ...">
            <div class="how-to-container">
               <img class="img1" src="<?php echo PLUGIN_DIR; ?>images/new_experiment_screen1.png?v=3.9" alt="Create an experiment" /><br />
               <img class="img2" src="<?php echo PLUGIN_DIR; ?>images/new_experiment_screen2.png?v=3.9" alt="Create an experiment" /><br />
               <img class="img3" src="<?php echo PLUGIN_DIR; ?>images/new_experiment_screen3.png?v=3.9" alt="Create an experiment" /><br />
               <img class="img4" src="<?php echo PLUGIN_DIR; ?>images/new_experiment_screen4.png?v=3.9" alt="Create an experiment" />
               <div class="text1">
                  1. Choose to either find a species in the GBIF archive<br />
                  or
               </div>
               <div class="text2">
                  Import a Species file
               </div>
               <div class="text3">
                  2. Choose an Algorithm.
               </div>
               <div class="text4">
                  3. Choose an Environmental Set.
                  <br />
                  Note: because of time limitations on the web Lifemapper has limited the Website
                  test drive to low resolution Environmental Sets. High Resolution Environmental Sets
                  are available through Lifemapper web services, which can be accessed either through
                  the QGIS-Lifemapper plugin or programmatically.
               </div>
               <div class="text5">
                  4. Enter your email to receive an email notification when your experiment is complete.
                  The email will include your experiment number for future reference.
               </div>
               <div class="text6">
                  5. Click the Run Experiment button.
                  <br /><br />
                  The My Exeriments dialog will display showing the progress of your new experiment
                  submission as it is processed.
               </div>
               <img class="arrow-01" src="<?php echo PLUGIN_DIR; ?>images/new_experiment_arrow1.png?v=3.9" alt="" />
               <img class="arrow-02" src="<?php echo PLUGIN_DIR; ?>images/new_experiment_arrow2.png?v=3.9" alt="" />
               <img class="arrow-03" src="<?php echo PLUGIN_DIR; ?>images/new_experiment_arrow3.png?v=3.9" alt="" />
               <img class="arrow-04" src="<?php echo PLUGIN_DIR; ?>images/new_experiment_arrow4.png?v=3.9" alt="" />
               <img class="arrow-05" src="<?php echo PLUGIN_DIR; ?>images/new_experiment_arrow5.png?v=3.9" alt="" />
               <img class="arrow-06" src="<?php echo PLUGIN_DIR; ?>images/new_experiment_arrow6.png?v=3.9" alt="" />
               <img class="continue-button" src="<?php echo PLUGIN_DIR; ?>images/continue.png?v=3.9" alt="" id="continue-create-experiment" />
            </div>
         </div>
         <div id="how-to-explore-archive" class="how-to-dialog" title="Explore the Lifemapper Species Archive ...">
            <div class="how-to-container">
               <img class="img1" src="<?php echo PLUGIN_DIR; ?>images/species_archive_screen1.png?v=3.9" alt="Explore Archive" /><br />
               <img class="img2" src="<?php echo PLUGIN_DIR; ?>images/species_archive_screen2.png?v=3.9" alt="Explore Archive" /><br />
               <img class="img3" src="<?php echo PLUGIN_DIR; ?>images/species_archive_screen3.png?v=3.9" alt="Explore Archive" />
               <div class="text1">
                  1. Type the first 3 letters of the name of a species here.<br />
                  <br />
                  Hint: If your species is not in the list continue typing letters until it appears.<br />
                  ...<br />
                  A list of available species matching the criteria will appear.
               </div>
               <div class="text2">
                  2. Choose a species from the list.<br />
                  ...<br />
                  Points for every species occurrence found in the latest copy of the GBIF species
                  archive will display on the map.
                  <br /><br />
                  Note: modeled distributions are not available for all species in the archive.
                  Species with less than 50 points are not modeled.
               </div>
               <div class="text3">
                  3. Choose a projection.<br />
                  ...<br />
                  The projection will display on the map.
               </div>
               <img class="arrow-01" src="<?php echo PLUGIN_DIR; ?>images/species_archive_arrow1.png?v=3.9" alt="" />
               <img class="arrow-02" src="<?php echo PLUGIN_DIR; ?>images/species_archive_arrow2.png?v=3.9" alt="" />
               <img class="arrow-03" src="<?php echo PLUGIN_DIR; ?>images/species_archive_arrow3.png?v=3.9" alt="" />
               <img class="arrow-04" src="<?php echo PLUGIN_DIR; ?>images/species_archive_arrow4.png?v=3.9" alt="" />
            </div>
            <img class="continue-button hover-button" src="<?php echo PLUGIN_DIR; ?>images/continue.png?v=3.9" alt="" />
         </div>
         <div id="how-to-explore-climate-layer" class="how-to-dialog" title="Climate Layer Help Screen">
            <div class="how-to-container">
               <img class="img1" src="<?php echo PLUGIN_DIR; ?>images/climate_layers_screen_1.png?v=3.9" alt="Explore Climate Layers" />
               <img class="img2" src="<?php echo PLUGIN_DIR; ?>images/climate_layers_screen2.png?v=3.9" alt="Explore Climate Layers" />
               <div class="text1">
                  1. Choose a Climate Data source
               </div>
               <div class="text2">
                  2. Choose an IPCC Scenario
               </div>
               <div class="divisor1">
                  ...
               </div>
               <div class="text3">
                  3. Climate layers matching your choices will become available to explore. Please
                  note that some of the layers are high resolution and may take a few minutes to display.
                  These high-resolution layers are available for creating experiments using Lifemapper
                  Web Services or Web Clients but not on the website.<br />
                  <br />
                  Click a Climate layer to display it on the map.
               </div>
               <img class="arrow-01" src="<?php echo PLUGIN_DIR; ?>images/climate_layer_arrow1.png?v=3.9" alt="" />
               <img class="arrow-02" src="<?php echo PLUGIN_DIR; ?>images/climate_layer_arrow2.png?v=3.9" alt="" />
               <img class="arrow-03" src="<?php echo PLUGIN_DIR; ?>images/climate_layer_arrow3.png?v=3.9" alt="" />
            </div>
            <img class="continue-button hover-button" src="<?php echo PLUGIN_DIR; ?>images/continue.png?v=3.9" alt=""
                    id="continue-explore-climate-layer" />
         </div>
         <div id="how-to-screen" class="how-to-dialog" title="Welcome to the Lifemapper Web Application.  You can ...">
            <div class="how-to-container">
               <div class="help-section help-explore-archive">
                  <img src="<?php echo PLUGIN_DIR; ?>images/explore_dialog.png?v=3.9" alt="" />
                  <div class="help-title">
                     Explore the Species Archive</div>
                     <div class="help-section-text">
                        This includes GBIF species distribution data, and any existing current day and future
                        projections.
                     </div>
                     <img src="<?php echo PLUGIN_DIR; ?>images/species_archive.png?v=3.9" alt="Species Archive" class="hover-button species-archive-button" />
                  </div>
                  <div class="help-section help-explore-climate-layers">
                     <img src="<?php echo PLUGIN_DIR; ?>images/explore_dialog.png?v=3.9" alt="" />
                     <div class="help-title">
                        Explore the Climate Layers
                     </div>
                     <div class="help-section-text">
                        This includes high resolution climate layers available through Lifemapper Web Services.
                     </div>
                     <img src="<?php echo PLUGIN_DIR; ?>images/climate_layers.png?v=3.9" alt="Climate Layers" class="hover-button climate-selection-button" />
                  </div>
                  <div class="help-section help-create-model">
                     <img src="<?php echo PLUGIN_DIR; ?>images/create_dialog.png?v=3.9" alt="" />
                     <div class="help-title">
                        Create a new Experiment
                     </div>
                     <div class="help-section-text">
                        Choose species data (or upload data), an algorithm and low resolution climate set
                        to create projections.
                     </div>
                     <img src="<?php echo PLUGIN_DIR; ?>images/new_experiment.png?v=3.9" alt="New Experiment" class="hover-button create-experiment-button" />
                  </div>
               </div>
            </div>
            <div id="how-to-view-experiment" class="how-to-dialog" title="My Experiment Help">
               <div class="how-to-container">
                  <img class="img1" src="<?php echo PLUGIN_DIR; ?>images/my_experiments_screen1.png?v=3.9" alt="View an experiment" /><br />
                  <img class="img2" src="<?php echo PLUGIN_DIR; ?>images/my_experiments_screen2.png?v=3.9" alt="View an experiment" /><br />
                  <div class="text1">
                     The My Experiments dialog allows you to view your new experiments for each browser
                     session. Closing the browser will clear the cache. To view an experiment from a
                     previous browser session simply enter the Experiment Number in the box provided.<br />
                     Note: Experiments will be kept on the Lifemapper server for approximately 2 weeks. Please download an experiment 
                     to archive the information.
                  </div>
                  <div class="text2">
                     1. Enter an Existing Experiment number.
                  </div>
                  <div class="text3">
                     2. Click on a New Experiment while it is processing to check the status.
                  </div>
                  <div class="text4">
                     3. Click on an Experiment.<br />
                     ...<br />
                     Species Occurrence points will display on the map.
                  </div>
                  <div class="text5">
                     4. Click on a projection.<br />
                     ...<br />
                     The projection layer will display on the map.
                  </div>
                  <img class="arrow-01" src="<?php echo PLUGIN_DIR; ?>images/my_experiment_arrow1.png?v=3.9" alt="" />
                  <img class="arrow-02" src="<?php echo PLUGIN_DIR; ?>images/my_experiment_arrow2.png?v=3.9" alt="" />
                  <img class="arrow-03" src="<?php echo PLUGIN_DIR; ?>images/my_experiment_arrow3.png?v=3.9" alt="" />
                  <img class="arrow-04" src="<?php echo PLUGIN_DIR; ?>images/my_experiment_arrow4.png?v=3.9" alt="" />
                  <img class="continue-button" src="<?php echo PLUGIN_DIR; ?>images/continue.png?v=3.9" alt="" id="continue-my-experiment" />
               </div>
            </div>
            <div id="climate-selection" class="alert-message" title="Explore Climate Layers">
               <div class="criteria-label">
                  Filter by Data Source
                  <img class="climate-data-filter-button help-button" src="<?php echo PLUGIN_DIR; ?>images/help_button.png?v=3.7" alt="Help" />
               </div>
               <select class="climate-data-selector">
                  <option>Loading...</option>
               </select>
               <div class="ipcc-scenario-selector-container" style="display:none;">
                  <div class="criteria-label" style="margin-top: 8px;">
                     Filter by Predicted Climate Scenario
                     <img class="ipcc-scenario-button help-button" src="<?php echo PLUGIN_DIR; ?>images/help_button.png?v=3.7" alt="Help" />
                  </div>
                  <select class="ipcc-scenario-selector">
                     <option value="">Choose an IPCC Scenario</option>
                  </select>
               </div>
               <div class="ipcc-timeframe-selector-container" style="display:none;">
                  <div class="criteria-label" style="margin-top: 8px;">
                     Filter by Predicted Time Period<img class="ipcc-timeframe-button help-button" style="display:none;" src="<?php echo PLUGIN_DIR; ?>images/help_button.png?v=3.7" ="Help" />
                  </div>
                  <select class="ipcc-timeframe-selector">
                     <option value="">Choose a Time Period</option>
                  </select>
               </div>
               <div class="scenario-label" style="margin-top: 8px; display:none;">
                  <span>Choose a Scenario</span>
                  <img class="ipcc-timeframe-button help-button" style="display:none;" src="<?php echo PLUGIN_DIR; ?>images/help_button.png?v=3.7" ="Help" />
               </div>
               <div class="scenario-list-container">
               </div>
            </div>
            <div id="climate-data-filter-message" class="alert-message" title="Filter by Climate Data">
               <div>
                  Climate layers for Lifemapper Species Diversity models are provided by:
               </div>
               <div>
                  <b>CRU:</b> The Climatic Research Unit of the University of East Anglia provides
                  10-minute (.167 degree) climate layers based on Observed Climate information. More
                  information can be found on the 
                  <a href="http://www.cru.uea.ac.uk/home" target="_blank">CRU Website.</a>
               </div>
               <div>
                  <b>Hadley:</b> The Met Office Hadley Centre is one of the UK's foremost climate
                  change research centres. They provide 15-minute (.25 degree) projection layers.
                  More information can be found on the 
                  <a href="http://www.metoffice.gov.uk/climate-change/resources/hadley" target="_blank">Hadley website.</a>
               </div>
               <div>
                  <b>NIES:</b> The National Institute for Environmental Studies provides higher, 30
                  second resolution (.0083 degree) projection layers. More information can be found
                  on the <a href="http://www.nies.go.jp/index.html" target="_blank">NIES website.</a>
               </div>
               <div>
                  <b>WorldClim:</b> These higher resolution (30 second, approximately .0083 degree)
                  layers used for current climate data were developed by the Museum of Vertebrate Zoology, University of California,
                  Berkeley. More information can be found on the <a href="http://www.worldclim.org/" target="_blank">WorldClim website.</a>
               </div>
            </div>
            <div id="ipcc-scenario-message" class="alert-message" title="Filter by IPCC Scenario">
               <div>
                  The Intergovernmental Panel on Climate Change (IPCC) developed future climate layers
                  based on various factors including population and economic growth, energy type and
                  use and CO<sub>2</sub> emissions. More detailed descriptions are available on the
                  <a href="http://openmodeller.sourceforge.net/index.php?option=com_content&task=cateogry&sectionid=2&id=1&Itemid=4"
                  target="_blank">IPCC</a> website.
               </div>
               <div>  
                  <b>B1:</b> a convergent world with low population growth, 
                  but rapid changes in economic structures toward a service and information economy,
                  reductions in materials intensity, and the introduction of clean and resource
                  efficient technologies.
               </div>
               <div>
                  <b>A1B:</b> a future world of very rapid economic growth, global population that
                  peaks in mid-century and declines thereafter, and rapid introduction of new and
                  more efficient technologies.
               </div>
               <div>
                  <b>A2:</b> a very heterogeneous world with continuously increasing global population
                  and regionally oriented economic growth that is more fragmented and slower than
                  in other storylines.
               </div>
               <div>
                  <table cellpadding="0" cellspacing="0" class="scenario-detail">
                     <thead>
                        <tr>
                           <th>
                              IPCC<br />Scenario
                           </th>
                           <th>
                              Population<br />Growth Rate
                           </th>
                           <th>
                              Energy Use<br />Per Person
                           </th>
                           <th>
                              Proportion of<br />Clean Energy
                           </th>
                           <th>
                              CO<sub>2</sub> Emissions<br />by 2100
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>
                              B1
                           </td>
                           <td>
                              lower
                           </td>
                           <td>
                              lower
                           </td>
                           <td>
                              higher
                           </td>
                           <td>
                              983 Gt
                           </td>
                        </tr>
                        <tr>
                           <td>
                              A1B
                           </td>
                           <td>
                              lower
                           </td>
                           <td>
                              higher
                           </td>
                           <td>
                              higher
                           </td>
                           <td>
                              1499 Gt
                           </td>
                        </tr>
                        <tr>
                           <td>
                              A2
                           </td>
                           <td>
                              higher
                           </td>
                           <td>
                              lower
                           </td>
                           <td>
                              lower
                           </td>
                           <td>
                              1862 Gt
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div>
                  <br />
                  <b>Climate Layer Map Legend</b>
               </div>
              <div>
                 <img src="<?php echo PLUGIN_DIR; ?>images/climate_layer_legend.png" alt="" />
              </div>
           </div>
           <div id="page-toolbar">
              <div id="page-links">
                 <img src="<?php echo PLUGIN_DIR; ?>images/species_archive.png?v=3.9" class="hover-button species-archive-button"
                        alt="Species Archive" />
                 <img src="<?php echo PLUGIN_DIR; ?>images/climate_layers.png?v=3.9" class="hover-button climate-selection-button"
                            alt="Climate Layers" />
                 <img src="<?php echo PLUGIN_DIR; ?>images/new_experiment.png?v=3.9" class="hover-button create-experiment-button"
                                alt="New Experiment" />
                 <img src="<?php echo PLUGIN_DIR; ?>images/my_experiment.png?v=3.9" class="hover-button my-experiment-button"
                                    alt="My Experiments" />
            </div>
         </div>
      </div>


<?php get_footer(); ?>
