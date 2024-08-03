// Array to store quotes
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", category: "Motivation" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Dreams" }
];

function displayRandomQuote() {
    // Get a random index
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Display the quote on the web page
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerText = `"${randomQuote.text}" - Category: ${randomQuote.category}`;
}



function addQuote() {
    const textInput = document.getElementById('newQuote');
    // const categoryInput = document.getElementById('newQuoteCategory');

    // Check if inputs are not empty
    if (textInput.value.trim() === "" || categoryInput.value.trim() === "") {
        alert('Both fields are required.');
        return;
    }

    const newQuote = {
        text: textInput.value,
        category: categoryInput.value
    };

    // Add new quote to the quotes array
    quotes.push(newQuote);

    // Clear the form inputs
    textInput.value = '';
    categoryInput.value = '';

    alert('Quote added successfully!');
    showRandomQuote(); // Optionally display the newly added quote
}














// Adding event listeners to buttons
document.getElementById('showQuoteButton').addEventListener('click', showRandomQuote);

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();
});