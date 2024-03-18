// These variables specifically initialize the modal
let elems = document.querySelectorAll('.modal');
let instances = M.Modal.init(elems, {});

// This handles opening the modal for stats
let modalTrigger = document.querySelectorAll('.modal-trigger');
modalTrigger.forEach(trigger => {
    trigger.addEventListener('click', function () {
        // Updates stats when the modal is triggered
        let stats = getModalStats();
        // Updates the modal content with the updated stats
        updateStats(stats);

        let instance = M.Modal.getInstance(trigger.getAttribute('href'));
        instance.open();
    });
});

// This portion makes the progress bars expandable and loads the stats
$(document).ready(function () {
    $('.tooltipped').tooltip();
    $('.collapsible').collapsible();
});

function getStats() {
    let guessesTotal = 0;
    let winTotal = 0;
    let guessesToday = 0;
    let winsToday = 0;
    let playsToday = 0;

    const localArray = JSON.parse(localStorage.getItem("amount")) || [];

    for (let i = 0; i < localArray.length; i++) {
        guessesTotal += localArray[i].tries;
        if (localArray[i].winLoss === true) {
            winTotal++;
        }
        const isToday = dayjs(localArray[i].day).isSame(dayjs(), 'day');
        if (isToday) {
            playsToday++;
            guessesToday += localArray[i].tries;
            if (localArray[i].winLoss === true) {
                winsToday++;
            }
        }
    }

    const stats = {
        guesses: guessesTotal,
        wins: winTotal,
        plays: localArray.length,
        guessesT: guessesToday,
        winsT: winsToday,
        playsT: playsToday
    };

    return stats;
}

function updateStats(stats) {
    const winPEl = `<span>Total Wins<i class="material-icons">info_outline</i></span>
    <div class="determinate blue-grey" style="width: ${stats.wins / stats.plays * 100}%; animation: grow 2s;">${stats.wins} / ${stats.plays}</div>`;

    const winPTEl = `<span>Daily Wins<i class="material-icons">info_outline</i></span>
    <div class="determinate blue-grey" style="width: ${stats.winsT / stats.playsT * 100}%; animation: grow 2s;">${stats.winsT} / ${stats.playsT}</div>`;

    $('#total-wins').html(winPEl);
    $('#daily-wins').html(winPTEl);

    const winPExEl = `Wins: ${stats.wins}<br>Guesses: ${stats.guesses}<br>`;
    const winPTExEl = `Wins: ${stats.winsT}<br>Guesses: ${stats.guessesT}<br>`;

    $('#total-wins-expand').html(winPExEl);
    $('#daily-wins-expand').html(winPTExEl);
}

function getModalStats() {
    const stats = getStats();
    return stats;
}

const localArray = JSON.parse(localStorage.getItem("amount"));
console.log(localArray);

// Call getStats initially to set up the stats
let initialStats = getStats();
updateStats(initialStats);
