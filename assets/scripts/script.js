// These variables specifically initialize the modal
let elems = document.querySelectorAll('.modal');
let instances = M.Modal.init(elems, {});

// This handles opening the modal for stats
let modalTrigger = document.querySelectorAll('.modal-trigger');
modalTrigger.forEach(trigger => {
    trigger.addEventListener('click', function() {
        let instance = M.Modal.getInstance(trigger.getAttribute('href'));
    });
});

// This portion makes the progress bars expandable and loads the stats
$(document).ready(function(){
	$('.tooltipped').tooltip();
	$('.collapsible').collapsible();
});

// function updateStats(stats) {
//     const winPEl = `<span>Daily Wins<i class="material-icons">info_outline</i></span>
//     <div class="determinate blue-grey" style="width: ${stats.winP * 100}%; animation: grow 2s;">${stats.winP * 100}%</div>`;
//     const winPExEl = `Wins: ${stats.wins}<br>Guesses: ${stats.guesses}<br>`;
    
//     const winPTEl = `<span>Daily Wins<i class="material-icons">info_outline</i></span>
//     <div class="determinate blue-grey" style="width: ${stats.winPT * 100}%; animation: grow 2s;">${stats.winPT * 100}%</div>`;
//     const winPTExEl = `Wins: ${stats.winsT}<br>Guesses: ${stats.guessesT}<br>`;
    
//     $('#total-wins').html(winPEl);
//     $('#total-wins-expand').html(winPExEl);
//     $('#daily-wins').html(winPTEl);
//     $('#daily-wins-expand').html(winPTExEl);
// }

// function getStats(type){
//     const localArray = JSON.parse(localStorage.getItem("amount"));
//     let guessesTotal = 0;
//     let winTotal = 0;
//     let guessesToday = 0;
//     let winsToday = 0;
//     let playsToday = 0;
    
//     for(let i = 0; i < localArray.length; i++){
//         guessesTotal += localArray[i].tries;
//         if(localArray[i].winLoss === true){
//             winTotal++;
//         }
//         const isToday = localArray[i].day.format("YYYY-MM-DD").diff(dayjs(), 'day');
//         if(isToday === 0){
//             playsToday++;
//             guessesToday += localArray[i].tries;
//             if(localArray[i].winLoss === true){
//                 winsToday++;
//             }
//         }
//     }
    
//     const stats = {
//         guesses: guessesTotal,
//         wins: winTotal,
//         plays: localArray.length,
//         guessesT: guessesToday,
//         winsT: winsToday,
//         playsT: playsToday
//     }
//     return stats;
// }

// function getModalStats(){
//     // combines all stats from all games
//     const guessesTotal = getStats("amount").guesses + getStats("high").guesses + getStats("low").guesses;
//     const winTotal = getStats("amount").wins + getStats("high").wins + getStats("low").wins;
//     const playsTotal = getStats("amount").plays + getStats("high").plays + getStats("low").plays;
//     const guessesToday = getStats("amount").guessesT + getStats("high").guessesT + getStats("low").guessesT;
//     const winToday = getStats("amount").winsT + getStats("high").winsT + getStats("low").winsT; 
//     const playsToday = getStats("amount").playsT + getStats("high").playsT + getStats("low").playsT;

//     const averageTotal = guessesTotal/playsTotal;
//     const winPercentageTotal = winTotal/playsTotal;
//     const averageToday = guessesToday/playsToday;
//     const winPercentageToday = winToday/playsToday;
//     // The object that gets returned by this function
//     const stats = {
//         average: averageTotal,
//         winP: winPercentageTotal,
//         averageT: averageToday,
//         winPT: winPercentageToday,
//         guesses: guessesTotal,
//         wins: winTotal,
//         plays: playsTotal,
//         guessesT: guessesToday,
//         winsT: winToday,
//         playsT: playsToday
//     }
//     return stats;
// }

