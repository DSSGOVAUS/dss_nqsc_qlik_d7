<?php

/**
 * Defines the NDIS Provider Register page controller.
 */
function dss_qlik_page_controller() {
  drupal_set_breadcrumb([
    l('Home', '<front>'),
    l('Resources', 'resources')
  ]);
}

/**
 * Defines the Qlik search page controller.
 */
function dss_qlik_search_controller() {
  drupal_set_breadcrumb([
    l('Home', '<front>'),
    l('Resources', 'resources'),
    l('NDIS Provider Register', 'resources/ndis-provider-register')
  ]);

  return [
    '#theme' => 'dss_qlik_app',
    '#div_id' => DSS_QLIK_DIV_ID,
    '#object_id' => DSS_QLIK_OBJECT_ID
  ];
}
