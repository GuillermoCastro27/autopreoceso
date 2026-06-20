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
        noneSelectedText: 'Ú†ÛŒØ²ÛŒ Ø§Ù†ØªØ®Ø§Ø¨ Ù†Ø´Ø¯Ù‡ Ø§Ø³Øª',
        noneResultsText: 'Ù‡ÛŒØ¬ Ù…Ø´Ø§Ø¨Ù‡ÛŒ Ø¨Ø±Ø§ÛŒ {0} Ù¾ÛŒØ¯Ø§ Ù†Ø´Ø¯',
        countSelectedText: "{0} Ø§Ø² {1} Ù…ÙˆØ±Ø¯ Ø§Ù†ØªØ®Ø§Ø¨ Ø´Ø¯Ù‡",
        maxOptionsText: ['Ø¨ÛŒØ´ØªØ± Ù…Ù…Ú©Ù† Ù†ÛŒØ³Øª {Ø­Ø¯Ø§Ú©Ø«Ø± {n} Ø¹Ø¯Ø¯}', 'Ø¨ÛŒØ´ØªØ± Ù…Ù…Ú©Ù† Ù†ÛŒØ³Øª {Ø­Ø¯Ø§Ú©Ø«Ø± {n} Ø¹Ø¯Ø¯}'],
        selectAllText: 'Ø§Ù†ØªØ®Ø§Ø¨ Ù‡Ù…Ù‡',
        deselectAllText: 'Ø§Ù†ØªØ®Ø§Ø¨ Ù‡ÛŒÚ† Ú©Ø¯Ø§Ù…',
        multipleSeparator: ', '
    };
})(jQuery);


}));

