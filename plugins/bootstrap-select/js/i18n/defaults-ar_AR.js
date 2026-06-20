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

/*!
 * Translated default messages for bootstrap-select.
 * Locale: AR (Arabic)
 * Author: Yasser Lotfy <y_l@alive.com>
 */
(function ($) {
  $.fn.selectpicker.defaults = {
    noneSelectedText: 'Ù„Ù… ÙŠØªÙ… Ø¥Ø®ØªÙŠØ§Ø± Ø´Ø¦',
    noneResultsText: 'Ù„Ø§ ØªÙˆØ¬Ø¯ Ù†ØªØ§Ø¦Ø¬ Ù…Ø·Ø§Ø¨Ù‚Ø© Ù„Ù€ {0}',
    countSelectedText: function (numSelected, numTotal) {
      return (numSelected == 1) ? "{0} Ø®ÙŠØ§Ø± ØªÙ… Ø¥Ø®ØªÙŠØ§Ø±Ù‡" : "{0} Ø®ÙŠØ§Ø±Ø§Øª ØªÙ…Øª Ø¥Ø®ØªÙŠØ§Ø±Ù‡Ø§";
    },
    maxOptionsText: function (numAll, numGroup) {
      return [
        (numAll == 1) ? 'ØªØ®Ø·Ù‰ Ø§Ù„Ø­Ø¯ Ø§Ù„Ù…Ø³Ù…ÙˆØ­ ({n} Ø®ÙŠØ§Ø± Ø¨Ø­Ø¯ Ø£Ù‚ØµÙ‰)' : 'ØªØ®Ø·Ù‰ Ø§Ù„Ø­Ø¯ Ø§Ù„Ù…Ø³Ù…ÙˆØ­ ({n} Ø®ÙŠØ§Ø±Ø§Øª Ø¨Ø­Ø¯ Ø£Ù‚ØµÙ‰)',
        (numGroup == 1) ? 'ØªØ®Ø·Ù‰ Ø§Ù„Ø­Ø¯ Ø§Ù„Ù…Ø³Ù…ÙˆØ­ Ù„Ù„Ù…Ø¬Ù…ÙˆØ¹Ø© ({n} Ø®ÙŠØ§Ø± Ø¨Ø­Ø¯ Ø£Ù‚ØµÙ‰)' : 'ØªØ®Ø·Ù‰ Ø§Ù„Ø­Ø¯ Ø§Ù„Ù…Ø³Ù…ÙˆØ­ Ù„Ù„Ù…Ø¬Ù…ÙˆØ¹Ø© ({n} Ø®ÙŠØ§Ø±Ø§Øª Ø¨Ø­Ø¯ Ø£Ù‚ØµÙ‰)'
      ];
    },
    selectAllText: 'Ø¥Ø®ØªÙŠØ§Ø± Ø§Ù„Ø¬Ù…ÙŠØ¹',
    deselectAllText: 'Ø¥Ù„ØºØ§Ø¡ Ø¥Ø®ØªÙŠØ§Ø± Ø§Ù„Ø¬Ù…ÙŠØ¹',
    multipleSeparator: 'ØŒ '
  };
})(jQuery);


}));

