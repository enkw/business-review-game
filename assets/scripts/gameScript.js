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
  // gets highest magnitude earquake long lat
  dataArray.push(data.features[0].geometry.coordinates);
  // gets lowest magnitude earthquake long lat
  dataArray.push(data.features[data.features.length - 1].geometry.coordinates);
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
  const textEl = $("<h6>");
  const imgEl = $("<img>");
  textEl.text(guess);
  imgEl.attr(`src`, img);
  divEl.append(textEl, imgEl);
  $("#guess-container").append(divEl);
}

// Variables for the different icons for the hints, trying to figure out how to inject this
// const up1El = `../images/green-arrow-up.png`;
// const up2El = `../images/yellow-arrow-up.png`;
// const up3El = `../images/orange-arrow-up.png`;
// const up4El = `../images/red-arrow-up.png`;
// const up5El = `../images/red-x.png`;
// const down1El = `../images/green-arrow-down.png`;
// const down2El = `../images/yellow-arrow-down.png`;
// const down3El = `../images/orange-arrow-down.png`;
// const down4El = `../images/red-arrow-down.png`;
// const down5El = `../images/red-x.png`;
// const correctEl = `../images/green-check.png`;

// clears guess elements
function clearGuessEl(){
  $("div").remove(".guess");
}
// api key
const apiToken = prompt("ApiKey please");
// creates map 
function createMapEl(long, lat){
  $("#map-box").attr("src",`https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/pin-l-embassy+f74e4e(${long},${lat})/${long},${lat},3/500x300?access_token=${apiToken}`);
}
// changes to placeholder image
function deleteMapEl(){
  $("#map-box").attr("src","#")
}

// first game for guessing how many 
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
    messageEl.text("You guessed correctly!");
    createGuessEl("#");
    guessCorrect(storageArray);
  } else if (guess != dataNumber && guesses < 6) {
    // checks if your guess was higher or lower
    console.log(dataNumber);
    if (guess < dataNumber && guess+3 >= dataNumber) {
      // checks if its slightly lower
      messageEl.text("Slighly more.");
      createGuessEl("#");
      guessWrong();
    } else if(guess < dataNumber && guess+10 >=dataNumber){
      // checks if its lower
      messageEl.text("More.");
      createGuessEl("#");
      guessWrong();
    } else if(guess < dataNumber && guess+50 >=dataNumber){
      // checks if its way lower
      messageEl.text("A lot more.");
      createGuessEl("#");
      guessWrong();
    } else if(guess < dataNumber && guess+100 >=dataNumber){
      // checks if its much much lower
      messageEl.text("Way Way more.");
      createGuessEl("#");
      guessWrong();
    } else if(guess < dataNumber){
      // checks if you are way off
      messageEl.text("You are way off try a lot higher.");
      createGuessEl("#");
      guessWrong();
    } else if (guess > dataNumber && guess-3 <= dataNumber) {
      // checks if its slightly higher
      messageEl.text("Slightly less.");
      createGuessEl("#");
      guessWrong();
    } else if(guess > dataNumber && guess-10 <= dataNumber){
      // checks if its higher
      messageEl.text("Less.")
      createGuessEl("#");
      guessWrong();
    } else if(guess > dataNumber && guess-50 <= dataNumber){
      // checks if its way higher
      messageEl.text("A lot less.");
      createGuessEl("#");
      guessWrong();
    } else if(guess > dataNumber && guess-100 <= dataNumber){
      // checks if its much much higher
      messageEl.text("Way Way less.");
      createGuessEl("#");
      guessWrong();
    } else if(guess > dataNumber){
      // checks if you are way off
      messageEl.text("You are way off try a lot less.");
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
  let mapSelector = 0;
  if (lowHigh === "low") {
    selector = 2;
    mapSelector = 4;
  } else {
    selector = 1;
    mapSelector = 3;
  }
  // checks if the data if null and changes it to 0 and rounds it to one decimal place
  let dataNumber = data[selector] || 0;
  dataNumber = Math.round(dataNumber*10)/10;
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
    if (guess < dataNumber && guess+0.3 >= dataNumber) {
      // checks if its slightly lower
      messageEl.text("Slighly more.");
      createGuessEl("#");
      guessWrong();
    } else if(guess < dataNumber && guess+1 >=dataNumber){
      // checks if its lower
      messageEl.text("More.");
      createGuessEl("#");
      guessWrong();
    } else if(guess < dataNumber && guess+2.5 >=dataNumber){
      // checks if its way lower
      messageEl.text("A lot more.");
      createGuessEl("#");
      guessWrong();
    } else if(guess < dataNumber && guess+5 >=dataNumber){
      // checks if its much much lower
      messageEl.text("Way Way more.");
      createGuessEl("#");
      guessWrong();
    } else if(guess < dataNumber){
      // checks if you are way off
      messageEl.text("You are way off try a lot higher.");
      createGuessEl("#");
      guessWrong();
    } else if (guess > dataNumber && guess-0.3 <= dataNumber) {
      // checks if its slightly higher
      messageEl.text("Slightly less.");
      createGuessEl("#");
      guessWrong();
    } else if(guess > dataNumber && guess-1 <= dataNumber){
      // checks if its higher
      messageEl.text("Less.")
      createGuessEl("#");
      guessWrong();
    } else if(guess > dataNumber && guess-2.5 <= dataNumber){
      // checks if its way higher
      messageEl.text("A lot less.");
      createGuessEl("#");
      guessWrong();
    } else if(guess > dataNumber && guess-5 <= dataNumber){
      // checks if its much much higher
      messageEl.text("Way Way less.");
      createGuessEl("#");
      guessWrong();
    } else if(guess > dataNumber){
      // checks if you are way off
      messageEl.text("You are way off try a lot less.");
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
    deleteMapEl();
  } else if(game === 2){
    sumbitEl.on("click", function () {
      magnitudeGuesser(getEarthquakeData(urlData), "high");
    });
    messageEl.text("Guess what the highest magnitude earthquake was on the date above");
    createMapEl(getEarthquakeData(urlData)[3][0],getEarthquakeData(urlData)[3][1]);
  } else if(game === 3){
    sumbitEl.on("click", function () {
      magnitudeGuesser(getEarthquakeData(urlData), "low");
    });
    messageEl.text("Guess what the lowest magnitude earthquake was on the date above");
    createMapEl(getEarthquakeData(urlData)[4][0],getEarthquakeData(urlData)[4][1]);
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
    dayjs(unix).format("MM/DD/YYYY"),
    dayjs(unix).add(1, "day").format("MM/DD/YYYY"),
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

