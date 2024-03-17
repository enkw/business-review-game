let rDay = 0;
let guess = "";
let guesses = 1;
let win = false;
let url = "";
let urlData = [];
let game = 1;

const sumbitEl = $("#submit");
const messageEl = $("#message");
const remainingGuessesEl = $("#r-guesses");
const randomDateEl = $("#random-date");
const guessEl = $("#guess");
const newDayEl = $("#new-day");
const nextGameEl = $("#next-game");

// gets data for game from fetch'd data
function getEarthquakeData(data) {
  const dataArray = [];
  // gets length of array
  dataArray.push(data.features.length);
  // gets highest magnitude earthquake
  dataArray.push(data.features[0].properties.mag);
  // gets lowest magnitude earthquake
  dataArray.push(data.features[data.features.length - 1].properties.mag);
  // returns array with game data
  return dataArray;
}
// processes an incorrect guess
function guessWrong(){
  remainingGuessesEl.text(6 - guesses);
  guesses++;
  guessEl.text("");
}
// resets when you guess correct
function guessCorrect(storage){
  remainingGuessesEl.text(6 - guesses);
  win = true;
  storeData(storage);
  guessEl.text("");
  sumbitEl.off("click");
}
// displays your previous guess and some additional hints
function createGuessEl(img){
  const divEl = $("<div>").addClass("guess");
  const textEl = $("<h4>");
  const imgEl = $("<img>");
  textEl.text(guess);
  imgEl.attr("src", img);
  divEl.append(textEl, imgEl);
  $("#guess-container").append(divEl);
}

function clearGuessEl(){
  $("div").remove(".guess");
}

function gameQuakeAmount(data) {
  const storageArray = readFromLocalStorage("amount");
  guess = Number(guessEl.val());
  messageEl.text("Guess how many earquakes happened on the date above.");
  const dataNumber = data[0] || 0;
  if (guess == dataNumber && guesses === 1) {
    // checks if you got it right on first try
    messageEl.text("Wow! You guessed right on the first try no way!");
    createGuessEl("#");
    guessCorrect(storageArray);
  } else if (guess == dataNumber) {
    // checks if you won
    messageEl.text("You did it!");
    createGuessEl("#");
    guessCorrect(storageArray);
  } else if (guess != dataNumber && guesses < 6) {
    // checks if your guess was higher or lower
    console.log(dataNumber);
    if (guess < dataNumber) {
      // checks if its lower
      messageEl.text("There were more this day.");
      createGuessEl("#");
      guessWrong();
    } else if (guess > dataNumber) {
      // checks if its higher
      messageEl.text("There were less this day.");
      createGuessEl("#");
      guessWrong();
    } else {
      // checks if you put in a number
      messageEl.text("Please give me a number");
      guessEl.text("");
    }
  } else if (guesses === 6) {
    // checks if you lost
    messageEl.text("Better luck next time");
    remainingGuessesEl.text(6 - guesses);
    storeData(storageArray);
    guessEl.text("");
    sumbitEl.off("click");
  }
}
// gives you either the highest or lowest magnitude
function magnitudeGuesser(data, lowHigh) {
  const storageArray = readFromLocalStorage(lowHigh);
  guess = Number(guessEl.val());
  messageEl.text(`Guess what the ${lowHigh}est magnitude earquake was on this day`);
  // chooses weather it will be high or low
  let selector = 0;
  if (lowHigh === "low") {
    selector = 2;
  } else {
    selector = 1;
  }
  // checks if the data if null and changes it to 0
  const dataNumber = data[selector] || 0;
  if (guess == dataNumber && guesses === 1) {
    // checks if you got it right on first try
    messageEl.text("Wow! You guessed right on the first try no way!");
    createGuessEl("#");
    guessCorrect(storageArray);
  } else if (guess == dataNumber) {
    // checks if you won
    messageEl.text("You did it!");
    createGuessEl("#");
    guessCorrect(storageArray);
  } else if (guess != dataNumber && guesses < 6) {
    // checks if your guess was higher or lower
    console.log(dataNumber);
    if (guess < dataNumber) {
      // checks if its lower
      messageEl.text("It was a higher magnitude this day.");
      createGuessEl("#");
      guessWrong();
    } else if (guess > dataNumber) {
      // checks if its higher
      messageEl.text("It was a lower magnitude this day.");
      createGuessEl("#");
      guessWrong();
    } else {
      // checks if you put in a number
      messageEl.text("Please give me a number");
      guessEl.text("");
    }
  } else if (guesses === 6) {
    // checks if you lost
    messageEl.text("Better luck next time");
    remainingGuessesEl.text(6 - guesses);
    storeData(storageArray);
    guessEl.text("");
    sumbitEl.off("click");
  }
}
// creates event handler for game being played
function gamePlaying(){
  if(game === 1){
    startGame();
    messageEl.text("Guess how many earquakes happened on the date above.");
  } else if(game === 2){
    sumbitEl.on("click", function () {
      magnitudeGuesser(getEarthquakeData(urlData), "high");
    });
    messageEl.text("Guess what the highest magnitude earthquake was on the date above");
  } else if(game === 3){
    sumbitEl.on("click", function () {
      magnitudeGuesser(getEarthquakeData(urlData), "low");
    });
    messageEl.text("Guess what the lowest magnitude earthquake was on the date above");
    
  } else {
    console.log("error");
  }
}


// stores array in local storage
function storeData(array) {
  const singleGame = {
    tries: guesses,
    day: dayjs(),
    winLoss: win,
  };
  array.push(singleGame);
  storeInLocalStorage(array, "amount");
  guesses = 1;
  win = false;
}

// gives you a random day starting from today back to when you make the start date
function randomDay(startDate) {
  const now = dayjs();
  const subtractBy = now - Number(startDate);
  const unix = now - Math.floor(Math.random() * subtractBy);
  return [
    dayjs(unix).format("YYYY-MM-DD"),
    dayjs(unix).add(1, "day").format("YYYY-MM-DD"),
  ];
}
// Stores data in local storage
function storeInLocalStorage(game, type) {
  localStorage.setItem(type, JSON.stringify(game));
}
// Reads data from local storage and creates one if there isnt one there already
function readFromLocalStorage(type) {
  let gameData = JSON.parse(localStorage.getItem(type));
  if (!gameData) {
    gameData = [];
  }
  return gameData;
}

function startGame() {
  rDay = randomDay(0);
  randomDateEl.text(rDay[0]);
  url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${rDay[0]}&endtime=${rDay[1]}&orderby=magnitude`;
  fetch(url).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        urlData = data;
      });
    }
  });
  sumbitEl.on("click", function () {
    gameQuakeAmount(getEarthquakeData(urlData));
  });
}

function init(){
  startGame();
  newDayEl.on("click", newDate);
  nextGameEl.on("click", nextGame);
}

function newDate(){
  sumbitEl.off("click");
  clearGuessEl();
  rDay = randomDay(0);
  randomDateEl.text(rDay[0]);
  guesses = 1;
  remainingGuessesEl.text(6);
  guessEl.text("");
  url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${rDay[0]}&endtime=${rDay[1]}&orderby=magnitude`;
  fetch(url).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        urlData = data;
      });
    }
  });
  gamePlaying();
}

function nextGame(){
  sumbitEl.off("click");
  if(game < 3){
    game++;
  } else {
    game = 1;
  }
  clearGuessEl();
  guesses = 1;
  remainingGuessesEl.text(6);
  guessEl.text("");
  gamePlaying();
}

init();

