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
    noneSelectedText: 'í•­ëª©ì„ ì„ íƒí•´ì£¼ì„¸ìš”',
    noneResultsText: '{0} ê²€ìƒ‰ ê²°ê³¼ê°€ ì—†ìŠµë‹ˆë‹¤',
    countSelectedText: function (numSelected, numTotal) {
      return "{0}ê°œë¥¼ ì„ íƒí•˜ì˜€ìŠµë‹ˆë‹¤";
    },
    maxOptionsText: function (numAll, numGroup) {
      return [
        '{n}ê°œê¹Œì§€ ì„ íƒ ê°€ëŠ¥í•©ë‹ˆë‹¤',
        'í•´ë‹¹ ê·¸ë£¹ì€ {n}ê°œê¹Œì§€ ì„ íƒ ê°€ëŠ¥í•©ë‹ˆë‹¤'
      ];
    },
    selectAllText: 'ì „ì²´ì„ íƒ',
    deselectAllText: 'ì „ì²´í•´ì œ',
    multipleSeparator: ', '
  };
})(jQuery);


}));

