'use strict';

var Homescreen = require('./lib/home2');
var Actions = require('marionette-client').Actions;
var System = require('../../../../apps/system/test/marionette/lib/system');

marionette('Statusbar', function() {
  var home, system;
  var client = marionette.client({
    settings: {
      'ftu.manifestURL': null,
      'lockscreen.enabled': false,
      'homescreen.manifestURL':
        'app://verticalhome.gaiamobile.org/manifest.webapp'
    }
  });

  setup(function() {
    home = new Homescreen(client);
    system = new System(client);
    system.waitForStartup();
    client.apps.switchToApp(Homescreen.URL);
  });

  suite(' Scrolling > ', function() {
    test(' The statusbar changes the appearance properly', function() {
      var body = client.helper.waitForElement('body');
      var actions = new Actions(client);
      actions.flick(body, 200, 300, 200, 200);
      actions.perform();
      client.helper.wait(2000); // Waiting for scroll animation
      client.switchToFrame();
      client.waitFor(function() {
        return home.containsClass(System.Selector.statusbarBackground,
               'opaque');
      });

      client.apps.switchToApp(Homescreen.URL);
      actions.flick(body, 200, 200, 200, 300);
      actions.perform();
      client.helper.wait(2000); // Waiting for scroll animation
      client.switchToFrame();
      client.waitFor(function() {
        return !home.containsClass(System.Selector.statusbarBackground,
               'opaque');
      });
    });
  });
});
