/**
 * Name: Edale Miguel
 * Date: October 26, 2024
 * 
 * This file handles user interactions and API requests.
 * It fetches location data based on a ZIP code from the Zippopotam.us API.
 */

// event listeners
document.querySelector('button').addEventListener('click', fetchLocation);
document.getElementById('zipCode').addEventListener('focus', clearZipCode);

// when enter key is press instead of clicking the submit button
document.getElementById('zipCode').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        fetchLocation(); 
    }
});

// to clear the ZIP code 
function clearZipCode() {
    document.getElementById('zipCode').value = ' '; 
}

// Step 1: Define the BASE_URL constant
const BASE_URL = "https://api.zippopotam.us/us/";

// Function to fetch location by ZIP code
async function fetchLocation() {
    const zipCode = document.getElementById('zipCode').value; 
    const locationInfoDiv = document.getElementById('locationInfo'); 

    // Clear previous messages
    locationInfoDiv.innerHTML = " ";

    // Check if zipCode is provided
    if (!zipCode) {
        locationInfoDiv.innerHTML = '<p>Please enter a ZIP code for location.</p>';
        return;
    }

    const url = BASE_URL + zipCode; // Construct API URL

    try {
        const response = await fetch(url);
        await statusCheck(response); 

        const data = await response.json(); 
        processData(data); 
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        locationInfoDiv.innerHTML = '<p>Location not found. Please try again.</p>'; 
    }
}

// Step 2: Function to process the data received from the API
function processData(data) {
    const locationInfoDiv = document.getElementById('locationInfo');
    locationInfoDiv.innerHTML = `City: ${data.places[0]['place name']}<br>State: ${data.places[0]['state']}`;
}

// Step 3: Include the statusCheck function
async function statusCheck(res) {
    if (!res.ok) {
        throw new Error(await res.text()); 
    }
    return res; 
}
