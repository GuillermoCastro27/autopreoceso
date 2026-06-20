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
 * Region: AR (Argentina)
 */
$.extend( $.validator.messages, {
	required: "Este campo es obligatorio.",
	remote: "Por favor, completÃ¡ este campo.",
	email: "Por favor, escribÃ­ una direcciÃ³n de correo vÃ¡lida.",
	url: "Por favor, escribÃ­ una URL vÃ¡lida.",
	date: "Por favor, escribÃ­ una fecha vÃ¡lida.",
	dateISO: "Por favor, escribÃ­ una fecha (ISO) vÃ¡lida.",
	number: "Por favor, escribÃ­ un nÃºmero entero vÃ¡lido.",
	digits: "Por favor, escribÃ­ sÃ³lo dÃ­gitos.",
	creditcard: "Por favor, escribÃ­ un nÃºmero de tarjeta vÃ¡lido.",
	equalTo: "Por favor, escribÃ­ el mismo valor de nuevo.",
	extension: "Por favor, escribÃ­ un valor con una extensiÃ³n aceptada.",
	maxlength: $.validator.format( "Por favor, no escribas mÃ¡s de {0} caracteres." ),
	minlength: $.validator.format( "Por favor, no escribas menos de {0} caracteres." ),
	rangelength: $.validator.format( "Por favor, escribÃ­ un valor entre {0} y {1} caracteres." ),
	range: $.validator.format( "Por favor, escribÃ­ un valor entre {0} y {1}." ),
	max: $.validator.format( "Por favor, escribÃ­ un valor menor o igual a {0}." ),
	min: $.validator.format( "Por favor, escribÃ­ un valor mayor o igual a {0}." ),
	nifES: "Por favor, escribÃ­ un NIF vÃ¡lido.",
	nieES: "Por favor, escribÃ­ un NIE vÃ¡lido.",
	cifES: "Por favor, escribÃ­ un CIF vÃ¡lido."
} );

}));
