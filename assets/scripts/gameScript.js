// url to get earthquakes in ascending order of magnitude 
const url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02&orderby=magnitude";
// array to use for storing game data globaly
let gameArray = [];

// fetch request for earthquakes
fetch(url).then(function (response) {
    if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
            gameArray = getEarthquakeData(data);
        })
    }
})


// gets data for game from fetch'd data
function getEarthquakeData(data) {
    let dataArray = [];
    // gets length of array
    dataArray.push(data.features.length);
    // gets highest magnitude earthquake
    dataArray.push(data.features[0]);
    // gets lowest magnitude earthquake
    dataArray.push(data.features[data.features.length-1]);
    return dataArray;
}
