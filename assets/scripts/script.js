// These variables specifically initialize the modal
let elems = document.querySelectorAll('.modal');
let instances = M.Modal.init(elems, {});

// This portion makes the progress bars expandable and loads the stats
$(document).ready(function(){
	$('.tooltipped').tooltip();
	$('.collapsible').collapsible();

    const winPEl = `<span>Daily Wins<i class="material-icons">info_outline</i></span>
    <div class="determinate blue" style="width: ${stats.winP}; animation: grow 2s;">${stats.winP}</div>`;
    const winPExEl = `Wins: ${stats.wins}<br>Guesses: ${stats.guesses}<br>`;
    
    const winPTEl = `<span>Daily Wins<i class="material-icons">info_outline</i></span>
    <div class="determinate blue" style="width: ${stats.winPT}; animation: grow 2s;">${stats.winPT}</div>`;
    const winPTExEl = `Wins: ${stats.winsT}<br>Guesses: ${stats.guessesT}<br>`;

    $('#total-wins').html(winPEl);
    $('#total-wins-expand').html(winPExEl);
    $('#daily-wins').html(winPTEl);
    $('#daily-wins-expand').html(winPTExEl);
});

// This handles opening the modal for stats
let modalTrigger = document.querySelectorAll('.modal-trigger');
modalTrigger.forEach(trigger => {
    trigger.addEventListener('click', function() {
        let instance = M.Modal.getInstance(trigger.getAttribute('href'));
    });
});

function getStats(type){
    const localArray = JSON.parse(localStorage.getItem(type));
    let guessesTotal = 0;
    let winTotal = 0;
    let guessesToday = 0;
    let winsToday = 0;
    let playsToday = 0;
    for(let i = 0; i < localArray.length; i++){
        guessesTotal += localArray[0].tries;
        if(localArray[0].winLoss === true){
            winTotal++;
        }
        const isToday = localArray[0].day.format("YYYY-MM-DD").diff(dayjs(), 'day');
        if(isToday === 0){
            playsToday++;
            guessesToday += localArray[0].tries;
            if(localArray[0].winLoss === true){
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
    }
}

function getModalStats(){
    // combines all stats from all games
    const guessesTotal = getStats("amount").guesses + getStats("high").guesses + getStats("low").guesses;
    const winTotal = getStats("amount").wins + getStats("high").wins + getStats("low").wins;
    const playsTotal = getStats("amount").plays + getStats("high").plays + getStats("low").plays;
    const guessesToday = getStats("amount").guessesT + getStats("high").guessesT + getStats("low").guessesT;
    const winToday = getStats("amount").winsT + getStats("high").winsT + getStats("low").winsT; 
    const playsToday = getStats("amount").playsT + getStats("high").playsT + getStats("low").playsT;

    const averageTotal = guessesTotal/playsTotal;
    const winPercentageTotal = winTotal/playsTotal;
    const averageToday = guessesToday/playsToday;
    const winPercentageToday = winToday/playsToday;
    // The object that gets returned by this function
    const stats = {
        average: averageTotal,
        winP: winPercentageTotal,
        averageT: averageToday,
        winPT: winPercentageToday,
        guesses: guessesTotal,
        wins: winTotal,
        plays: playsTotal,
        guessesT: guessesToday,
        winsT: winToday,
        playsT: playsToday
    }
    return stats;
}