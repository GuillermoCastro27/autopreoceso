/*!
 * Bootstrap-select v1.10.0 (http://silviomoreto.github.io/bootstrap-select)
 *
 * Copyright 2013-2016 bootstrap-select
 * Licensed under MIT (https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE)
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["jquery"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    factory(jQuery);
  }
}(this, function (jQuery) {

(function ($) {
  $.fn.selectpicker.defaults = {
    noneSelectedText: 'Aucune sÃ©lection',
    noneResultsText: 'Aucun rÃ©sultat pour {0}',
    countSelectedText: function (numSelected, numTotal) {
      return (numSelected > 1) ? "{0} Ã©lÃ©ments sÃ©lectionnÃ©s" : "{0} Ã©lÃ©ment sÃ©lectionnÃ©";
    },
    maxOptionsText: function (numAll, numGroup) {
      return [
        (numAll > 1) ? 'Limite atteinte ({n} Ã©lÃ©ments max)' : 'Limite atteinte ({n} Ã©lÃ©ment max)',
        (numGroup > 1) ? 'Limite du groupe atteinte ({n} Ã©lÃ©ments max)' : 'Limite du groupe atteinte ({n} Ã©lÃ©ment max)'
      ];
    },
    multipleSeparator: ', ',
    selectAllText: 'Tout SÃ©lectionner',
    deselectAllText: 'Tout DÃ©-selectionner',
  };
})(jQuery);


}));

