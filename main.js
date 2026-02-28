const cryptoContainer = document.getElementById('crypto-container');
const watchlistContainer = document.getElementById('watchlist-container');
const errorMessage = document.getElementById('error-message');
const searchInput = document.getElementById('search-input');
const lastUpdatedElement = document.getElementById('last-updated');

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

let cryptoData = [];
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

async function fetchCryptoData() {
    try {
        const response = await fetch(COINGECKO_API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        cryptoData = await response.json();
        renderCryptoData(cryptoData);
        renderWatchlist();
        updateTimestamp();
        errorMessage.style.display = 'none';
    } catch (error) {
        console.error('Error fetching crypto data:', error);
        errorMessage.textContent = 'Failed to fetch cryptocurrency data. Please try again later.';
        errorMessage.style.display = 'block';
    }
}

function createCoinElement(coin) {
    const coinElement = document.createElement('div');
    coinElement.classList.add('coin');

    const priceChangeClass = coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative';

    const innerHTML = `
        <div class="coin-header">
            <img src="${coin.image}" alt="${coin.name}" class="coin-image">
            <div>
                <div class="coin-name">${coin.name}</div>
                <div class="coin-symbol">${coin.symbol.toUpperCase()}</div>
            </div>
        </div>
        <div class="coin-price">$${coin.current_price.toLocaleString()}</div>
        <div class="price-change ${priceChangeClass}">${coin.price_change_percentage_24h.toFixed(2)}%</div>
    `;

    coinElement.innerHTML = innerHTML;
    return coinElement;
}

function renderCryptoData(data) {
    cryptoContainer.innerHTML = '';
    data.forEach(coin => {
        if (watchlist.includes(coin.id)) return;
        const coinElement = createCoinElement(coin);
        const button = document.createElement('button');
        button.classList.add('add-to-watchlist-btn');
        button.dataset.id = coin.id;
        button.textContent = 'Add to Watchlist';
        coinElement.appendChild(button);
        cryptoContainer.appendChild(coinElement);
    });
}

function renderWatchlist() {
    watchlistContainer.innerHTML = '';
    const watchlistData = cryptoData.filter(coin => watchlist.includes(coin.id));
    watchlistData.forEach(coin => {
        const coinElement = createCoinElement(coin);
        watchlistContainer.appendChild(coinElement);
    });
}

function addToWatchlist(coinId) {
    if (!watchlist.includes(coinId)) {
        watchlist.push(coinId);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        renderWatchlist();
        renderCryptoData(cryptoData);
    }
}

function updateTimestamp() {
    const now = new Date();
    lastUpdatedElement.textContent = `Last updated: ${now.toLocaleTimeString()}`;
}

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = cryptoData.filter(coin => coin.name.toLowerCase().includes(searchTerm));
    renderCryptoData(filteredData);
});

cryptoContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-watchlist-btn')) {
        const coinId = e.target.dataset.id;
        addToWatchlist(coinId);
    }
});

fetchCryptoData();
setInterval(fetchCryptoData, 30000);