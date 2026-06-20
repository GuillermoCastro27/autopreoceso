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
 * Locale: SR (Serbian; ÑÑ€Ð¿ÑÐºÐ¸ Ñ˜ÐµÐ·Ð¸Ðº)
 */
$.extend( $.validator.messages, {
	required: "ÐŸÐ¾Ñ™Ðµ Ñ˜Ðµ Ð¾Ð±Ð°Ð²ÐµÐ·Ð½Ð¾.",
	remote: "Ð¡Ñ€ÐµÐ´Ð¸Ñ‚Ðµ Ð¾Ð²Ð¾ Ð¿Ð¾Ñ™Ðµ.",
	email: "Ð£Ð½ÐµÑÐ¸Ñ‚Ðµ Ð¸ÑÐ¿Ñ€Ð°Ð²Ð½Ñƒ Ð¸-Ð¼ÐµÑ˜Ð» Ð°Ð´Ñ€ÐµÑÑƒ.",
	url: "Ð£Ð½ÐµÑÐ¸Ñ‚Ðµ Ð¸ÑÐ¿Ñ€Ð°Ð²Ð°Ð½ URL.",
	date: "Ð£Ð½ÐµÑÐ¸Ñ‚Ðµ Ð¸ÑÐ¿Ñ€Ð°Ð²Ð°Ð½ Ð´Ð°Ñ‚ÑƒÐ¼.",
	dateISO: "Ð£Ð½ÐµÑÐ¸Ñ‚Ðµ Ð¸ÑÐ¿Ñ€Ð°Ð²Ð°Ð½ Ð´Ð°Ñ‚ÑƒÐ¼ (ISO).",
	number: "Ð£Ð½ÐµÑÐ¸Ñ‚Ðµ Ð¸ÑÐ¿Ñ€Ð°Ð²Ð°Ð½ Ð±Ñ€Ð¾Ñ˜.",
	digits: "Ð£Ð½ÐµÑÐ¸Ñ‚Ðµ ÑÐ°Ð¼Ð¾ Ñ†Ð¸Ñ„Ðµ.",
	creditcard: "Ð£Ð½ÐµÑÐ¸Ñ‚Ðµ Ð¸ÑÐ¿Ñ€Ð°Ð²Ð°Ð½ Ð±Ñ€Ð¾Ñ˜ ÐºÑ€ÐµÐ´Ð¸Ñ‚Ð½Ðµ ÐºÐ°Ñ€Ñ‚Ð¸Ñ†Ðµ.",
	equalTo: "Ð£Ð½ÐµÑÐ¸Ñ‚Ðµ Ð¸ÑÑ‚Ñƒ Ð²Ñ€ÐµÐ´Ð½Ð¾ÑÑ‚ Ð¿Ð¾Ð½Ð¾Ð²Ð¾.",
	extension: "Ð£Ð½ÐµÑÐ¸Ñ‚Ðµ Ð²Ñ€ÐµÐ´Ð½Ð¾ÑÑ‚ ÑÐ° Ð¾Ð´Ð³Ð¾Ð²Ð°Ñ€Ð°Ñ˜ÑƒÑ›Ð¾Ð¼ ÐµÐºÑÑ‚ÐµÐ½Ð·Ð¸Ñ˜Ð¾Ð¼.",
	maxlength: $.validator.format( "Ð£Ð½ÐµÑÐ¸Ñ‚Ðµ Ð¼Ð°ÑšÐµ Ð¾Ð´ {0} ÐºÐ°Ñ€Ð°ÐºÑ‚ÐµÑ€Ð°." ),
	minlength: $.validator.format( "Ð£Ð½ÐµÑÐ¸Ñ‚Ðµ Ð±Ð°Ñ€ÐµÐ¼ {0} ÐºÐ°Ñ€Ð°ÐºÑ‚ÐµÑ€Ð°." ),
	rangelength: $.validator.format( "Ð£Ð½ÐµÑÐ¸Ñ‚Ðµ Ð²Ñ€ÐµÐ´Ð½Ð¾ÑÑ‚ Ð´ÑƒÐ³Ð°Ñ‡ÐºÑƒ Ð¸Ð·Ð¼ÐµÑ’Ñƒ {0} Ð¸ {1} ÐºÐ°Ñ€Ð°ÐºÑ‚ÐµÑ€Ð°." ),
	range: $.validator.format( "Ð£Ð½ÐµÑÐ¸Ñ‚Ðµ Ð²Ñ€ÐµÐ´Ð½Ð¾ÑÑ‚ Ð¸Ð·Ð¼ÐµÑ’Ñƒ {0} Ð¸ {1}." ),
	max: $.validator.format( "Ð£Ð½ÐµÑÐ¸Ñ‚Ðµ Ð²Ñ€ÐµÐ´Ð½Ð¾ÑÑ‚ Ð¼Ð°ÑšÑƒ Ð¸Ð»Ð¸ Ñ˜ÐµÐ´Ð½Ð°ÐºÑƒ {0}." ),
	min: $.validator.format( "Ð£Ð½ÐµÑÐ¸Ñ‚Ðµ Ð²Ñ€ÐµÐ´Ð½Ð¾ÑÑ‚ Ð²ÐµÑ›Ñƒ Ð¸Ð»Ð¸ Ñ˜ÐµÐ´Ð½Ð°ÐºÑƒ {0}." )
} );

}));
