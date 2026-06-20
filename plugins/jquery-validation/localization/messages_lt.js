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
 * Locale: LT (Lithuanian; lietuviÅ³ kalba)
 */
$.extend( $.validator.messages, {
	required: "Å is laukas yra privalomas.",
	remote: "PraÅ¡au pataisyti Å¡Ä¯ laukÄ….",
	email: "PraÅ¡au Ä¯vesti teisingÄ… elektroninio paÅ¡to adresÄ….",
	url: "PraÅ¡au Ä¯vesti teisingÄ… URL.",
	date: "PraÅ¡au Ä¯vesti teisingÄ… datÄ….",
	dateISO: "PraÅ¡au Ä¯vesti teisingÄ… datÄ… (ISO).",
	number: "PraÅ¡au Ä¯vesti teisingÄ… skaiÄiÅ³.",
	digits: "PraÅ¡au naudoti tik skaitmenis.",
	creditcard: "PraÅ¡au Ä¯vesti teisingÄ… kreditinÄ—s kortelÄ—s numerÄ¯.",
	equalTo: "PraÅ¡au Ä¯vestÄ¯ tÄ… paÄiÄ… reikÅ¡mÄ™ dar kartÄ….",
	extension: "PraÅ¡au Ä¯vesti reikÅ¡mÄ™ su teisingu plÄ—tiniu.",
	maxlength: $.validator.format( "PraÅ¡au Ä¯vesti ne daugiau kaip {0} simboliÅ³." ),
	minlength: $.validator.format( "PraÅ¡au Ä¯vesti bent {0} simbolius." ),
	rangelength: $.validator.format( "PraÅ¡au Ä¯vesti reikÅ¡mes, kuriÅ³ ilgis nuo {0} iki {1} simboliÅ³." ),
	range: $.validator.format( "PraÅ¡au Ä¯vesti reikÅ¡mÄ™ intervale nuo {0} iki {1}." ),
	max: $.validator.format( "PraÅ¡au Ä¯vesti reikÅ¡mÄ™ maÅ¾esnÄ™ arba lygiÄ… {0}." ),
	min: $.validator.format( "PraÅ¡au Ä¯vesti reikÅ¡mÄ™ didesnÄ™ arba lygiÄ… {0}." )
} );

}));
