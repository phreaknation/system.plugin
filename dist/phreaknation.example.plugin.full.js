(function() {
  'use strict';

  var __modulename = 'example_plugin';
  var __pluginname = 'ExamplePlugin';
  var __version = [0, 0, 1];
  var __description = 'This is just an example plugin.';
  var __author = 'Joel Dies <phreaknation@gmail.com>';

  var __schemas = {};

  var plugin = function(game, parent) {
    Phaser.Plugin.call(this, game, parent);
    if (typeof console.error === 'undefined') console.error = console.log;
    this.game = game;
    this.parent = parent;
    this.schemas = __schemas;
    return this;
  };

  plugin.prototype = Object.create(Phaser.Plugin.prototype);
  plugin.prototype.constructor = Phaser.Plugin.SamplePlugin;

  plugin.prototype.description = function description() {
    return _.toTitleCase(_.replace(__modulename, /\_/g, ' ')) + ' plugin by ' + __author + '. ' + __description;
  };

  plugin.prototype.test = function test(str) {
    return 'This is an example of how to return a string. ' + str;
  };

  plugin.prototype.version = function version() {
    return __version.join('.');
  };


  window.PhreakNation = window.PhreakNation || {};
  window.PhreakNation.Plugins = window.PhreakNation.Plugins || {};
  window.PhreakNation.Plugins[__pluginname] = plugin;
})();