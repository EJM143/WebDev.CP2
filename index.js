    /**
     *  Name: Edale Miguel
        Date: October 26, 2024
    * 
    *  This file handles user-interactions and API request.
    *  It gets a random meme from the Imgflip API.
    */

"use strict";

// Fetch a random meme from the API as soon as the page loads
window.onload = fetchMeme;

// Fetch a new meme when the button is clicked
document.getElementById("memeButton").addEventListener("click", fetchMeme);

// Base URL
const BASE_URL = 'https://api.imgflip.com/get_memes'; 

// Step 1: Write a function to fetch data from a URL
/**
 * Fetches data from the specified URL.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<Object>} - A promise that resolves to the JSON response.
 * @throws {Error} - Throws an error if the fetch request fails or status is not ok.
 */
async function fetchData(url) {
    return fetch(url) 
        .then(statusCheck)
        .then(resp => resp.json()) 
        .then(processData) 
        .catch(error => {
            handleError(error);
            throw error; // Re-throw the error for further handling
        }); 
}

// Step 2: Implement a function to process the data
// You may want to break this apart into multiple functions

/**
 * /**
 * Processes the response data and displays a meme.
 * @param {Object} responseData - The data returned from the API.
 */
function processData(responseData) {
    // Display the meme
    displayMeme(responseData);
}

/**
 * Handles and displays error messages on the page.
 * @param {string} message - The error message to display
 * @param {Error} error - The error object containing the error message.
 */
function handleError(error) {
    const errorDiv = document.getElementById("errorMessage");
    errorDiv.textContent = "There was a problem fetching the meme: " + error.message; 
}

/**
 * Fetches and displays a random meme. Clears any previous error message.
 * Called when the page loads or the meme button is clicked.
 */
async function fetchMeme() {
    const errorDiv = document.getElementById("errorMessage");
    errorDiv.textContent = ""; // Clear previous error message
    try {
        await fetchData(BASE_URL); 
    } catch (error) {
        // Error already handled in fetchData
    }
}

/**
 * Displays a random meme image and its name on the page.
 * @param {Object} memeData - The data containing memes returned from the API.
 */
function displayMeme(memeData) {
    const memeImage = document.getElementById("memeImage");
    const memeText = document.getElementById("memeText");

    const randomMeme = memeData.data.memes[Math.floor(Math.random() * memeData.data.memes.length)];
    memeImage.src = randomMeme.url; // Set the meme image source
    memeText.textContent = randomMeme.name; // Set the meme text

    // Modify a classList of an element
    memeImage.classList.add("highlight");
}

// Step 3: Include the statusCheck function

/**
 * Checks the fetch response status.
 * @param {Response} response - The fetch response object
 * @returns {Response} - Returns the response if status is ok
 * @throws {Error} - Throws an error if the response status is not ok
 */
async function statusCheck(res) {
    if (!res.ok) {
        throw new Error(await res.text());
    }
    return res; 
}
