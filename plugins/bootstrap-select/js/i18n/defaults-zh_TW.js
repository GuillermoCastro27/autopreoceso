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
    noneSelectedText: 'æ²’æœ‰é¸å–ä»»ä½•é …ç›®',
    noneResultsText: 'æ²’æœ‰æ‰¾åˆ°ç¬¦åˆçš„çµæžœ',
    countSelectedText: 'å·²ç¶“é¸å–{0}å€‹é …ç›®',
    maxOptionsText: ['è¶…éŽé™åˆ¶ (æœ€å¤šé¸æ“‡{n}é …)', 'è¶…éŽé™åˆ¶(æœ€å¤šé¸æ“‡{n}çµ„)'],
    selectAllText: 'é¸å–å…¨éƒ¨',
    deselectAllText: 'å…¨éƒ¨å–æ¶ˆ',
    multipleSeparator: ', '
  };
})(jQuery);


}));

