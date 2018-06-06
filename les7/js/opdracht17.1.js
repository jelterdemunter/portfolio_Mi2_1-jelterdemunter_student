"use strict";
/* jshint esnext: true */
/* global $, localStorage */

// In dit script demonstreren we het gebruik van
// * localStorage

/* ****************************
 * Een eenvoudig object bewaren en oproepen window.localStorage
 * *************************** */

/* localstorage is een eenvoudige, maar beperkte api :
 * - max ongeveer 5MB opslag (hangt af van omgeving), maar je kan er niet meer in stoppen als het vol is, ook niet als je het de gebruiker vraagt (kan wel bij indexedDB)
 * - enkel tekst met sleutel-waarde paren
 * - heel gemakkelijk in gebruik
 */
var namen = $("#naam").val();
var geboortedatums = $("#geboortedatum").val();
function bewaarMe() {
    let mijnObject = {
        "naam" : namen,
        "voornaam" : geboortedatums
        
    };
    // opslaan als tekst
    localStorage.ik = JSON.stringify(mijnObject);
    $("#alert").html("Ik ben bewaard ...");
}


function haalMeOp() {
    // haal de waarde van de key 'ik' op 
    // en zet deze terug om naar een JS object
    let ik = JSON.parse(localStorage.ik);
    console.table(ik);
    $("#alert").html("Kijk in de console voor het resultaat");
}




