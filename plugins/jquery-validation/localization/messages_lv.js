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
 * Locale: LV (Latvian; latvieÅ¡u valoda)
 */
$.extend( $.validator.messages, {
	required: "Å is lauks ir obligÄts.",
	remote: "LÅ«dzu, pÄrbaudiet Å¡o lauku.",
	email: "LÅ«dzu, ievadiet derÄ«gu e-pasta adresi.",
	url: "LÅ«dzu, ievadiet derÄ«gu URL adresi.",
	date: "LÅ«dzu, ievadiet derÄ«gu datumu.",
	dateISO: "LÅ«dzu, ievadiet derÄ«gu datumu (ISO).",
	number: "LÅ«dzu, ievadiet derÄ«gu numuru.",
	digits: "LÅ«dzu, ievadiet tikai ciparus.",
	creditcard: "LÅ«dzu, ievadiet derÄ«gu kredÄ«tkartes numuru.",
	equalTo: "LÅ«dzu, ievadiet to paÅ¡u vÄ“lreiz.",
	extension: "LÅ«dzu, ievadiet vÄ“rtÄ«bu ar derÄ«gu paplaÅ¡inÄjumu.",
	maxlength: $.validator.format( "LÅ«dzu, ievadiet ne vairÄk kÄ {0} rakstzÄ«mes." ),
	minlength: $.validator.format( "LÅ«dzu, ievadiet vismaz {0} rakstzÄ«mes." ),
	rangelength: $.validator.format( "LÅ«dzu ievadiet {0} lÄ«dz {1} rakstzÄ«mes." ),
	range: $.validator.format( "LÅ«dzu, ievadiet skaitli no {0} lÄ«dz {1}." ),
	max: $.validator.format( "LÅ«dzu, ievadiet skaitli, kurÅ¡ ir mazÄks vai vienÄds ar {0}." ),
	min: $.validator.format( "LÅ«dzu, ievadiet skaitli, kurÅ¡ ir lielÄks vai vienÄds ar {0}." )
} );

}));
