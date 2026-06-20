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
    noneSelectedText: 'Nic nenÃ­ vybrÃ¡no',
    noneResultsText: 'Å½Ã¡dnÃ© vÃ½sledky {0}',
    countSelectedText: 'OznaÄeno {0} z {1}',
    maxOptionsText: ['Limit pÅ™ekroÄen ({n} {var} max)', 'Limit skupiny pÅ™ekroÄen ({n} {var} max)', ['poloÅ¾ek', 'poloÅ¾ka']],
    multipleSeparator: ', '
  };
})(jQuery);


}));

