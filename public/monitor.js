window.onload = getMyLocation;


const FIJI = {
    latitude: 16.5004,
    longitude: 151.7415
};


function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    } else {
        alert("no geolocation support here")
    }
}



let map;
function showMap(coords) {
    console.log(coords.latitude);

    var location = {
        lat: coords.latitude,
        lng: coords.longitude
    }

    var options = {
        zoom: 10,
        center: location,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    }

    map = new google.maps.Map(document.getElementById("map"), options);
}

function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // var div = document.getElementById("location");
    // div.innerHTML = "You are at latitude: " + latitude + ", longitude: " + longitude;

    // var km = computeDistance(position.coords, FIJI);
    // var distance = document.getElementById("distance");
    // distance.innerHTML = "you are " + km + " km from paradise."

    showMap(position.coords);
}

function displayError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    var errorMsg = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMsg = errorMsg + " " + error.message;
    }
    var div = document.getElementById("location");
    div.innerHTML = errorMsg;
}

function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);

    var Radius = 6371; // radius of the Earth in km
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)) * Radius;
    return distance;
}

function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI) / 180;
    return radians;
}


const audio = new Audio();
audio.src = "/audios/airplaneAnnoucement.mp3";



function setup() {
    alert("please rotate your phone right now")
    // location.href = "/monitor/:id"
}

$(document).ready(setup);