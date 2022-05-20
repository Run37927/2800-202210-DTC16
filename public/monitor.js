window.onload = getMyLocation;
const blueCoords = [
    { lat: 25.774, lng: -60.19 },
    { lat: 18.466, lng: -46.118 },
    { lat: 32.321, lng: -44.757 },
  ];

var watchID = null;
function watchLocation() {
    watchID = navigator.geolocation.watchPosition(displayLocation, displayError);
}
function clearWatch() {
    if (watchID) {
        navigator.geolocation.clearWatch(watchID);
        watchID = null;
    }
}

function backHome() {
    window.location.href = `/welcome/${window.location.href.split('/')[4]}`
}
const homeBtn = document.getElementById("home");
homeBtn.onclick = backHome;

function getMyLocation() {
    if (navigator.geolocation) {
        // navigator.geolocation.getCurrentPosition(displayLocation, displayError);
        var watchButton = document.getElementById("watch");
        watchButton.onclick = watchLocation;
        var clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;
    } else {
        alert("no geolocation support here")
    }
}



const labels = "U";
let labelIndex = 0;
const imageMarker =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png";

let map;

function addMarker(location, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    new google.maps.Marker({
        position: location,
        label: labels[labelIndex++ % labels.length],
        map: map,
        icon: imageMarker
    });
}

function scrollMapToPosition(coords) {
    var latitude = coords.latitude;
    var longitude = coords.longitude;
    var latlong = new google.maps.LatLng(latitude, longitude);

    map.panTo(latlong);
    addMarker(latlong, map);
}

function showMap(coords) {
    console.log(coords.latitude);

    var location = {
        lat: coords.latitude,
        lng: coords.longitude
    }

    var options = {
        zoom: 10,
        disableDefaultUI: true,
        styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }],
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }],
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }],
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }],
            },
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }],
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }],
            },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#2f3948" }],
            },
            {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }],
            },
        ],
        center: location,
        enableHighAccuracy: true,
        maximumAge: 0,
        mapTypeId: google.maps.MapTypeId.HYBRID
    }

    map = new google.maps.Map(document.getElementById("map"), options);

    google.maps.event.addListener(map, "click", (event) => {
        addMarker(event.latLng, map);
    });
    addMarker(location, map);

 
}


function dosecret() {
    new google.maps.Polygon({
        map,
        paths: blueCoords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        draggable: true,
        geodesic: true,
      });

      easter.style.backgroundColor = "red"
      easter.value = "EASTER"
}
const easter = document.querySelector(".easter");
easter.onclick = dosecret;



function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // var div = document.getElementById("location");
    // div.innerHTML = "You are at latitude: " + latitude + ", longitude: " + longitude;

    // var km = computeDistance(position.coords, FIJI);
    // var distance = document.getElementById("distance");
    // distance.innerHTML = "you are " + km + " km from paradise."

    if (map == null) {
        showMap(position.coords);
    } else {
        scrollMapToPosition(position.coords);
    }
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
audio.src = "../audios/airplaneAnnoucement.mp3";


function setup() {
    var alerted = true;
    if (alerted) {
        alert("please rotate your phone right now");
    }
    alerted = false;
    // location.href = "/monitor/:id"
}

$(document).ready(setup);