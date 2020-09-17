'use strict';

/**
 * Qlik application entrypoint.
 */
(function($, Drupal) {

  Drupal.behaviors.dss_qlik = {
    attachedQlik: false,
    attach: function(context, settings) {
      if (!this.attachedQlik) {
        this.attachQlikClient(settings.QlikConfig);
        this.attachedQlik = true;
      }
    },

    /**
     * Inject the qlik client.
     */
    attachQlikClient: function(settings) {
      var config = {
        host: 'qap.dss.gov.au',
        prefix: '/',
        port: 443,
        isSecure: !0
      };

      require.config({
        baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
      });

      // Set the announcer first.
      QlikApp.App._component.setAnnouncer(
        QlikApp.Announcer._component
      );

      require(['js/qlik'], function(qlik) {
        QlikApp.App._component.setClient(
          qlik.openApp(settings['object_id'], config)
        )

        qlik.on('error', function(event) {
          console.log(event)
        });

        qlik.on('warning', function(event) {
          console.log(event)
        });

        qlik.on('closed', function(event) {
          console.log(event)
        });
      },
      // Handle all errors
      function(error) {
        QlikApp.App._component.setError(
          error
        );
      });
    }
  }
}(jQuery, Drupal));
