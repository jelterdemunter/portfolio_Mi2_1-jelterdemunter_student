"use strict";
/*global Framework7, Dom7 */
var myApp = new Framework7();
var $$ = Dom7;

var brussel = [50.849304, 4.357058];

// Add view
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});

/* databron :
        http://ophalvens.net/mi2/examen/meteorieten.php?m=all
 */





//hier komt de code voor de pagina meteorieten
myApp.onPageInit('meteorieten', function (page) {
  
    //als het ophalen van het json bestand is gelukt voeren we deze functie uit om de gewenste data eruit te halen
    function verwerkJson(response) {
    
        console.log("data geladen");

        var data = "",
            i,
            XX;
        for (i = 0; i < response.meteors.length; i += 1) {

            XX = response.meteors[i];
            data += "<tr><td>" + XX.geolocation.name + "<\/td>";
            data += "<td>" + XX.geolocation.year + "<\/td><\/tr>";
            console.log(XX.geolocation.name);//deze gebruik ik later om detail gegeven te laten zien /puntje 4/
			console.log(XX.geolocation.year);
			console.log(XX.geolocation.mass);
			console.log(XX.geolocation.recclass);
        }
        $$("#dataPlaats tbody").html(data);
    
    }
	//hier gaat men de data opvragen van het bestand http://ophalvens.net/mi2/examen/meteorieten.php?m=all
    $$.ajax({
        type: 'GET',
        url: ' http://ophalvens.net/mi2/examen/meteorieten.php?m=all',
        dataType: 'json',   
        success: verwerkJson
    });
	//aanmaken van database
	var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024); 
	db.transaction(function (tx) { 
   	 tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)'); 
	    tx.executeSql('INSERT INTO LOGS (id,log) VALUES (?, ?)', 
				[e_id, e_log]); 
    }); 
	//hier ga ik alle logs gebruiken en weergeven
	db.transaction(function (tx) { 
	    tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) { 
		    var len = results.rows.length, i; 
		    msg = "<p>Found rows: " + len + "</p>"; 
		    document.querySelector('#status').innerHTML += msg; 
		    for (i = 0; i < len; i++){ 
			    alert(results.rows.item(i).log ); 
		    } 
	    }, null); 
    }); 

  
})






function getDistPoints(lat1, lon1, lat2, lon2) {
  // berekent de oppervlakteafstand tussen 2 punten op een bol
  // in meter
    var R = 6369087, 
        toRadVar = Math.PI / 180,
    φ1 = lat1 * toRadVar,
    φ2 = lat2 * toRadVar,
    Δφ = (lat2 - lat1) * toRadVar,
    Δλ = (lon2 - lon1) * toRadVar,
        a,
        c,
        d;
  a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  d = R * c;

  d = d / 1000; // zet de afstand om van m naar km
  return d;
}