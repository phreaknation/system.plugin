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
