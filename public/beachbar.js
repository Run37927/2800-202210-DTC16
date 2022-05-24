// Home button to bring user back home
function backHome() {
    window.location.href = `/welcome/${window.location.href.split('/')[4]}`
}

const homeButton = document.getElementById("home");
homeButton.onclick = backHome


function closeMenu() {
    document.getElementById("drinkMenu").style.width = "0";
}

function openDrinksMenu() {
    document.getElementById("drinkMenu").style.width = "500px";
}

const menuBtn = document.getElementById("menu");
menuBtn.onclick = openDrinksMenu;


// function openRecipe() {
//     document.getElementById("vodka").style.width = "500px";
// }
// const recipeBtn = document.getElementById("recipe");
// recipeBtn.onclick = openRecipe;


// Popup Drink Button Menu
function drinkMenu() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

// For PSbuttons, background bar audio
const backgroundAudio = new Audio();
backgroundAudio.src = "../audios/bar_large_busy_dance_music.mp3";

// For beachBtn, background beach audio
const beachAudio = new Audio();
beachAudio.src = "../audios/191444__john-sipos__beach-goers-and-surf.mp3";

// For bartenderBtn, Located middle very right
const bartenderAudio = new Audio();
bartenderAudio.src = "../audios/hi-may-i-take-your-order-please.mp3"

// For vodkaCokeBtn, short glass with coke by the bar
const drinkOneAudio = new Audio();
drinkOneAudio.src = "../audios/field_reports_pub_vodka_&_coke_sequence_224.mp3"

// For champagneBtn pop and pour, white Malibu bottle bottom right
const drinkTwoAudio = new Audio();
drinkTwoAudio.src = "../audios/food_drink_champagne_cork_pop_pour.mp3"

// For sodaBtn, cocktail glass with lime slice bottom right
const drinkThreeAudio = new Audio();
drinkThreeAudio.src = "../audios/food_drink_champagne_pour.mp3"

// For beerBtn, by the bar coconuts (Pretend there is a hidden beer Tap)
const drinkFourAudio = new Audio();
drinkFourAudio.src = "../audios/field_reports_pub_pint_pour_218.mp3"

// For shotBtn, cocktail glass with orange slice bottom left
const drinkFiveAudio = new Audio();
drinkFiveAudio.src = "../audios/533846__therealrpb__get-a-drink.mp3"

// For shotBtn, cocktail glass with orange slice bottom left
const sambaAudio = new Audio();
sambaAudio.src = "../audios/music_david_gwyn_jones_i_wanna_be_near_trees_instrumental.mp3"

// Volume Controller
// const volume = document.querySelector("#volume");
// volume.addEventListener("range", function(v){
//     Audio.value = v.currentTarget.value / 100
// });

// Tells the user to rotate their phone
function setup() {
    var alerted = true;
    if (alerted) {
        alert("Please Rotate Your Phone.");
    }
    alerted = false;
}

$(document).ready(setup);