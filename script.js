import data from "./data.js"

const transportation = document.querySelector("#transportation");
const display = document.querySelector("#display");
const calculate = document.querySelector("#calculate");
const cityStart = document.querySelector("#city-start");
const cityDestination = document.querySelector("#city-destination");

console.log("Transportation element:", transportation);
console.log("Display element:", display);
console.log("Calculate button:", calculate);
console.log("City Start select:", cityStart);
console.log("City Destination select:", cityDestination);


// event listener only for the calculate button
calculate.addEventListener("click", update);

// populate the city dropdowns with city names
cityStart.innerHTML = getCities();
cityDestination.innerHTML = getCities();


// function to populate dropdown options
function getCities() {
    let options = "";
    for (let i = 0; i < data.cities.length; i+=1) {
        options += `<option value="${data.cities[i].name}">${data.cities[i].name}</option>`;
    }
    return options;
}

// function to calculate the distance using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const toRadians = (degrees) => degrees * (Math.PI / 180);
    const R = 3959; // radius of the earth in miles

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = 
    Math.sin(dLat / 2) * Math.sin(dLat /2) + 
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // distanc in miles
    return distance.toFixed(2); // return distance with 2 decimals points 

}


function update(e) {
    // prevent the form from submitting
    e.preventDefault();

    // get selected values from the form
    const user = transportation.value;
    const originName = cityStart.value;
    const destinationName = cityDestination.value;

    // find the selected cities latitude and longitude
    const originCity = data.cities.find(city => city.name === originName);
    const destinationCity = data.cities.find(city => city.name === destinationName)

    // if both origin and destination cities are selected
    if (originCity && destinationCity) {
        const originLat = originCity.lat;
        const originLon = originCity.lon;
        const destinationLat = destinationCity.lat;
        const destinationLon = destinationCity.lon;
        // calculate the distance between the two cities
        const distance = calculateDistance(originLat, originLon, destinationLat, destinationLon);
        // show the result only when the calculate button is clicked
        if (user === "driving" && originName && destinationName) {
            display.innerHTML = `Driving from ${originName} to ${destinationName} is: ${distance} miles.`;
        } else if (user === "flying" && originName && destinationName) {
            display.innerHTML = `Flying from ${originName} to ${destinationName} is: ${distance} miles`;
        } else {
            display.innerHTML = "Please select both cities, thank you!";
        }
    }
}