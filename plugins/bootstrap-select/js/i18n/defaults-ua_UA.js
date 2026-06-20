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
    noneSelectedText: 'ÐÑ–Ñ‡Ð¾Ð³Ð¾ Ð½Ðµ Ð²Ð¸Ð±Ñ€Ð°Ð½Ð¾',
    noneResultsText: 'Ð—Ð±Ñ–Ð³Ñ–Ð² Ð½Ðµ Ð·Ð½Ð°Ð¹Ð´ÐµÐ½Ð¾ {0}',
    countSelectedText: 'Ð’Ð¸Ð±Ñ€Ð°Ð½Ð¾ {0} Ñ–Ð· {1}',
    maxOptionsText: ['Ð”Ð¾ÑÑÐ³Ð½ÑƒÑ‚Ð° Ð¼ÐµÐ¶Ð° ({n} {var} Ð¼Ð°ÐºÑÐ¸Ð¼ÑƒÐ¼)', 'Ð”Ð¾ÑÑÐ³Ð½ÑƒÑ‚Ð° Ð¼ÐµÐ¶Ð° Ð² Ð³Ñ€ÑƒÐ¿Ñ– ({n} {var} Ð¼Ð°ÐºÑÐ¸Ð¼ÑƒÐ¼)', ['items', 'item']],
    multipleSeparator: ', '
  };
})(jQuery);


}));

