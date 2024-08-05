import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("REPLACE WITH YOUR GEMINI API KEY");



export async function setupPlace1Button() {
    // Ensure the button exists before adding an event listener
    const button = document.getElementById("hotel");
    if (!button) {
        console.error("Button with id 'hotel' not found.");
        return;
    }

    // Set up the event listener for the button
    button.addEventListener("click", async () => {
        try {
            // Collect values from textboxes
            const destinations = [];
            const inputCount = window.inputCount || 1; // Example default value

            for (let i = 1; i <= inputCount; i++) {
                // Get the value from the textbox and trim any whitespace
                const dest = document.getElementById("place" + i)?.value.trim();
                console.log("Destinations:", dest);
                // Check if the textbox has a value
                if (dest) {
                    destinations.push(dest);
                }
            }


            // Join the destinations into a single string separated by commas
            const destinationsString = destinations.join(', ');
            console.log("Destinations:", destinationsString);

            // Save destinations to localStorage

            // Fetch the data from the model using the destinations string
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            // Set the prompt based on the collected destinations
            let prompt = "Just reply this text back: Enter place for Hotel recommendation";
            if (destinationsString) {
                prompt = `best hotels to stay in ${destinationsString} in 3 categories: luxury, budget, and cheap, add one veg-friendly hotel.`;
            }
            //console.log("Sending prompt:", prompt);

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const responseText = await response.text(); // Await the response text
            console.log("Response received:", responseText);

            // Encode response text to be safely included in URL
            const encodedResponseText = encodeURIComponent(responseText);
            console.log("Encoded response text:", encodedResponseText);

            // Redirect to the new page with the response text as a URL parameter
            window.location.href = `response.html?response=${encodedResponseText}`;
        } catch (error) {
            console.error("Error occurred while fetching or processing the response:", error);
        }
    });
}

// Ensure the function is called when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    setupPlace1Button();
});


export async function travelItenaryButton() {
    // Ensure the button exists before adding an event listener
    const button = document.getElementById("travelitenary");
    if (!button) {
        console.error("Button with id 'travelitenary' not found.");
        return;
    }

    // Set up the event listener for the button
    button.addEventListener("click", async () => {
        try {
            // Collect values from textboxes
            const destinations = [];
            const inputCount = window.inputCount || 1; // Example default value

            for (let i = 1; i <= inputCount; i++) {
                // Get the value from the textbox and trim any whitespace
                const dest = document.getElementById("place" + i)?.value.trim();
                console.log("Destinations:", dest);
                // Check if the textbox has a value
                if (dest) {
                    destinations.push(dest);
                }
            }

            // Join the destinations into a single string separated by commas
            const destinationsString = destinations.join(', ');
            console.log("Destinations:", destinationsString);

            // Fetch the data from the model using the destinations string
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            // Set the prompt based on the collected destinations
            let prompt = "Just reply this text back: Enter place for Travel Itenary";
            if (destinationsString) {

                prompt = `Just give travel iternary without asking additional information: Sort the places ${destinationsString} based on travel time and distance and if order is changed suggest the user to change the order. Optimize a travel itinerary between ${destinationsString} based on travel time and distance. Prioritize the route that minimizes overall travel time. Suggest an itinerary including sightseeing, hotel relaxation, and travel time for each city.`;
            }
            //console.log("Sending prompt:", prompt);

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const responseText = await response.text(); // Await the response text
            //console.log("Response received:", responseText);

            // Encode response text to be safely included in URL
            const encodedResponseText = encodeURIComponent(responseText);
            console.log("Encoded response text:", encodedResponseText);

            // Redirect to the new page with the response text as a URL parameter
            window.location.href = `itenary.html?response=${encodedResponseText}`;
        } catch (error) {
            console.error("Error occurred while fetching or processing the response:", error);
        }
    });
}

// Ensure the function is called when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    travelItenaryButton();
});


