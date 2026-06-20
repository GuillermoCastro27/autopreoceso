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
 * Locale: HU (Hungarian; Magyar)
 */
$.extend( $.validator.messages, {
	required: "KÃ¶telezÅ‘ megadni.",
	maxlength: $.validator.format( "Legfeljebb {0} karakter hosszÃº legyen." ),
	minlength: $.validator.format( "LegalÃ¡bb {0} karakter hosszÃº legyen." ),
	rangelength: $.validator.format( "LegalÃ¡bb {0} Ã©s legfeljebb {1} karakter hosszÃº legyen." ),
	email: "Ã‰rvÃ©nyes e-mail cÃ­mnek kell lennie.",
	url: "Ã‰rvÃ©nyes URL-nek kell lennie.",
	date: "DÃ¡tumnak kell lennie.",
	number: "SzÃ¡mnak kell lennie.",
	digits: "Csak szÃ¡mjegyek lehetnek.",
	equalTo: "Meg kell egyeznie a kÃ©t Ã©rtÃ©knek.",
	range: $.validator.format( "{0} Ã©s {1} kÃ¶zÃ© kell esnie." ),
	max: $.validator.format( "Nem lehet nagyobb, mint {0}." ),
	min: $.validator.format( "Nem lehet kisebb, mint {0}." ),
	creditcard: "Ã‰rvÃ©nyes hitelkÃ¡rtyaszÃ¡mnak kell lennie.",
	remote: "KÃ©rem javÃ­tsa ki ezt a mezÅ‘t.",
	dateISO: "KÃ©rem Ã­rjon be egy Ã©rvÃ©nyes dÃ¡tumot (ISO)."
} );

}));
