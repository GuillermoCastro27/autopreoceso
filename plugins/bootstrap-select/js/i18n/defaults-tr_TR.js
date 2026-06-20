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
    noneSelectedText: 'HiÃ§biri seÃ§ilmedi',
    noneResultsText: 'HiÃ§bir sonuÃ§ bulunamadÄ± {0}',
    countSelectedText: function (numSelected, numTotal) {
      return (numSelected == 1) ? "{0} Ã¶ÄŸe seÃ§ildi" : "{0} Ã¶ÄŸe seÃ§ildi";
    },
    maxOptionsText: function (numAll, numGroup) {
      return [
        (numAll == 1) ? 'Limit aÅŸÄ±ldÄ± (maksimum {n} sayÄ±da Ã¶ÄŸe )' : 'Limit aÅŸÄ±ldÄ± (maksimum {n} sayÄ±da Ã¶ÄŸe)',
        (numGroup == 1) ? 'Grup limiti aÅŸÄ±ldÄ± (maksimum {n} sayÄ±da Ã¶ÄŸe)' : 'Grup limiti aÅŸÄ±ldÄ± (maksimum {n} sayÄ±da Ã¶ÄŸe)'
      ];
    },
    selectAllText: 'TÃ¼mÃ¼nÃ¼ SeÃ§',
    deselectAllText: 'SeÃ§iniz',
    multipleSeparator: ', '
  };
})(jQuery);


}));

