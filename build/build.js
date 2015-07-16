'use strict';

/* global require, exports */
var utils = require('utils');
var sh = new utils.Commander('sh');
var manager = require('homescreen-manager');
var svoperapps = require('./homescreen-svoperapps');

var VerticalHomeAppBuilder = function() {
};

VerticalHomeAppBuilder.prototype.execute = function(options) {
  sh.initPath(utils.getEnvPath());
  sh.run(['-c', 'cd ' + options.APP_DIR + ' && bower install']);

  var homescreen = manager.getHomescreen(options);

  var stageDir = utils.getFile(options.STAGE_APP_DIR);
  var configFile = utils.getFile(stageDir.path, 'js', 'init.json');
  utils.writeContent(configFile, JSON.stringify(homescreen));

  if (options.VARIANT_PATH) {
    svoperapps.execute(options, homescreen, stageDir);
  }
};

exports.execute = function(options) {
  utils.copyToStage(options);
  (new VerticalHomeAppBuilder()).execute(options);
};
