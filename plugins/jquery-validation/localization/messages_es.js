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
 * Locale: ES (Spanish; EspaÃ±ol)
 */
$.extend( $.validator.messages, {
	required: "Este campo es obligatorio.",
	remote: "Por favor, rellena este campo.",
	email: "Por favor, escribe una direcciÃ³n de correo vÃ¡lida.",
	url: "Por favor, escribe una URL vÃ¡lida.",
	date: "Por favor, escribe una fecha vÃ¡lida.",
	dateISO: "Por favor, escribe una fecha (ISO) vÃ¡lida.",
	number: "Por favor, escribe un nÃºmero vÃ¡lido.",
	digits: "Por favor, escribe sÃ³lo dÃ­gitos.",
	creditcard: "Por favor, escribe un nÃºmero de tarjeta vÃ¡lido.",
	equalTo: "Por favor, escribe el mismo valor de nuevo.",
	extension: "Por favor, escribe un valor con una extensiÃ³n aceptada.",
	maxlength: $.validator.format( "Por favor, no escribas mÃ¡s de {0} caracteres." ),
	minlength: $.validator.format( "Por favor, no escribas menos de {0} caracteres." ),
	rangelength: $.validator.format( "Por favor, escribe un valor entre {0} y {1} caracteres." ),
	range: $.validator.format( "Por favor, escribe un valor entre {0} y {1}." ),
	max: $.validator.format( "Por favor, escribe un valor menor o igual a {0}." ),
	min: $.validator.format( "Por favor, escribe un valor mayor o igual a {0}." ),
	nifES: "Por favor, escribe un NIF vÃ¡lido.",
	nieES: "Por favor, escribe un NIE vÃ¡lido.",
	cifES: "Por favor, escribe un CIF vÃ¡lido."
} );

}));
