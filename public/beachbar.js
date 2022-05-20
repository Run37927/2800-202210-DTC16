// Home button to bring user back home
function backHome() {
    window.location.href = "/welcomeback.html"
}

const homeButton = document.getElementById("home");
homeButton.onclick = backHome

// Might be added in rotation of the background audio
// bar_small_busy_dance_music.mp3
// bar_small_busy_r&b_music.mp3

// Popup Drink Button Menu
function drinkMenu() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

// For PSbuttons, background bar audio
const backgroundAudio = new Audio();
backgroundAudio.src = "./assets/bar_large_busy_dance_music.mp3";

// For beachBtn, background beach audio
const beachAudio = new Audio();
beachAudio.src = "./assets/191444__john-sipos__beach-goers-and-surf.mp3";

// For bartenderBtn, Located middle very right
const bartenderAudio = new Audio();
bartenderAudio.src = "./assets/hi-may-i-take-your-order-please.mp3"

// For vodkaCokeBtn, short glass with coke by the bar
const drinkOneAudio = new Audio();
drinkOneAudio.src = "./assets/field_reports_pub_vodka_&_coke_sequence_224.mp3"

// For champagneBtn pop and pour, white Malibu bottle bottom right
const drinkTwoAudio = new Audio();
drinkTwoAudio.src = "./assets/food_drink_champagne_cork_pop_pour.mp3"

// For sodaBtn, cocktail glass with lime slice bottom right
const drinkThreeAudio = new Audio();
drinkThreeAudio.src = "./assets/food_drink_champagne_pour.mp3"

// For beerBtn, by the bar coconuts (Pretend there is a hidden beer Tap)
const drinkFourAudio = new Audio();
drinkFourAudio.src = "./assets/field_reports_pub_pint_pour_218.mp3"

// For shotBtn, cocktail glass with orange slice bottom left
const drinkFiveAudio = new Audio();
drinkFiveAudio.src = "./assets/533846__therealrpb__get-a-drink.mp3"

// Tells the user to rotate their phone
function setup() {
    var alerted = true;
    if (alerted) {
        // alert("Please Rotate Your Phone.");
    }
    alerted = false;
}

$(document).ready(setup);