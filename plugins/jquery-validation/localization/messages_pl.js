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
 * Locale: PL (Polish; jÄ™zyk polski, polszczyzna)
 */
$.extend( $.validator.messages, {
	required: "To pole jest wymagane.",
	remote: "ProszÄ™ o wypeÅ‚nienie tego pola.",
	email: "ProszÄ™ o podanie prawidÅ‚owego adresu email.",
	url: "ProszÄ™ o podanie prawidÅ‚owego URL.",
	date: "ProszÄ™ o podanie prawidÅ‚owej daty.",
	dateISO: "ProszÄ™ o podanie prawidÅ‚owej daty (ISO).",
	number: "ProszÄ™ o podanie prawidÅ‚owej liczby.",
	digits: "ProszÄ™ o podanie samych cyfr.",
	creditcard: "ProszÄ™ o podanie prawidÅ‚owej karty kredytowej.",
	equalTo: "ProszÄ™ o podanie tej samej wartoÅ›ci ponownie.",
	extension: "ProszÄ™ o podanie wartoÅ›ci z prawidÅ‚owym rozszerzeniem.",
	maxlength: $.validator.format( "ProszÄ™ o podanie nie wiÄ™cej niÅ¼ {0} znakÃ³w." ),
	minlength: $.validator.format( "ProszÄ™ o podanie przynajmniej {0} znakÃ³w." ),
	rangelength: $.validator.format( "ProszÄ™ o podanie wartoÅ›ci o dÅ‚ugoÅ›ci od {0} do {1} znakÃ³w." ),
	range: $.validator.format( "ProszÄ™ o podanie wartoÅ›ci z przedziaÅ‚u od {0} do {1}." ),
	max: $.validator.format( "ProszÄ™ o podanie wartoÅ›ci mniejszej bÄ…dÅº rÃ³wnej {0}." ),
	min: $.validator.format( "ProszÄ™ o podanie wartoÅ›ci wiÄ™kszej bÄ…dÅº rÃ³wnej {0}." ),
	pattern: $.validator.format( "Pole zawiera niedozwolone znaki." )
} );

}));
