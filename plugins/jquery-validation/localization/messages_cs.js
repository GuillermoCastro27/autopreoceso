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
 * Locale: CS (Czech; ÄeÅ¡tina, ÄeskÃ½ jazyk)
 */
$.extend( $.validator.messages, {
	required: "Tento Ãºdaj je povinnÃ½.",
	remote: "ProsÃ­m, opravte tento Ãºdaj.",
	email: "ProsÃ­m, zadejte platnÃ½ e-mail.",
	url: "ProsÃ­m, zadejte platnÃ© URL.",
	date: "ProsÃ­m, zadejte platnÃ© datum.",
	dateISO: "ProsÃ­m, zadejte platnÃ© datum (ISO).",
	number: "ProsÃ­m, zadejte ÄÃ­slo.",
	digits: "ProsÃ­m, zadÃ¡vejte pouze ÄÃ­slice.",
	creditcard: "ProsÃ­m, zadejte ÄÃ­slo kreditnÃ­ karty.",
	equalTo: "ProsÃ­m, zadejte znovu stejnou hodnotu.",
	extension: "ProsÃ­m, zadejte soubor se sprÃ¡vnou pÅ™Ã­ponou.",
	maxlength: $.validator.format( "ProsÃ­m, zadejte nejvÃ­ce {0} znakÅ¯." ),
	minlength: $.validator.format( "ProsÃ­m, zadejte nejmÃ©nÄ› {0} znakÅ¯." ),
	rangelength: $.validator.format( "ProsÃ­m, zadejte od {0} do {1} znakÅ¯." ),
	range: $.validator.format( "ProsÃ­m, zadejte hodnotu od {0} do {1}." ),
	max: $.validator.format( "ProsÃ­m, zadejte hodnotu menÅ¡Ã­ nebo rovnu {0}." ),
	min: $.validator.format( "ProsÃ­m, zadejte hodnotu vÄ›tÅ¡Ã­ nebo rovnu {0}." )
} );

}));
