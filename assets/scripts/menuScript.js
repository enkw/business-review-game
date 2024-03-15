const audio = new Audio("./assets/audio/ding-ding-ding.mp3");
audio.volume = 0.10;
let playButton = document.getElementById('play-btn');
// These variable specifically initialize the modal
let elems = document.querySelectorAll('.modal');
let instances = M.Modal.init(elems, {});

// This handles opening the modal for stats
let modalTrigger = document.querySelectorAll('.modal-trigger');
modalTrigger.forEach(trigger => {
    trigger.addEventListener('click', function() {
        let instance = M.Modal.getInstance(trigger.getAttribute('href'));
    });
});

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
