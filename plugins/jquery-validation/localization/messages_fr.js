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
 * Locale: FR (French; franÃ§ais)
 */
$.extend( $.validator.messages, {
	required: "Ce champ est obligatoire.",
	remote: "Veuillez corriger ce champ.",
	email: "Veuillez fournir une adresse Ã©lectronique valide.",
	url: "Veuillez fournir une adresse URL valide.",
	date: "Veuillez fournir une date valide.",
	dateISO: "Veuillez fournir une date valide (ISO).",
	number: "Veuillez fournir un numÃ©ro valide.",
	digits: "Veuillez fournir seulement des chiffres.",
	creditcard: "Veuillez fournir un numÃ©ro de carte de crÃ©dit valide.",
	equalTo: "Veuillez fournir encore la mÃªme valeur.",
	extension: "Veuillez fournir une valeur avec une extension valide.",
	maxlength: $.validator.format( "Veuillez fournir au plus {0} caractÃ¨res." ),
	minlength: $.validator.format( "Veuillez fournir au moins {0} caractÃ¨res." ),
	rangelength: $.validator.format( "Veuillez fournir une valeur qui contient entre {0} et {1} caractÃ¨res." ),
	range: $.validator.format( "Veuillez fournir une valeur entre {0} et {1}." ),
	max: $.validator.format( "Veuillez fournir une valeur infÃ©rieure ou Ã©gale Ã  {0}." ),
	min: $.validator.format( "Veuillez fournir une valeur supÃ©rieure ou Ã©gale Ã  {0}." ),
	maxWords: $.validator.format( "Veuillez fournir au plus {0} mots." ),
	minWords: $.validator.format( "Veuillez fournir au moins {0} mots." ),
	rangeWords: $.validator.format( "Veuillez fournir entre {0} et {1} mots." ),
	letterswithbasicpunc: "Veuillez fournir seulement des lettres et des signes de ponctuation.",
	alphanumeric: "Veuillez fournir seulement des lettres, nombres, espaces et soulignages.",
	lettersonly: "Veuillez fournir seulement des lettres.",
	nowhitespace: "Veuillez ne pas inscrire d'espaces blancs.",
	ziprange: "Veuillez fournir un code postal entre 902xx-xxxx et 905-xx-xxxx.",
	integer: "Veuillez fournir un nombre non dÃ©cimal qui est positif ou nÃ©gatif.",
	vinUS: "Veuillez fournir un numÃ©ro d'identification du vÃ©hicule (VIN).",
	dateITA: "Veuillez fournir une date valide.",
	time: "Veuillez fournir une heure valide entre 00:00 et 23:59.",
	phoneUS: "Veuillez fournir un numÃ©ro de tÃ©lÃ©phone valide.",
	phoneUK: "Veuillez fournir un numÃ©ro de tÃ©lÃ©phone valide.",
	mobileUK: "Veuillez fournir un numÃ©ro de tÃ©lÃ©phone mobile valide.",
	strippedminlength: $.validator.format( "Veuillez fournir au moins {0} caractÃ¨res." ),
	email2: "Veuillez fournir une adresse Ã©lectronique valide.",
	url2: "Veuillez fournir une adresse URL valide.",
	creditcardtypes: "Veuillez fournir un numÃ©ro de carte de crÃ©dit valide.",
	ipv4: "Veuillez fournir une adresse IP v4 valide.",
	ipv6: "Veuillez fournir une adresse IP v6 valide.",
	require_from_group: "Veuillez fournir au moins {0} de ces champs.",
	nifES: "Veuillez fournir un numÃ©ro NIF valide.",
	nieES: "Veuillez fournir un numÃ©ro NIE valide.",
	cifES: "Veuillez fournir un numÃ©ro CIF valide.",
	postalCodeCA: "Veuillez fournir un code postal valide."
} );

}));
