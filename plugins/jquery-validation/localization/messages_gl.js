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
 * Locale: GL (Galician; Galego)
 */
( function( $ ) {
	$.extend( $.validator.messages, {
		required: "Este campo Ã© obrigatorio.",
		remote: "Por favor, cubre este campo.",
		email: "Por favor, escribe unha direcciÃ³n de correo vÃ¡lida.",
		url: "Por favor, escribe unha URL vÃ¡lida.",
		date: "Por favor, escribe unha data vÃ¡lida.",
		dateISO: "Por favor, escribe unha data (ISO) vÃ¡lida.",
		number: "Por favor, escribe un nÃºmero vÃ¡lido.",
		digits: "Por favor, escribe sÃ³ dÃ­xitos.",
		creditcard: "Por favor, escribe un nÃºmero de tarxeta vÃ¡lido.",
		equalTo: "Por favor, escribe o mesmo valor de novo.",
		extension: "Por favor, escribe un valor cunha extensiÃ³n aceptada.",
		maxlength: $.validator.format( "Por favor, non escribas mÃ¡is de {0} caracteres." ),
		minlength: $.validator.format( "Por favor, non escribas menos de {0} caracteres." ),
		rangelength: $.validator.format( "Por favor, escribe un valor entre {0} e {1} caracteres." ),
		range: $.validator.format( "Por favor, escribe un valor entre {0} e {1}." ),
		max: $.validator.format( "Por favor, escribe un valor menor ou igual a {0}." ),
		min: $.validator.format( "Por favor, escribe un valor maior ou igual a {0}." ),
		nifES: "Por favor, escribe un NIF vÃ¡lido.",
		nieES: "Por favor, escribe un NIE vÃ¡lido.",
		cifES: "Por favor, escribe un CIF vÃ¡lido."
	} );
}( jQuery ) );

}));
