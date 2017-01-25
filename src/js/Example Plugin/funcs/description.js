plugin.prototype.description = function description()  {
  return _.toTitleCase(_.replace(__modulename, /\_/g, ' ')) + ' plugin by ' + __author + '. ' +  __description;
};
