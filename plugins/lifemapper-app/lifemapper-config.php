<?php

/* Read configuration file */
$ini = parse_ini_file("config.ini");



/* Configuration Constants */
/*
define('URL_BASE', '/');
define('PLUGIN_DIR', URL_BASE . 'wp-content/plugins/lifemapper-app/');
define('IMAGE_DIR', URL_BASE . 'wp-includes/images/');
define('THEME_DIR', URL_BASE . 'wp-content/themes/lifemapper/');
define('WEBSERVICES_ROOT', 'http://svc.lifemapper.org/');
*/
define('URL_BASE', $ini['URL_BASE']);
define('PLUGIN_DIR', URL_BASE . $ini['PLUGIN_DIR']);
define('IMAGE_DIR', URL_BASE . $ini['IMAGE_DIR']);
define('THEME_DIR', URL_BASE . $ini['THEME_DIR']);
define('WEBSERVICES_ROOT', $ini['WEBSERVICES_ROOT']);
?>
