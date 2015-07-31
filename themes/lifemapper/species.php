<?php
/*
Template Name: Species Map
*/

lm_species_page();
?>

<?php get_header(); 
?>
      <div id="container">
         <noscript>
            <div class="noscript-warning">
               <div class="noscript-content">
                  The Lifemapper Test Drive requires javascript to be turned on in your browser. Please
                  make that change in your browser preferences before continuing.
               </div>
            </div>
         </noscript>
         <div id="page-container">
            <div id="map-shadow">
            </div>
            <div id="map-container">
               <div id="map-canvas">
               </div>
            </div>
            <div id="download-link">
               <img class="hover-button" src="<?php echo PLUGIN_DIR ?>images/download.png?v=3.9" alt="Download" />
            </div>
            <div id="download-container">
               <div class="point">
                  <div class="label">Points:</div>
                  <div>
                     <a href="http://svc.lifemapper.org/services/sdm/occurrences/[itemId]/atom" target="_blank">ATOM</a>
                  </div>
                  <div>
                     <a href="http://svc.lifemapper.org/services/sdm/occurrences/[itemId]/csv">CSV</a>
                  </div>
                  <div>
                     <a href="http://svc.lifemapper.org/services/sdm/occurrences/[itemId]/kml">KML</a>
                  </div>
                  <div>
                     <a href="http://svc.lifemapper.org/services/sdm/occurrences/[itemId]/xml" target="_blank">XML</a>
                  </div>
                  <div>
                     <a href="http://svc.lifemapper.org/services/sdm/occurrences/[itemId]/shapefile">Shapefile</a>
                  </div>
               </div>
               <div class="projections">
                  <div class="label">Projections:</div>
                     <div>
                        <a href="http://svc.lifemapper.org/services/sdm/projections/[itemId]/atom" target="_blank">ATOM</a>
                     </div>
                     <div>
                        <a href="http://svc.lifemapper.org/services/sdm/projections/[itemId]/kml">KML</a>
                     </div>
                     <div>
                        <a href="http://svc.lifemapper.org/services/sdm/projections/[itemId]/xml" target="_blank">XML</a>
                     </div>
                  </div>
               </div>
               <div id="about-page">
                  <img id="page-help" src="<?php echo PLUGIN_DIR ?>images/help_button.png?v=3.9" alt="About Species Distribution" />
               </div>
               <div class="permalink">
                  <a href=""></a>
               </div>
            </div>
            <div id="create-experiment" class="create_content tabpage" title="Create A New Experiment">
               <div class="create-input">
                  <div class="step-label">
                     1. Choose a Species Occurrence
                     <img class="create_choose_species_help_button help-button"
                            id="create-choose-species-button" src="<?php echo PLUGIN_DIR ?>images/help_button.png?v=3.9" alt="Help" />
                  </div>
                  <div id="create_species_tab" class="create-tab unselected">
                     <span>Find Species in GBIF</span>
                  </div>
                  <div id="create_species_page" class="tabpage">
                     <div id="create_search">
                        <div class="search">
                           <div class="search-input-container">
                              <span>Species:</span>
                              <input type="text" name="species" class="search_input" value="" title="Species Name" />
                              <div class="species_toolbar">
                                 <a class="google_images tooltip" target="_blank" href="http://www.google.com/search?tbm=isch&amp;hl=en&amp;source=hp&amp;biw=1366&amp;bih=707&amp;q=[speciesname]+species&amp;gbv=2&amp;oq=parkia+species&amp;aq=f&amp;aqi=g-S1&amp;aql=&amp;gs_l=img.3..0i24.3641.6362.0.6580.16.14.1.0.0.0.174.1321.10j4.14.0.tshc..0.0.JcNS1Ye1634">
                                    <img src="<?php echo PLUGIN_DIR ?>images/google_images.png?v=3.9" alt="Google Images" />
                                    <span class="tooltip-text">Google Images</span>
                                 </a> 
                                 <a class="ge_button tooltip" href="http://svc.lifemapper.org/services/sdm/occurrences/3835076/kml">
                                    <img src="<?php echo PLUGIN_DIR ?>images/ge_button.png?v=3.9" alt="Google Earth" style="border: 0px;" />
                                    <span class="tooltip-text">Google Earth</span>
                                 </a> 
                                 <a class="tooltip" href="#">
                                    <img src="<?php echo PLUGIN_DIR ?>images/help_button.png?v=3.9" class="existing-search-button help-button" alt="Help" />
                                    <span class="tooltip-text">Help</span>
                                 </a>
                              </div>
                           </div>
                           <div class="search_result_container">
                              <div class="search_result_limiter">
                                 <div class="search_result">
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div id="create_upload_tab" class="create-tab unselected">
                     Import Species File
                     <img src="<?php echo PLUGIN_DIR ?>images/help_button.png?v=3.9" class="create-import-file-button help-button" alt="" />
                  </div>
                  <div id="create_upload_page" class="tabpage">
                     <form id="frmUpload" action="" enctype="multipart/form-data" method="post">
                        <div id="upload-message">
                           Lifemapper can accept occurrences as csv and zipped shapefiles based on the Geographic Coordinate System (Lat/Long).
                        </div>
                        <input type="hidden" class="upload_name" name="displayName" /><br />
                        <input type="hidden" class="epsg_code" name="epsgCode" value="4326" />
                        <img src="<?php echo PLUGIN_DIR ?>images/help_button.png?v=3.9" class="epsg-code-button help-button" alt="" />                        
                        <input type="file" name="request" class="file_input" /><br />
                     </form>
                  </div>
                  <div class="step-label">
                     2. Choose an Algorithm
                     <img class="create-algorithm-button help-button" src="<?php echo PLUGIN_DIR ?>images/help_button.png?v=3.9" alt="Help" />
                  </div>
                  <div>
                     <select class="create_algorithm">
                        <option value="">Choose Algorithm</option>
                     </select>
                  </div>
                  <div class="step-label">
                     3. Choose an Environmental Set
                     <img class="create-environmental-set-button help-button" src="<?php echo PLUGIN_DIR ?>images/help_button.png?v=3.9" alt="Help" />
                  </div>
                  <select class="create_environmental_set">
                     <option value="">Choose Environmental Set</option>
                  </select>
                  <div>
                     <div class="scenario_container" style="display: none;">
                        <div>
                           Lifemapper will create projections based on the following scenarios:
                        </div>
                        <div class="scenario_list">
                        </div>
                     </div>
                     <div class="email_container">
                        <div>
                           <label>Email:</label>
                           <input type="text" class="email" />
                           <img class="create-email-button help-button" src="<?php echo PLUGIN_DIR ?>images/help_button.png?v=3.9" alt="Help" />
                        </div>
                        <div class="email-message">
                           Enter your email to receive notification when the new experiment is complete.
                        </div>
                     </div>
                  </div>
                  <div>
                     <img src="<?php echo PLUGIN_DIR ?>images/run_experiment_inactive.png?v=3.9" alt="Run Experiment" class="run_model_button" />
                  </div>
               </div>
            </div>
            <div id="how-to-create-experiment" class="how-to-dialog" title="Create a New Experiment ...">
               <div class="how-to-container">
                  <img class="img1" src="<?php echo PLUGIN_DIR ?>images/new_experiment_screen1.png?v=3.9" alt="Create an experiment" /><br />
                  <img class="img2" src="<?php echo PLUGIN_DIR ?>images/new_experiment_screen2.png?v=3.9" alt="Create an experiment" /><br />
                  <img class="img3" src="<?php echo PLUGIN_DIR ?>images/new_experiment_screen3.png?v=3.9" alt="Create an experiment" /><br />
                  <img class="img4" src="<?php echo PLUGIN_DIR ?>images/new_experiment_screen4.png?v=3.9" alt="Create an experiment" />
                  <div class="text1">
                     1. Choose to either find a species in the GBIF archive<br />or
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
                     <br />
                     <br />
                     The My Exeriments dialog will display showing the progress of your new experiment
                     submission as it is processed.
                  </div>
                  <img class="arrow-01" src="<?php echo PLUGIN_DIR ?>images/new_experiment_arrow1.png?v=3.9" alt="" />
                  <img class="arrow-02" src="<?php echo PLUGIN_DIR ?>images/new_experiment_arrow2.png?v=3.9" alt="" />
                  <img class="arrow-03" src="<?php echo PLUGIN_DIR ?>images/new_experiment_arrow3.png?v=3.9" alt="" />
                  <img class="arrow-04" src="<?php echo PLUGIN_DIR ?>images/new_experiment_arrow4.png?v=3.9" alt="" />
                  <img class="arrow-05" src="<?php echo PLUGIN_DIR ?>images/new_experiment_arrow5.png?v=3.9" alt="" />
                  <img class="arrow-06" src="<?php echo PLUGIN_DIR ?>images/new_experiment_arrow6.png?v=3.9" alt="" />
                  <img class="continue-button" src="<?php echo PLUGIN_DIR ?>images/continue.png?v=3.9" alt="" id="continue-create-experiment" />
               </div>
            </div>
            <div id="how-to-explore-archive" class="how-to-dialog" title="Explore the Lifemapper Species Archive ...">
               <div class="how-to-container">
                  <img class="img1" src="<?php echo PLUGIN_DIR ?>images/species_archive_screen1.png?v=3.9" alt="Explore Archive" /><br />
                  <img class="img2" src="<?php echo PLUGIN_DIR ?>images/species_archive_screen2.png?v=3.9" alt="Explore Archive" /><br />
                  <img class="img3" src="<?php echo PLUGIN_DIR ?>images/species_archive_screen3.png?v=3.9" alt="Explore Archive" />
                  <div class="text1">
                     1. Type the first 3 letters of the name of a species here.<br />
                     <br />
                     Hint: If your species is not in the list continue typing letters until it appears.<br />...<br />
                     A list of available species matching the criteria will appear.
                  </div>
                  <div class="text2">
                     2. Choose a species from the list.<br />...<br />
                     Points for every species occurrence found in the latest copy of the GBIF species
                     archive will display on the map.
                     <br /><br />
                     *Please note: modeled distributions are not available for all species in the archive.
                     Species with less than 50 points are not modeled.
                  </div>
                  <div class="text3">
                     3. Choose a projection.<br />...<br />
                     The projection will display on the map.
                  </div>
                  <img class="arrow-01" src="<?php echo PLUGIN_DIR ?>images/species_archive_arrow1.png?v=3.9" alt="" />
                  <img class="arrow-02" src="<?php echo PLUGIN_DIR ?>images/species_archive_arrow2.png?v=3.9" alt="" />
                  <img class="arrow-03" src="<?php echo PLUGIN_DIR ?>images/species_archive_arrow3.png?v=3.9" alt="" />
                  <img class="arrow-04" src="<?php echo PLUGIN_DIR ?>images/species_archive_arrow4.png?v=3.9" alt="" />
               </div>
               <img class="continue-button hover-button" src="<?php echo PLUGIN_DIR ?>images/continue.png?v=3.9" alt="" />
            </div>
            <div id="how-to-explore-climate-layer" class="how-to-dialog" title="Climate Layer Help Screen">
               <div class="how-to-container">
                  <img class="img1" src="<?php echo PLUGIN_DIR ?>images/climate_layers_screen_1.png?v=3.9" alt="Explore Climate Layers" />
                  <img class="img2" src="<?php echo PLUGIN_DIR ?>images/climate_layers_screen2.png?v=3.9" alt="Explore Climate Layers" />
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
                  <img class="arrow-01" src="<?php echo PLUGIN_DIR ?>images/climate_layer_arrow1.png?v=3.9" alt="" />
                  <img class="arrow-02" src="<?php echo PLUGIN_DIR ?>images/climate_layer_arrow2.png?v=3.9" alt="" />
                  <img class="arrow-03" src="<?php echo PLUGIN_DIR ?>images/climate_layer_arrow3.png?v=3.9" alt="" />
               </div>
               <img class="continue-button hover-button" src="<?php echo PLUGIN_DIR ?>images/continue.png?v=3.9" alt=""
                    id="continue-explore-climate-layer" />
            </div>
            <div id="how-to-screen" class="how-to-dialog" title="Welcome to the Lifemapper Web Application.  You can ...">
               <div class="how-to-container">
                  <div class="help-section help-explore-archive">
                     <img src="<?php echo PLUGIN_DIR ?>images/explore_dialog.png?v=3.9" alt="" />
                     <div class="help-title">
                        Explore the Species Archive
                     </div>
                     <div class="help-section-text">
                        This includes GBIF species distribution data, and any existing current day and future projections.
                     </div>
                     <img src="<?php echo PLUGIN_DIR ?>images/species_archive.png?v=3.9" alt="Species Archive" class="hover-button species-archive-button" />
                  </div>
                  <div class="help-section help-explore-climate-layers">
                     <img src="<?php echo PLUGIN_DIR ?>images/explore_dialog.png?v=3.9" alt="" />
                     <div class="help-title">
                        Explore the Climate Layers
                     </div>
                     <div class="help-section-text">
                        This includes high resolution climate layers available through Lifemapper Web Services.
                     </div>
                     <img src="<?php echo PLUGIN_DIR ?>images/climate_layers.png?v=3.9" alt="Climate Layers" class="hover-button climate-selection-button" />
                  </div>
                  <div class="help-section help-create-model">
                     <img src="<?php echo PLUGIN_DIR ?>images/create_dialog.png?v=3.9" alt="" />
                     <div class="help-title">
                        Create a new Experiment
                     </div>
                     <div class="help-section-text">
                        Choose species data (or upload data), an algorithm and low resolution climate set to create projections.
                     </div>
                     <img src="<?php echo PLUGIN_DIR ?>images/new_experiment.png?v=3.9" alt="New Experiment" class="hover-button create-experiment-button" />
                  </div>
               </div>
            </div>
            <div id="how-to-view-experiment" class="how-to-dialog" title="My Experiment Help">
               <div class="how-to-container">
                  <img class="img1" src="<?php echo PLUGIN_DIR ?>images/my_experiments_screen1.png?v=3.9" alt="View an experiment" /><br />
                  <img class="img2" src="<?php echo PLUGIN_DIR ?>images/my_experiments_screen2.png?v=3.9" alt="View an experiment" /><br />
                  <div class="text1">
                     This dialog allows you to view your new experiments for each browser
                     session. Closing the browser will clear the cache. To view an experiment from a
                     previous session simply enter the Experiment Number in the box provided. Experiments will be available for 2 weeks.
                  </div>
                  <div class="text2">
                     1. Enter an Existing Experiment number.
                  </div>
                  <div class="text3">
                     2. Click on a New Experiment while it is processing to check the status.
                  </div>
                  <div class="text4">
                     3. Click on an Experiment.<br />...<br />
                     Species Occurrence points will display on the map.
                  </div>
                  <div class="text5">
                     4. Click on a projection.<br />...<br />
                     The projection layer will display on the map.
                  </div>
                  <img class="arrow-01" src="<?php echo PLUGIN_DIR ?>images/my_experiment_arrow1.png?v=3.9" alt="" />
                  <img class="arrow-02" src="<?php echo PLUGIN_DIR ?>images/my_experiment_arrow2.png?v=3.9" alt="" />
                  <img class="arrow-03" src="<?php echo PLUGIN_DIR ?>images/my_experiment_arrow3.png?v=3.9" alt="" />
                  <img class="arrow-04" src="<?php echo PLUGIN_DIR ?>images/my_experiment_arrow4.png?v=3.9" alt="" />
                  <img class="continue-button" src="<?php echo PLUGIN_DIR ?>images/continue.png?v=3.9" alt="" id="continue-my-experiment" />
               </div>
            </div>
            <div id="species-archive" title="Explore Species Archive" class="tabpage">
               <div class="search">
                  <div class="search-input-container">
                     <span>Species:</span>
                     <input type="text" name="species" class="search_input" value="" title="Species Name" />
                     <div class="species_toolbar">
                        <a class="google_images tooltip" target="_blank" href="http://www.google.com/search?tbm=isch&amp;hl=en&amp;source=hp&amp;biw=1366&amp;bih=707&amp;q=[speciesname]+species&amp;gbv=2&amp;oq=parkia+species&amp;aq=f&amp;aqi=g-S1&amp;aql=&amp;gs_l=img.3..0i24.3641.6362.0.6580.16.14.1.0.0.0.174.1321.10j4.14.0.tshc..0.0.JcNS1Ye1634">
                           <img src="<?php echo PLUGIN_DIR ?>images/google_images.png?v=3.9" alt="Google Images" />
                           <span class="tooltip-text">Google Images</span>
                        </a> 
                        <a class="ge_button tooltip" href="http://svc.lifemapper.org/services/sdm/occurrences/3835076/kml">
                           <img src="<?php echo PLUGIN_DIR ?>images/ge_button.png?v=3.9" alt="Google Earth" style="border: 0px;" />
                           <span class="tooltip-text">Google Earth</span>
                        </a> 
                        <a class="tooltip" href="#">
                           <img src="<?php echo PLUGIN_DIR ?>images/help_button.png?v=3.9" class="existing-search-button help-button" alt="Help" />
                           <span class="tooltip-text">Help</span>
                        </a>
                     </div>
                  </div>
                  <div class="search_result search_result_container">
                  </div>
               </div>
               <div class="species_list">
                  <h4 class="title" style="display: none;"><input type="checkbox" class="show_points"/> Points</h4>
               </div>
            </div>
            <div id="my-experiment" class="my-experiment tabpage" title="My Experiments">
               <div>
                  <h4>New
                     <img class="my_experiment_new_help_button help-button"
                        id="my-experiment-new-button" src="<?php echo PLUGIN_DIR ?>images/help_button.png?v=3.9" alt="Help" />
                  </h4>
                  <div class="new-experiment-list experiment-list">
                  </div>
                  <h4>Previous
                     <img class="my_experiment_help_button help-button"
                        id="my-experiment-button" src="<?php echo PLUGIN_DIR ?>images/help_button.png?v=3.9" alt="Help" />
                  </h4>
                  <label>Search By Number:</label>
                  <input type="text" class="experiment-input" />
               </div>
               <div class="existing-experiment-list experiment-list">
               </div>
            </div>
            <div id="alert-box">
               <div id="page-alert-message" class="alert-message" title="? Species Help">
                  <b class="alert-title">Lifemapper Species Maps and Models</b><br />
                  <br />
                  The Lifemapper Species Maps and Model (LmSDM) web application is meant to be an
                  introduction to species distribution modeling.<br />
                  <br />
                  For an overview of Lifemapper's approach to SDM please visit the 
                  <a href="<?php echo URL_BASE; ?>?page_id=99">website</a>.<br />
                  <br />
                  The LmSDM web application harnesses the Lifemapper archives and web services and
                  allows you to either search for existing species data, maps and models, or upload
                  your own species data and run a model.
                  <br />
                  <br />
                  Data, maps and models can be downloaded by using the Download button.
               </div>
               <div id="existing-search-message" class="alert-message" title="Species">
                  <b>Search for a Species Occurrence</b>
                  <div>
                     Enter the first 3 letters of a species name, then choose a species from the list
                     of names that appears. A species name is followed by the number of occurrence points
                     and the number of models available.
                  </div>
                  <div>
                     <img src="<?php echo PLUGIN_DIR ?>images/model_numbers.gif" alt="" />
                  </div>
                  <div>
                     <b>Click</b>
                     <img src="<?php echo PLUGIN_DIR ?>images/google_images.png?v=3.9" alt="" />
                     to view images of the species in Google Images
                  </div>
                  <div>
                     <b>Click</b>
                     <img src="<?php echo PLUGIN_DIR ?>images/ge_button.png?v=3.9" alt="" />
                     to view the occurrence data in Google Earth (You must have Google Earth installed
                     on your computer)
                  </div>
                  <div>
                     Occurrence Points will display on the map, with an orange 'pin'.
                  </div>
                  <div>
                     <b>Click</b>
                     <img src="<?php echo PLUGIN_DIR ?>images/pushpin_new.png?v=3.9" alt="" />
                     on a point to view the associated metadata
                  </div>
               </div>
               <div id="existing-models-message" class="alert-message" title="Existing Models">
                  <b>Existing Models</b>
                  <div>
                     Projected species distributions are organized by the algorithm used to create a
                     model, then the climate scenario that model was applied to. The climate scenario
                     is listed with the name of the modeling center that provided the predicted climate
                     data, the IPCC scenario used for the prediction, and the approximate year the climate
                     is predicted for, as in the following example:
                  </div>
                  <div>
                     <img src="<?php echo PLUGIN_DIR ?>images/projection_description.png?v=3.9" alt="" />
                  </div>
                  <div>
                     Information about the algorithms used in Lifemapper models can be found on the 
                     <a href="http://openmodeller.sourceforge.net/index.php?option=com_content&amp;task=category&amp;sectionid=2&amp;id=1&amp;Itemid=4">openModeller</a>
                     website.
                  </div>
                  <div>
                     <b>CRU:</b> The Climatic Research Unit of the University of East Anglia provides
                     climate layers based on Observed Climate information. More information can be found
                     on the <a href="http://www.cru.uea.ac.uk/home">CRU Website</a>.
                  </div>
                  <div>
                     <b>Hadley:</b> The Met Office Hadley Centre is one of the UK’s foremost climate
                     change research centres. More information can be found on the 
                     <a href="http://www.metoffice.gov.uk/climate-change/resources/hadley">
                        Hadley website
                     </a>.
                  </div>  
                  <div>
                     A simplified description and comparison of the IPCC scenarios Lifemapper uses is
                     below. More detailed descriptions are available on the 
                     <a href="http://openmodeller.sourceforge.net/index.php?option=com_content&amp;task=cateogry&amp;sectionid=2&amp;id=1&amp;Itemid=4"
                         target="_blank">IPCC</a> website.
                  </div>
                  <div>
                     <b>B1:</b> a convergent world with the same global population as in the A1 storyline
                     but with rapid changes in economic structures toward a service and information economy,
                     with reductions in materials intensity, and the introduction of clean and resource
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
               </div>
               <div id="create-choose-species-message" class="alert-message" title="Choose a Species Occurrence">
                  <div>
                     Upload a point data set or choose species occurrence data from the 
                     <a href=" http://www.gbif.org/">Global Biodiversity Information Facility (GBIF)</a>.
                  </div>
               </div>
               <div id="create-epsg-code-message" class="alert-message" title="EPSG">
                  <div>
                     Lifemapper can only accept files with an EPSG code of 4326 through the website.
                     This is the code for unprojected data, with latitude and longitude measured in decimal
                     degrees. If you wish to calculate models with projected data, download our 
                     <a href="http://www.qgis.org/">QGIS-Lifemapper plugin</a> 
                     or access our webservices programmatically.
                  </div>
               </div>
               <div id="create-search-message" class="alert-message" title="Choose a Species Occurrence">
                  <div>
                     Enter the first 3 letters of a species name, then choose a species from the list
                     of names that appears.
                  </div>
                  <div>
                     <img src="<?php echo PLUGIN_DIR ?>images/model_numbers.gif" alt="" />
                  </div>
                  <div>
                     <img src="<?php echo PLUGIN_DIR ?>images/google_images.png?v=3.9" alt="" />
                     <b>Click</b> to view images of the species in Google Images
                  </div>
                  <div>
                     <img src="<?php echo PLUGIN_DIR ?>images/ge_button.png?v=3.9" alt="" />
                     <b>Click</b> to view the occurrence data in Google Earth (You must have Google Earth
                     installed on your computer)
                  </div>
                  <div>
                     Occurrence Points will display on the map:
                  </div>
                  <div>
                     <img src="<?php echo PLUGIN_DIR ?>images/data_point.png?v=3.9" alt="" />
                     <b>Click</b> on a point to view the associated metadata
                  </div>
               </div>
               <div id="create-import-file-message" class="alert-message" title="Import Species File">
                  We can accept points as either a CSV or shapefile formats. Shapefile must be zipped into a single zip file.<br />
                  <br />
                    
                  If you wish to upload points in CSV format, it is strongly recommended that you
                  include a header row in your CSV file. If you do not include a header row, then
                  the minimum required fields will be assumed (localId, longitude, latitude) Sample
                  Minimum CSV Points. <a href="http://lifemapper.org/samples/samplePoints.csv">CSV Sample</a><br />
                 
               </div>
               <div id="create-algorithm-message" class="alert-message" title="Choose an Algorithm">
                  <div>
                     The algorithms used in the Lifemapper Species Distribution web application use default
                     parameters. If you wish to modify algorithm parameters, download our 
                     <a href="http://www.qgis.org/" target="_blank">QGIS-Lifemapper plugin</a> 
                     or access our webservices programmatically.  More information about algorithms can be found 
                     <a href="http://openmodeller.sourceforge.net/index.php?option=com_content&amp;task=category&amp;sectionid=2&amp;id=1&amp;Itemid=4">
                        here.
                     </a>
                  </div>
               </div>
               <div id="create-environmental-set-message" class="alert-message" title="Choose an Environmental Set">
                  <div>
                     Models computed on the Lifemapper website are limited to using low resolution (10-15
                     minute) observed climate layer sets provided by the Climate Research Unit (CRU)
                     and predicted future climate layers provided by Hadley Centre for Climate Prediction
                     and Research (Hadley). If you wish to use Lifemapper-provided high resolution layers,
                     or your own environmental layers, download our 
                     <a href="http://www.qgis.org/">QGIS-Lifemapper plugin</a> or access our webservices programmatically.<br />
                     <br />
                     Projected species distributions are organized by the algorithm used to create a
                     model, then the climate scenario that model was applied to. The climate scenario
                     is listed with the name of the modeling center that provided the predicted climate
                     data, the IPCC scenario used for the prediction, and the approximate year the climate
                     is predicted for, as in the following example:
                  </div>
                  <div>
                     <img src="<?php echo PLUGIN_DIR ?>images/projection_description.png" alt="" />
                  </div>
                  <div>
                     <b>CRU:</b> The Climatic Research Unit of the University of East Anglia provides
                     climate layers based on Observed Climate information. More information can be found
                     on the <a href="http://www.cru.uea.ac.uk/home">CRU Website</a>.
                  </div>
                  <div>
                     <b>Hadley:</b> The Met Office Hadley Centre is one of the UK’s foremost climate
                     change research centres. More information can be found on the 
                     <a href="http://www.metoffice.gov.uk/climate-change/resources/hadley">Hadley website</a>.
                  </div>
                  <div>
                     A simplified description and comparison of the IPCC scenarios Lifemapper uses is
                     below. More detailed descriptions are available on the 
                     <a href="http://openmodeller.sourceforge.net/index.php?option=com_content&amp;task=cateogry&amp;sectionid=2&amp;id=1&amp;Itemid=4"
                            target="_blank">IPCC</a> website.
                  </div>
                  <div>
                     <b>A2:</b> a very heterogeneous world with continuously increasing global population
                     and regionally oriented economic growth that is more fragmented and slower than
                     in other storylines.
                  </div>
                  <div>
                     <b>A1B:</b> a future world of very rapid economic growth, global population that
                     peaks in mid-century and declines thereafter, and rapid introduction of new and
                     more efficient technologies.
                  </div>
                  <div>
                     <b>B1:</b> a convergent world with the same global population as in the A1 storyline
                     but with rapid changes in economic structures toward a service and information economy,
                     with reductions in materials intensity, and the introduction of clean and resource
                     efficient technologies.
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
               </div>
               <div id="create-email-message" class="alert-message" title="Email">
                  <div>
                     Experiments can take several minutes to complete based on the number of species
                     occurrence points and number of jobs in the Lifemapper pipeline. Lifemapper will
                     send you an email when your experiment is submitted as well as when it is complete
                     so you may return to an Experiments web page and explore your projections.
                  </div>
               </div>
               <div id="epsg-code-message" class="alert-message" title="EPSG">
                  Lifemapper may only use climate layers that include an EPSG of 4326.
               </div>
               <div id="my-experiments-message" class="alert-message" title="My Experiments">
                  <div>
                     Enter the Experiment Number of an Existing Experiment.
                  </div>
                  <div>
                     <img src="<?php echo PLUGIN_DIR ?>images/expand.png" alt="" />
                     Click the Expand button to view Experiment details.
                  </div>
                  <div>
                     <img src="<?php echo PLUGIN_DIR ?>images/delete.png" alt="" />
                     Click the Remove button to remove the Experiment from the list.
                  </div>
                  <div>
                     <b>Experiment Status Buttons</b>
                  </div>
                  <div>
                     <table cellpadding="0" cellspacing="0" class="experiment-legend">
                        <tbody>
                           <tr>
                              <td>
                                 <img src="<?php echo PLUGIN_DIR ?>images/initialize_icon.png" alt="Initialize" />
                              </td>
                              <td>
                                 Initialize
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <img src="<?php echo PLUGIN_DIR ?>images/processing_icon.png" alt="Processing" />
                              </td>
                              <td>
                                 Processing
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <img src="<?php echo PLUGIN_DIR ?>images/error_button.png" alt="Error" />
                              </td>
                              <td>
                                 Error
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <img src="<?php echo PLUGIN_DIR ?>images/no_matches_experiment.png" alt="Invalid Experiment Number" />
                              </td>
                              <td>
                                 Invalid Experiment Number
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>
               <div id="my-experiments-new-message" class="alert-message" title="My Experiments">
                  <div>
                     Enter the Experiment Number of an Existing Experiment.
                  </div>
                  <div>
                     <img src="<?php echo PLUGIN_DIR ?>images/expand.png" alt="" />
                     Click the Expand button to view Experiment details.
                  </div>
                  <div>
                     <img src="<?php echo PLUGIN_DIR ?>images/delete.png" alt="" />
                     Click the Remove button to remove the Experiment from the list.
                  </div>
                  <div>
                     <b>Experiment Status Buttons</b>
                  </div>
                  <div>
                     <table cellpadding="0" cellspacing="0" class="experiment-legend">
                        <tbody>
                           <tr>
                              <td>
                                 <img src="<?php echo PLUGIN_DIR ?>images/initialize_icon.png" alt="Initialize" />
                              </td>
                              <td>
                                 Initialize
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <img src="<?php echo PLUGIN_DIR ?>images/processing_icon.png" alt="Processing" />
                              </td>
                              <td>
                                 Processing
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <img src="<?php echo PLUGIN_DIR ?>images/error_button.png" alt="Error" />
                              </td>
                              <td>
                                 Error
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <img src="<?php echo PLUGIN_DIR ?>images/no_matches_experiment.png" alt="Invalid Experiment Number" />
                              </td>
                              <td>
                                 Invalid Experiment Number
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>
               <div id="upload-error-message" class="alert-message" title="Upload Error">
                  Please choose a CSV<br/>zipped shapefile to upload.<br/>
                  <img class="hover-button upload-error-message-close" src="<?php echo PLUGIN_DIR ?>images/ok.png?v=3.9" alt="OK"/>
               </div>
               <div id="upload-bad-file-message" class="alert-message" title="Upload Error">
                  There was an error uploading your file.<br/>
                  Please use a csv or zipped shapefile.
                  <br/><br/>
                  <img class="hover-button upload-bad-file-message-close" src="<?php echo PLUGIN_DIR ?>images/ok.png?v=3.9" alt="OK"/>
                  <img class="create-import-file-button help-button upload-bad-file-message-help" id="error-create-choose-species-button" src="<?php echo PLUGIN_DIR ?>images/help_button.png?v=3.9" alt="Help" />
               </div>
            </div>
            <div id="page-toolbar">
               <div id="page-links">
                  <img src="<?php echo PLUGIN_DIR ?>images/species_archive.png?v=3.9" class="hover-button species-archive-button"
                        alt="Species Archive" />
                  <img src="<?php echo PLUGIN_DIR ?>images/climate_layers.png?v=3.9" class="hover-button climate-selection-button"
                        alt="Climate Layers" />
                  <img src="<?php echo PLUGIN_DIR ?>images/new_experiment.png?v=3.9" class="hover-button create-experiment-button"
                        alt="New Experiment" />
                  <img src="<?php echo PLUGIN_DIR ?>images/my_experiment.png?v=3.9" class="hover-button my-experiment-button"
                        alt="My Experiments" />
               </div>
            </div>
        </div>
<?php get_footer(); ?>
