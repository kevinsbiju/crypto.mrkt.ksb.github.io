# Crypto Market Overview

This project is a simple, single-page web application that provides a real-time overview of the cryptocurrency market. It allows users to view a list of top cryptocurrencies, search for specific coins, and maintain a personal watchlist.

## Architecture

The application is built using a framework-less approach, relying on modern web standards (HTML, CSS, and JavaScript) to deliver a clean and efficient user experience.

### Frontend

- **HTML (`index.html`):** The core structure of the application is defined in a single HTML file. It includes containers for the main coin list, the user's watchlist, a search input, and an error message display.

- **CSS (`style.css`):** The application is styled using basic CSS to match the provided Figma design. The styling is responsive and ensures a consistent look and feel across different screen sizes. Key styling features include:
    - A dark theme for the user interface.
    - A grid layout for displaying coin information.
    - Color-coded price changes (green for positive, red for negative).

- **JavaScript (`main.js`):** The application's logic is handled by a single JavaScript file. Its primary responsibilities include:
    - **API Interaction:** Fetching live cryptocurrency data from the CoinGecko API using the `fetch` API.
    - **Data Rendering:** Dynamically creating and updating the HTML to display the fetched data.
    - **Auto-Refresh:** Using `setInterval` to refresh the data every 30 seconds.
    - **Error Handling:** Displaying a user-friendly error message if the API call fails.
    - **Search:** Filtering the list of coins based on user input.
    - **Watchlist Management:**
        - Adding coins to a watchlist.
        - Storing the watchlist in the browser's `localStorage` for persistence.
        - Loading the watchlist from `localStorage` when the application starts.

### Deployment

The application is deployed to GitHub Pages, providing a fast and secure way to serve the static content (HTML, CSS, and JavaScript).

## How to Run Locally

1.  Clone this repository.

2.  Open the `index.html` file in your web browser.
