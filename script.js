const API_KEY = "5f1192bb6a474201934a847e7665a319"; // Remplace avec ta clé RAWG API
const API_URL = "https://api.rawg.io/api/games";

async function fetchGames(query = "") {
    try {
        const url = query 
            ? `${API_URL}?key=${API_KEY}&search=${query}`
            : `${API_URL}?key=${API_KEY}&ordering=-rating&page_size=12`;
        
        const response = await fetch(url);
        const data = await response.json();
        displayGames(data.results);
    } catch (error) {
        console.error("Erreur lors de la récupération des jeux :", error);
    }
}

function displayGames(games) {
    const gamesList = document.getElementById("games-list");
    gamesList.innerHTML = "";

    games.forEach(game => {
        const gameElement = document.createElement("div");
        gameElement.classList.add("card");
        gameElement.innerHTML = `
            <img src="${game.background_image}" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>📅 Sortie : ${game.released}</p>
            <p class="rating">⭐ ${game.rating} / 5</p>
        `;
        gamesList.appendChild(gameElement);
    });
}

function searchGames() {
    const query = document.getElementById("search").value;
    fetchGames(query);
}

// Charger les jeux populaires au démarrage
fetchGames();
