// Home button to bring user back home
function backHome() {
    window.location.href = "/welcomeback.html"
}

const homeButton = document.getElementById("home");
homeButton.onclick = backHome

// For PSbuttons, background audio
const backgroundAudio = new Audio();
audio.src = "./assets/bar_large_busy_dance_music.mp3";

// Might be added in rotation of the background audio
// bar_small_busy_dance_music.mp3
// bar_small_busy_r&b_music.mp3

// For Popup Drink Menu Options
function drinkMenu() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

// Vodka Coke
const drinkOneAudio = new Audio();
audio.src = "./assets/field_reports_pub_vodka_&_coke_sequence_224.mp3"

// Bottle of Champagne pop and pour
const drinkTwoAudio = new Audio();
audio.src = "./assets/food_drink_champagne_cork_pop_pour.mp3"

// Fizzy Drink
const drinkThreeAudio = new Audio();
audio.src = "./assets/food_drink_champagne_pour.mp3"

// Beer Pour from Tap
const drinkFourAudio = new Audio();
audio.src = "./assets/field_reports_pub_pint_pour_218.mp3"

// Tells the user to rotate their phone
function setup() {
    var alerted = true;
    if (alerted) {
        alert("Please Rotate Your Phone.");
    }
    alerted = false;
}

$(document).ready(setup);