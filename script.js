// 1. Your Roster Data
const players = [
    { name: "Jethro", rating: 85, position: "ST" },
    { name: "Mshy", rating: 82, position: "CAM" }
];

// 2. Connect to the HTML
const rosterGrid = document.getElementById('roster-grid');
const signBtn = document.getElementById('confirm-signing');

// 3. The Function that draws the player cards
function displayPlayers() {
    rosterGrid.innerHTML = ""; 
    
    players.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.innerHTML = `
            <div style="font-size: 3.5rem; font-weight: 800; color: var(--fc-volt); line-height: 1;">${player.rating}</div>
            <div style="font-size: 1.5rem; margin-top: 10px; font-weight: 700;">${player.name}</div>
            <div style="color: #6e7a8a; font-size: 1rem; margin-top: 5px;">${player.position}</div>
        `;
        rosterGrid.appendChild(card);
    });
    
    // Update the Squad Size number automatically
    document.getElementById('player-count').innerText = players.length;
}

// 4. Make the "Confirm Signing" button actually work
signBtn.addEventListener('click', () => {
    const nameInput = document.getElementById('new-player-name').value;
    const ratingInput = document.getElementById('new-player-rating').value;
    const posInput = document.getElementById('new-player-pos').value;

    if (nameInput && ratingInput) {
        // Add the new player to the list
        players.push({
            name: nameInput,
            rating: ratingInput,
            position: posInput
        });

        // Clear the typing boxes
        document.getElementById('new-player-name').value = "";
        document.getElementById('new-player-rating').value = "";

        // Redraw the screen to show the new player
        displayPlayers();
    }
});

// 5. Run the draw function as soon as the page opens
displayPlayers();