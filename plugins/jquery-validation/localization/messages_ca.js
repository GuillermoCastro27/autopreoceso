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
 * Locale: CA (Catalan; catalÃ )
 */
$.extend( $.validator.messages, {
	required: "Aquest camp Ã©s obligatori.",
	remote: "Si us plau, omple aquest camp.",
	email: "Si us plau, escriu una adreÃ§a de correu-e vÃ lida",
	url: "Si us plau, escriu una URL vÃ lida.",
	date: "Si us plau, escriu una data vÃ lida.",
	dateISO: "Si us plau, escriu una data (ISO) vÃ lida.",
	number: "Si us plau, escriu un nÃºmero enter vÃ lid.",
	digits: "Si us plau, escriu nomÃ©s dÃ­gits.",
	creditcard: "Si us plau, escriu un nÃºmero de tarjeta vÃ lid.",
	equalTo: "Si us plau, escriu el mateix valor de nou.",
	extension: "Si us plau, escriu un valor amb una extensiÃ³ acceptada.",
	maxlength: $.validator.format( "Si us plau, no escriguis mÃ©s de {0} caracters." ),
	minlength: $.validator.format( "Si us plau, no escriguis menys de {0} caracters." ),
	rangelength: $.validator.format( "Si us plau, escriu un valor entre {0} i {1} caracters." ),
	range: $.validator.format( "Si us plau, escriu un valor entre {0} i {1}." ),
	max: $.validator.format( "Si us plau, escriu un valor menor o igual a {0}." ),
	min: $.validator.format( "Si us plau, escriu un valor major o igual a {0}." )
} );

}));
