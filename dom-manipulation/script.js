const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API endpoint

// Array to store quotes, initially empty and populated from the API
let quotes = [];
// Function to fetch initial data from the API
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        quotes = data.slice(0, 10).map(item => ({
            text: item.title,
            category: 'General'
        }));
        localStorage.setItem('quotes', JSON.stringify(quotes)); // Save fetched quotes to localStorage
        loadQuotes();
        populateCategoriesDropdown();
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
}




// Function to synchronize quotes with the server
async function syncQuotes() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const fetchedQuotes = data.slice(0, 10).map(item => ({
            text: item.title,
            category: 'General'
        }));

        // Check for discrepancies and update local quotes if needed
        let hasDiscrepancies = false;
        if (quotes.length !== fetchedQuotes.length) {
            hasDiscrepancies = true;
        } else {
            for (let i = 0; i < quotes.length; i++) {
                if (quotes[i].text !== fetchedQuotes[i].text || quotes[i].category !== fetchedQuotes[i].category) {
                    hasDiscrepancies = true;
                    break;
                }
            }
        }

        if (hasDiscrepancies) {
            quotes = fetchedQuotes;
            localStorage.setItem('quotes', JSON.stringify(quotes));
            loadQuotes();
            populateCategoriesDropdown();
        }
    } catch (error) {
        console.error('Error syncing quotes:', error);
    }
}




// Array to store quotes


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

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newQuote)
            });
    
            if (response.ok) {
                const data = await response.json();
                quotes.push({
                    text: data.text || newQuote.text,
                    category: data.category || newQuote.category
                });
    
                localStorage.setItem('quotes', JSON.stringify(quotes));
                loadQuotes();
                populateCategoriesDropdown();
                textInput.value = '';
                categoryInput.value = '';
                alert('Quote added successfully!');
            } else {
                alert('Failed to add quote');
            }
        } catch (error) {
            console.error('Error adding quote:', error);
        }
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

// Function to populate categories dropdown
function populateCategoriesDropdown() {
    const categoryFilter = [...new Set(quotes.map(quote => quote.category))];
    const categoryDropdown = document.getElementById('categoryDropdown');
    categoryDropdown.innerHTML = ''; // Clear existing options

    categoryFilter.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
    });

    // Restore the last selected category from localStorage
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
        categoryDropdown.value = savedCategory;
        filterQuotes(); // Filter quotes based on the saved category
}



// Function to filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryDropdown').value;
    const quotesContainer = document.getElementById('quotesContainer');
    quotesContainer.innerHTML = ''; // Clear existing quotes

    const filteredQuotes = selectedCategory
        ? quotes.filter(quote => quote.category === selectedCategory)
        : quotes;

    filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.innerText = `"${quote.text}" - Category: ${quote.category}`;
        quotesContainer.appendChild(quoteElement);
    });
}
  // Save the selected category to localStorage
  localStorage.setItem('selectedCategory', selectedCategory);


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

// Function to show notifications
function showNotification("Quotes synced with server!") {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // Hide notification after 3 seconds
}


// Function to periodically fetch data from the API
function startPeriodicFetching() {
    setInterval(fetchQuotesFromServer, 60000); // Fetch quotes every 60 seconds
}

// Adding event listeners to buttons
document.getElementById('showQuoteButton').addEventListener('click', showRandomQuote);
document.getElementById('exportQuotesButton').addEventListener('click', exportToJasonFile);

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();
})