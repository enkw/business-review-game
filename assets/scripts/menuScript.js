const audio = new Audio("./assets/audio/ding-ding-ding.mp3");
audio.volume = 0.10;
let playButton = document.getElementById('play-btn');

// This function will handle the play button click
function handlePlayButtonClick() {
    // Loads audio to ensure it's ready
    audio.load();
    audio.play();
}

// This causes the play button to redirect you to the game page after audio finishes playing
playButton.addEventListener('click', function() {
    handlePlayButtonClick();
    // This requires the audio to finish playing before redirecting to game.html
    audio.addEventListener('ended', function() {
        window.location.href = 'game.html';
    });
});
