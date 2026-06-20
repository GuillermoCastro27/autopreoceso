(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery", "../jquery.validate"], factory );
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory( require( "jquery" ) );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: VI (Vietnamese; Tiáº¿ng Viá»‡t)
 */
$.extend( $.validator.messages, {
	required: "HÃ£y nháº­p.",
	remote: "HÃ£y sá»­a cho Ä‘Ãºng.",
	email: "HÃ£y nháº­p email.",
	url: "HÃ£y nháº­p URL.",
	date: "HÃ£y nháº­p ngÃ y.",
	dateISO: "HÃ£y nháº­p ngÃ y (ISO).",
	number: "HÃ£y nháº­p sá»‘.",
	digits: "HÃ£y nháº­p chá»¯ sá»‘.",
	creditcard: "HÃ£y nháº­p sá»‘ tháº» tÃ­n dá»¥ng.",
	equalTo: "HÃ£y nháº­p thÃªm láº§n ná»¯a.",
	extension: "Pháº§n má»Ÿ rá»™ng khÃ´ng Ä‘Ãºng.",
	maxlength: $.validator.format( "HÃ£y nháº­p tá»« {0} kÃ­ tá»± trá»Ÿ xuá»‘ng." ),
	minlength: $.validator.format( "HÃ£y nháº­p tá»« {0} kÃ­ tá»± trá»Ÿ lÃªn." ),
	rangelength: $.validator.format( "HÃ£y nháº­p tá»« {0} Ä‘áº¿n {1} kÃ­ tá»±." ),
	range: $.validator.format( "HÃ£y nháº­p tá»« {0} Ä‘áº¿n {1}." ),
	max: $.validator.format( "HÃ£y nháº­p tá»« {0} trá»Ÿ xuá»‘ng." ),
	min: $.validator.format( "HÃ£y nháº­p tá»« {1} trá»Ÿ lÃªn." )
} );

}));
