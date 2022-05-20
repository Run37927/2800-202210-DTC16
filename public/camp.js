const menuToggle = document.querySelector('.toggle');
const showcase = document.querySelector('.showcase');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    showcase.classList.toggle('active');
})

let seconds = 0;
let minutes = 0;
let hours = 0;
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

let interval = null;

let status = "stopped";

function stopWatch() {

    seconds++;

    if (seconds / 60 === 1) {
        seconds = 0;
        minutes++;

        if (minutes / 60 === 1) {
            minutes = 0;
            hours++;
        }

    }

    if (seconds < 10) {
        displaySeconds = "0" + seconds.toString();
    }
    else {
        displaySeconds = seconds;
    }

    if (minutes < 10) {
        displayMinutes = "0" + minutes.toString();
    }
    else {
        displayMinutes = minutes;
    }

    if (hours < 10) {
        displayHours = "0" + hours.toString();
    }
    else {
        displayHours = hours;
    }

    document.getElementById("display").innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;

}

function startStop() {

    if (status === "stopped") {

        interval = window.setInterval(stopWatch, 1000);
        document.getElementById("startStop").innerHTML = "Stop";
        status = "started";

    }
    else {

        window.clearInterval(interval);
        document.getElementById("startStop").innerHTML = "Start";
        status = "stopped";

    }

}

function reset() {

    window.clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById("display").innerHTML = "00:00:00";
    document.getElementById("startStop").innerHTML = "Start";

}

var randomQuote = "";
var randomAuthor = "";

function getQuote() {
    $.ajax({
        url: "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?",
        method: "GET",
        dataType: "jsonp",
        success: function (request) {
            randomQuote = request.quoteText;
            randomAuthor = request.quoteAuthor;
            $('#text').html(randomQuote);
            if (randomAuthor === "") {
                randomAuthor = "Unknown";
            } $('#author').html(randomAuthor);
        },
        error: function (xhr, status, error) {
            $('#quoteText').text('Not sure what happened there! Click again to generate a new quote!');
            $('#quoteAuthor').text('Click Below!');
        }
    });
}


$(document).ready(function () {
    $("#new-quote").click(function () {
        getQuote();
    });
    $(".menu").html(`<ul>
    <li><a href="/welcome/${window.location.href.split('/')[4]}">Home</a></li>
    <br>
    <li><a href="/monitor/${window.location.href.split('/')[4]}">Flight Monitor</a></li>
    <br>
    <li><a href="/beachbar/${window.location.href.split('/')[4]}">Beach Bar</a></li>
</ul>`)
});