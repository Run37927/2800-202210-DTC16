var playSong;
var button;

function setup() {
    createCanvas(200, 200)
    playSong = loadSong("beachbar.mp3", loaded);
    button = createButton("play");
    playSong.setVolume(0.3);
    background(51);
}

function toggleplaying() {
    playSong.play();
}

function