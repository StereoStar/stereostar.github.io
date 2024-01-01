// Let's get started.
"use strict";

// Load audio files: the 4 main audio tracks, plus a couple button SFX recorded off the real toy.
var trackA = new Audio('https://stereostar.github.io/2xl/assets/MP3s/trackAtaped.mp3');
var trackB = new Audio('https://stereostar.github.io/2xl/assets/MP3s/trackBtaped.mp3');
var trackC = new Audio('https://stereostar.github.io/2xl/assets/MP3s/trackCtaped.mp3');
var trackD = new Audio('https://stereostar.github.io/2xl/assets/MP3s/trackDtaped.mp3');
var aButtonSound = new Audio('https://stereostar.github.io/2xl/assets/MP3s/Abutton.mp3');
var playButtonSound = new Audio('https://stereostar.github.io/2xl/assets/MP3s/playButton.mp3');
// Mute all tracks but one.
// (They all have the same audio at the start, so we don't need to switch to track A again if the user rewinds to the start later.)
trackB.muted = true;
trackC.muted = true;
trackD.muted = true;

// Add event listener to Play button.
var buttonPlay = document.getElementById("buttonPlay");

buttonPlay.addEventListener("click", playClick);

function playClick() {
    // We're playing all the tracks, with only one unmuted.  More on the reasoning behind this in the A,B,C,D buttons' handler later.
    playButtonSound.play();
    trackA.play();
    trackB.play();
    trackC.play();
    trackD.play();
}

// Add event listener to Stop button.
// Note: Button is labeled "Stop" even though its function is "pause" because that's the button's name on the original toy.
var buttonStop = document.getElementById("buttonStop");

buttonStop.addEventListener("click", stopClick);

function stopClick() {
    playButtonSound.play();
    trackA.pause();
    trackB.pause();
    trackC.pause();
    trackD.pause();
}

// Add event listener to Rewind button.
// Initially, I was hoping to simply play the tracks in reverse, but discovered that neither Chrome nor Firefox support that.
// So, this button just reveals a hidden div with more specific skip controls.
var buttonRew = document.getElementById("buttonRew");
var rewControl = document.getElementById("rewindControl")

buttonRew.addEventListener("click", rewClick);

function rewClick() {
    playButtonSound.play();
    // Unhide the div with the rewind function buttons if they're hidden, otherwise hide it again.
    if (rewControl.hidden == true) {
        rewControl.hidden = false;
    } else {
        rewControl.hidden = true;
    }

}

// Add event listeners and functionality for the hidden Rew buttons.

var button20s = document.getElementById("20s");

button20s.addEventListener("click", rew20);

function rew20() {
    playButtonSound.play();
    trackA.currentTime = (trackA.currentTime - 20);
    trackB.currentTime = (trackB.currentTime - 20);
    trackC.currentTime = (trackC.currentTime - 20);
    trackD.currentTime = (trackD.currentTime - 20);
}


var button40s = document.getElementById("40s");

button40s.addEventListener("click", rew40);

function rew40() {
    playButtonSound.play();
    trackA.currentTime = (trackA.currentTime - 40);
    trackB.currentTime = (trackB.currentTime - 40);
    trackC.currentTime = (trackC.currentTime - 40);
    trackD.currentTime = (trackD.currentTime - 40);
}

// Handle Custom buttom and input field.
var buttonCustom = document.getElementById("custom");
var customField = document.getElementById("customField")

buttonCustom.addEventListener("click", customJump);

function customJump() {
    // Perform a regEx check here to validate customField.value and make sure it's a number.
    // Allows for both positive and negative numbers to be used, so savvy users can input negative numbers to jump forward.
    if (customField.value.match(/^[-+]?[0-9]+$/)) {
        playButtonSound.play();
        trackA.currentTime = (trackA.currentTime - customField.value);
        trackB.currentTime = (trackB.currentTime - customField.value);
        trackC.currentTime = (trackC.currentTime - customField.value);
        trackD.currentTime = (trackD.currentTime - customField.value);
    } else {
        alert("Please enter a number!");
    }
}


var buttonRestart = document.getElementById("restart");

buttonRestart.addEventListener("click", restartFunc);

function restartFunc() {
    playButtonSound.play();
    trackA.currentTime = 0;
    trackB.currentTime = 0;
    trackC.currentTime = 0;
    trackD.currentTime = 0;
}


// Set up event listener function for A, B, C and D buttons.
var buttons = document.getElementsByClassName("bigButton");

// Add the event listener to all 4 buttons at once.
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', buttonClicked, false);
}

function buttonClicked(evt) {
    // Identify which button was clicked.
    var currentButton = evt.currentTarget;  // (because "evt.target" would cause problems if user clicked the text inside the button)
    // If it doesn't appear pressed down, press it down.
    if (currentButton.classList.contains('unclicked')) {
        currentButton.classList.replace('unclicked', 'clicked');
    }
    // Traverse through the set of buttons.
    // At each one, if they're not currentButton and they have the class "clicked", remove it and add class "unclicked".
    // This is for css styling reasons, so the user always sees which audio track they're on.
    // (It also matches the physical behavior of the actual 2-XL toy's buttons.)
    for (var i = 0; i < buttons.length; i++) {
        if ((buttons[i] != currentButton) && (buttons[i].classList.contains('clicked'))) {
            buttons[i].classList.replace('clicked', 'unclicked');
        }
    }
    aButtonSound.play();
    // Play the right track.
    // APPROACH:  The Play button plays all tracks simultaneously.
    // The A, B, C and D buttons switch which track is unmuted to correspond to which button is pressed.
    // No need to use currentTime to keep track of the user's place when switching tracks (only when manually rewinding)
    // - and while that seems silly/cheap, it's more accurate to the toy's methods.
    // ie; the cassette is reeling through all four tracks, while only the selected one is playing through the toy's mono speaker.
    if (currentButton.id == 'buttonA'){
        trackB.muted = true;
        trackC.muted = true;
        trackD.muted = true;
        trackA.muted = false;
    }
    else if (currentButton.id == 'buttonB') {
        trackA.muted = true;
        trackC.muted = true;
        trackD.muted = true;
        trackB.muted = false;
    }
    else if (currentButton.id == 'buttonC') {
        trackA.muted = true;
        trackB.muted = true;
        trackD.muted = true;
        trackC.muted = false;
    }
    else if (currentButton.id == 'buttonD') {
        trackA.muted = true;
        trackB.muted = true;
        trackC.muted = true;
        trackD.muted = false;
    }
    
}
