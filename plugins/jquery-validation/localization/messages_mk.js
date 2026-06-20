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
 * Locale: MK (Macedonian; Ð¼Ð°ÐºÐµÐ´Ð¾Ð½ÑÐºÐ¸ Ñ˜Ð°Ð·Ð¸Ðº)
 */
$.extend( $.validator.messages, {
	required: "ÐŸÐ¾Ð»ÐµÑ‚Ð¾ Ðµ Ð·Ð°Ð´Ð¾Ð»Ð¶Ð¸Ñ‚ÐµÐ»Ð½Ð¾.",
	remote: "ÐŸÐ¾Ð¿Ñ€Ð°Ð²ÐµÑ‚Ðµ Ð³Ð¾ Ð¾Ð²Ð° Ð¿Ð¾Ð»Ðµ",
	email: "Ð’Ð½ÐµÑÐµÑ‚Ðµ Ð¿Ñ€Ð°Ð²Ð¸Ð»Ð½Ð° e-mail Ð°Ð´Ñ€ÐµÑÐ°",
	url: "Ð’Ð½ÐµÑÐµÑ‚Ðµ Ð¿Ñ€Ð°Ð²Ð¸Ð»ÐµÐ½ URL.",
	date: "Ð’Ð½ÐµÑÐµÑ‚Ðµ Ð¿Ñ€Ð°Ð²Ð¸Ð»ÐµÐ½ Ð´Ð°Ñ‚ÑƒÐ¼",
	dateISO: "Ð’Ð½ÐµÑÐµÑ‚Ðµ Ð¿Ñ€Ð°Ð²Ð¸Ð»ÐµÐ½ Ð´Ð°Ñ‚ÑƒÐ¼ (ISO).",
	number: "Ð’Ð½ÐµÑÐµÑ‚Ðµ Ð¿Ñ€Ð°Ð²Ð¸Ð»ÐµÐ½ Ð±Ñ€Ð¾Ñ˜.",
	digits: "Ð’Ð½ÐµÑÐµÑ‚Ðµ ÑÐ°Ð¼Ð¾ Ð±Ñ€Ð¾Ñ˜ÐºÐ¸.",
	creditcard: "Ð’Ð½ÐµÑÐµÑ‚Ðµ Ð¿Ñ€Ð°Ð²Ð¸Ð»ÐµÐ½ Ð±Ñ€Ð¾Ñ˜ Ð½Ð° ÐºÑ€ÐµÐ´Ð¸Ñ‚Ð½Ð°Ñ‚Ð° ÐºÐ°Ñ€Ñ‚Ð¸Ñ‡ÐºÐ°.",
	equalTo: "Ð’Ð½ÐµÑÐµÑ‚Ðµ Ñ˜Ð° Ð¸ÑÑ‚Ð°Ñ‚Ð° Ð²Ñ€ÐµÐ´Ð½Ð¾ÑÑ‚ Ð¿Ð¾Ð²Ñ‚Ð¾Ñ€Ð½Ð¾.",
	extension: "Ð’Ð½ÐµÑÐµÑ‚Ðµ Ð²Ñ€ÐµÐ´Ð½Ð¾ÑÑ‚ ÑÐ¾ ÑÐ¾Ð¾Ð´Ð²ÐµÑ‚Ð½Ð° ÐµÐºÑÑ‚ÐµÐ½Ð·Ð¸Ñ˜Ð°.",
	maxlength: $.validator.format( "Ð’Ð½ÐµÑÐµÑ‚Ðµ Ð¼Ð°ÐºÑÐ¸Ð¼Ð°Ð»Ð½Ð¾ {0} Ð·Ð½Ð°Ñ†Ð¸." ),
	minlength: $.validator.format( "Ð’Ð½ÐµÑÐµÑ‚Ðµ Ð±Ð°Ñ€ÐµÐ¼ {0} Ð·Ð½Ð°Ñ†Ð¸." ),
	rangelength: $.validator.format( "Ð’Ð½ÐµÑÐµÑ‚Ðµ Ð²Ñ€ÐµÐ´Ð½Ð¾ÑÑ‚ ÑÐ¾ Ð´Ð¾Ð»Ð¶Ð¸Ð½Ð° Ð¿Ð¾Ð¼ÐµÑ“Ñƒ {0} Ð¸ {1} Ð·Ð½Ð°Ñ†Ð¸." ),
	range: $.validator.format( "Ð’Ð½ÐµÑÐµÑ‚Ðµ Ð²Ñ€ÐµÐ´Ð½Ð¾ÑÑ‚ Ð¿Ð¾Ð¼ÐµÑ“Ñƒ {0} Ð¸ {1}." ),
	max: $.validator.format( "Ð’Ð½ÐµÑÐµÑ‚Ðµ Ð²Ñ€ÐµÐ´Ð½Ð¾ÑÑ‚ Ð¿Ð¾Ð¼Ð°Ð»Ð° Ð¸Ð»Ð¸ ÐµÐ´Ð½Ð°ÐºÐ²Ð° Ð½Ð° {0}." ),
	min: $.validator.format( "Ð’Ð½ÐµÑÐµÑ‚Ðµ Ð²Ñ€ÐµÐ´Ð½Ð¾ÑÑ‚ Ð¿Ð¾Ð³Ð¾Ð»ÐµÐ¼Ð° Ð¸Ð»Ð¸ ÐµÐ´Ð½Ð°ÐºÐ²Ð° Ð½Ð° {0}" )
} );

}));
