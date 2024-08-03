// Array to store quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) ||[
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
    quoteDisplay.innerHTML = `"${randomQuote.text}" - Category: ${randomQuote.category}`;
}



function addQuote() {
    const textInput = document.getElementById('newQuote');
    // const categoryInput = document.getElementById('newQuoteCategory');

    // Check if inputs are not empty
    if (textInput.value.trim() === "" || categoryInput.value.trim() === "") {
        alert('Both fields are required.');
        return;
    }

   

    // Add new quote to the quotes array
    function createAddQuoteForm(){
        const newQuote = {
            text: textInput.value,
            category: categoryInput.value
        };
        quotes.push(newQuote);
   
 // Save the updated quotes array to localStorage
 localStorage.setItem('quotes', JSON.stringify(quotes));

         // Update the DOM with the new quote
    const quotesContainer = document.getElementById('quotesContainer');
    const quoteElement = document.createElement('div');
    quoteElement.innerText = `"${newQuote.text}" - Category: ${newQuote.category}`;
    quotesContainer.appendChild(quoteElement);
    }
    

    // Clear the form inputs
    textInput.value = '';
    categoryInput.value = '';

    alert('Quote added successfully!');

// Function to load all quotes from the array into the DOM
function loadQuotes() {
    const quotesContainer = document.getElementById('quotesContainer');
    quotesContainer.innerHTML = ''; // Clear existing quotes
    quotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.innerText = `"${quote.text}" - Category: ${quote.category}`;
        quotesContainer.appendChild(quoteElement);
    });
}
    showRandomQuote(); // Optionally display the newly added quote
}



// Function to export quotes to a JSON file
function exportToJasonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}




function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }






// Adding event listeners to buttons
document.getElementById('showQuoteButton').addEventListener('click', showRandomQuote);
document.getElementById('exportQuotesButton').addEventListener('click', exportToJasonFile);

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();
});