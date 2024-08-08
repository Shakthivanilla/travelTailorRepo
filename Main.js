//javascript.js
//set map options
var myLatLng = { lat: 38.3460, lng: -0.4907 };
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

window.inputCount = 2;

//define calcRoute function
function calcRoute() {
    //create request
    var request = {
        origin: document.getElementById("place1").value,
        destination: document.getElementById("place2").value,
        waypoints: createWaypoints(inputCount),
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
           /* const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("place1").value + ".<br />To: " + document.getElementById("place2").value + ".<br /> To: " + document.getElementById("place3").value + ".<br />To: " + document.getElementById("place4").value + ".<br />To: " + document.getElementById("place5").value + ".<br />Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";
*/
            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
            map.setCenter(myLatLng);

            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }


    });

}

 // Starting count

function addInput() {
    inputCount++;
    const inputContainer = document.getElementById('input-container');
    const newInput = document.createElement('div');
    newInput.classList.add('form-group');
    newInput.innerHTML = `
        <label for="place${inputCount}" class="col-xs-2 control-label"><i class="fas fa-map-marker-alt"></i></label>
        <div class="col-xs-4">
            <input type="text" id="place${inputCount}" placeholder="Destination" class="form-control">
        </div>
    `;
    inputContainer.appendChild(newInput);
    createAutocomplete(inputCount);


}
function openDirections() {

    let destinations = "";

    // Loop through inputCount to build the destination string
    for (let i = 2; i <= inputCount; i++) {
        const placeId = "place" + i;
        const destinationValue = document.getElementById(placeId).value;

        if (destinationValue) {
            // Check if destinationValue has a value before adding to string
            destinations += "/"+destinationValue ;
        }
    }

    // Remove the trailing comma (if any)


     /*const index = destinations.lastIndexOf("&destination");
    if (index !== -1) {
        destinations =  destinations.substring(0, index);
    } else {
         // Return the original URL if no "&destination" found
    }*/

    let origin = document.getElementById("place1").value + destinations;



    //const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}`;
    const url = `https://www.google.com/maps/dir/${origin}`;

    const textArea = document.createElement("textarea");
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);
    console.log("URL copied to clipboard!");
    const inputContainer = document.getElementById('output');
    const flashMessage = document.createElement('div');
    flashMessage.textContent = 'URL copied!';
    flashMessage.classList.add('flash-message');
    inputContainer.appendChild(flashMessage);

    // Remove the flash message after 2 seconds
    setTimeout(() => {
        flashMessage.remove();
    }, 2000);
    // Optionally display a message to the user


    
//create autocomplete objects for all inputs
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("place1");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("place2");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

function createAutocomplete(inputCount) {

        const inputId = "place" + inputCount;
        const input = document.getElementById(inputId);
        return  autocomplete = new google.maps.places.Autocomplete(input, options);

}
function createWaypoints(inputCount) {
    const waypoints = [];
    for (let i = 3; i <= inputCount; i++) {
        const placeId = "place" + i;
        waypoints.push({
            location: document.getElementById(placeId).value,
            stopover: true
        });
    }
    return waypoints;
}
function restoreState() {

    console.log('I am different '+window.inputCount);
    const dests = localStorage.getItem('global');
    if(dests > 2){
        for (let i = 3; i <= dests; i++) {
            addInput();
        }
    }
    for (let i = 1; i <= inputCount; i++) {
        const savedValue = localStorage.getItem('place' + i);
        const input = document.getElementById('place' + i);
        if (savedValue) {
            input.value = savedValue;
        }
    }
}

window.onload = restoreState

document.getElementById('hotel').addEventListener('click', function() {
    for (let i = 1; i <= window.inputCount; i++) {
        const input = document.getElementById('place' + i);
        if (input) {
            localStorage.setItem('place' + i, input.value);
        }
    }
    localStorage.setItem('global', window.inputCount);
    console.log('setting global'+ localStorage.getItem('global'));
});


// Optionally, handle initial page load
window.addEventListener('load', () => {
    console.log('Page loaded or refreshed. '+localStorage.getItem('global'));

});


