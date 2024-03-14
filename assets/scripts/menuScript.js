// These variable specifically initialize the modal
let elems = document.querySelectorAll('.modal');
let instances = M.Modal.init(elems, {});

let playButton = document.getElementById('play-btn');

// This handles opening the modal for stats
let modalTrigger = document.querySelectorAll('.modal-trigger');
modalTrigger.forEach(trigger => {
    trigger.addEventListener('click', function() {
        let instance = M.Modal.getInstance(trigger.getAttribute('href'));
    });
});

// This causes the play button to redirect you to the game page when clicked
playButton.addEventListener('click', function() {
    window.location.href = 'game.html';
});