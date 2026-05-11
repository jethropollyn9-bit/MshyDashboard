// Initialize state from localStorage or load default roster payload
let players = JSON.parse(localStorage.getItem('mySquad')) || [
    { name: "Jethro", rating: 81, position: "RW" },
    { name: "Mshy", rating: 90, position: "CAM" },
    { name: "Spi", rating: 90, position: "ST" },
    { name: "OBD", rating: 83, position: "CDM" },
    { name: "AK", rating: 89, position: "LW" }
];

// DOM Elements
const rosterGrid = document.getElementById('roster-grid');
const signBtn = document.getElementById('confirm-signing');

/**
 * Renders the player cards to the DOM and recalculates squad statistics.
 */
function displayPlayers() {
    // Clear existing grid
    rosterGrid.innerHTML = ""; 
    
    // Map players to DOM elements
    players.forEach((player, index) => {
        const card = document.createElement('div');
        card.className = 'player-card';
        
        card.innerHTML = `
            <button class="sack-btn" onclick="deletePlayer(${index})">X</button>
            <div style="font-size: 3.5rem; font-weight: 800; color: var(--fc-volt); line-height: 1;">${player.rating}</div>
            <div style="font-size: 1.5rem; margin-top: 10px; font-weight: 700;">${player.name}</div>
            <div style="color: #6e7a8a; font-size: 1rem; margin-top: 5px;">${player.position}</div>
        `;
        rosterGrid.appendChild(card);
    });
    
    // Update squad metrics
    document.getElementById('player-count').innerText = players.length;
    
    let totalRating = 0; 
    players.forEach(player => {
        totalRating += Number(player.rating); 
    });

    // Calculate OVR (prevent division by zero)
    let averageOvr = 0;
    if (players.length > 0) {
        averageOvr = Math.round(totalRating / players.length);
    }

    document.getElementById('team-avg').innerText = averageOvr;
}

// Event Listener: Add new player to roster
document.getElementById('confirm-signing').addEventListener('click', () => {
    let nameInput = document.getElementById('player-name').value;
    let ratingInput = document.getElementById('player-rating').value;
    let posInput = document.getElementById('player-position').value;

    if (nameInput && ratingInput) {
        // Update state array
        players.push({
            name: nameInput,
            rating: ratingInput,
            position: posInput
        });

        // Persist to local memory
        localStorage.setItem('mySquad', JSON.stringify(players));

        // Reset form inputs
        document.getElementById('player-name').value = "";
        document.getElementById('player-rating').value = "";

        // Trigger UI update
        displayPlayers();
    }
});

/**
 * Removes a player from the roster based on array index.
 * @param {number} index - The index of the player to remove.
 */
function deletePlayer(index) {
    // Mutate state array
    players.splice(index, 1);

    // Persist updated state
    localStorage.setItem('mySquad', JSON.stringify(players));

    // Trigger UI update
    displayPlayers();
}

// Initial render on mount
displayPlayers();