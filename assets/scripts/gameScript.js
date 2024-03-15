// url to get earthquakes in ascending order of magnitude 
const url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02&orderby=magnitude";

// fetch request for earthquakes
fetch(url).then(function (response) {
    if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
            gameQuakeAmount(getEarthquakeData(data));
            magnitudeGuesser(getEarthquakeData(data), "high");
            magnitudeGuesser(getEarthquakeData(data), "low");
        })
    }
})

// gets data for game from fetch'd data
function getEarthquakeData(data) {
    const dataArray = []; 
    // gets length of array
    dataArray.push(data.features.length);
    // gets highest magnitude earthquake
    dataArray.push(data.features[0].properties.mag);
    // gets lowest magnitude earthquake
    dataArray.push(data.features[data.features.length-1].properties.mag);
    // returns array with game data
    return dataArray;
}

function gameQuakeAmount(data){
    // temporary javascript alerts and prompts
    let guess = prompt("Guess how many earthquakes happened on 2014-01-01");
    // checks if you got it right on first try
    if(guess == data[0]){
        alert("Wow! You guessed right on the first try no way!")
    } else {
        // has you keep guessing until you get it right
        while(guess != data[0]){
            console.log(data[0]);
            if(guess < data[0]){
                alert("There were more this day.");
                guess = prompt("Guess again");
            } else if(guess > data[0]){
                alert("There were less this day.");
                guess = prompt("Guess again");
            } else {
                alert("Please put in a number");
                guess = prompt("guess again");
            }
        }
        alert("You guessed right");
    }
}
// gives you either the highest or lowest magnitude
function magnitudeGuesser(data, lowHigh){
    console.log(data);
    // chooses weather it will be high or low
    let selector = 0;
    if(lowHigh === "low"){
        selector = 2;
    } else {
        selector = 1;
    }
    // temporary javascript alerts and prompts
    let guess = "";
    if(selector === 1){
        guess = prompt("Guess what the highest magnitude earthquake was on 2014-01-01");
    } else {
        guess = prompt("Guess what the lowest magnitude earthquake was on 2014-01-01");
    }
    // checks if you got it right on first try
    if(guess == data[selector]){
        alert("Wow! You guessed right on the first try no way!")
    } else {
        // has you keep guessing until you get it right
        while(guess != data[selector]){
            console.log(data[selector]);
            if(guess < data[selector]){
                alert("It was a higher magnitude");
                guess = prompt("Guess again");
            } else if(guess > data[selector]){
                alert("It was a lower magnitude");
                guess = prompt("Guess again");
            } else {
                alert("Please put in a number");
                guess = prompt("guess again");
            }
        }
        alert("You guessed right");
    }
}

// Function to generate a random date
function generateRandomDate() {
    const startDate = new Date(2000, 0, 1); // Start date for random date generation
    const endDate = new Date(); // End date is today's date
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));

    return randomDate.toDateString(); // Convert the random date to a string
}

// Update the date element with the random date
document.addEventListener("DOMContentLoaded", function() {
    const dateElement = document.getElementById("random-date");
    if (dateElement) {
        dateElement.textContent = "Date: " + generateRandomDate();
    }
});

