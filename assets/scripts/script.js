function getModalStats(type){
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
    const averageGuesses = guessesTotal/localArray.length;
    const averageGToday = guessesToday/playsToday;
    const winPercentage = winTotal/localArray.length;
    const winPercentageToday = winsToday/playsToday;
    const stats = {
        average: averageGuesses,
        win: winPercentage,
        averageToday: averageGToday,
        winToday: winPercentageToday
    }
}