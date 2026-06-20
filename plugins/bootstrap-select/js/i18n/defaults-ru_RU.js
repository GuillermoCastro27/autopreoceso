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
    noneSelectedText: 'ÐÐ¸Ñ‡ÐµÐ³Ð¾ Ð½Ðµ Ð²Ñ‹Ð±Ñ€Ð°Ð½Ð¾',
    noneResultsText: 'Ð¡Ð¾Ð²Ð¿Ð°Ð´ÐµÐ½Ð¸Ð¹ Ð½Ðµ Ð½Ð°Ð¹Ð´ÐµÐ½Ð¾ {0}',
    countSelectedText: 'Ð’Ñ‹Ð±Ñ€Ð°Ð½Ð¾ {0} Ð¸Ð· {1}',
    maxOptionsText: ['Ð”Ð¾ÑÑ‚Ð¸Ð³Ð½ÑƒÑ‚ Ð¿Ñ€ÐµÐ´ÐµÐ» ({n} {var} Ð¼Ð°ÐºÑÐ¸Ð¼ÑƒÐ¼)', 'Ð”Ð¾ÑÑ‚Ð¸Ð³Ð½ÑƒÑ‚ Ð¿Ñ€ÐµÐ´ÐµÐ» Ð² Ð³Ñ€ÑƒÐ¿Ð¿Ðµ ({n} {var} Ð¼Ð°ÐºÑÐ¸Ð¼ÑƒÐ¼)', ['items', 'item']],
    doneButtonText: 'Ð—Ð°ÐºÑ€Ñ‹Ñ‚ÑŒ',
    multipleSeparator: ', '
  };
})(jQuery);


}));

