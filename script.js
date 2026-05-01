// 1. Roster Data
// --- NEW: CHECK MEMORY FIRST ---
// Melt the saved text back into an array, OR use the default players if it's empty
let players = JSON.parse(localStorage.getItem('mySquad')) || [
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
    
    let totalRating = 0; // 1. Create an empty bucket

    players.forEach(player => {
        // 2. Turn the text into a real number, then throw it in the bucket
        totalRating += Number(player.rating); 
    });

    // 3. Divide by the total players and round it to a whole number
    let averageOvr = Math.round(totalRating / players.length);

    // 4. Push that final number to the OVR box on the screen
    document.getElementById('team-avg').innerText = averageOvr;
}

// 4. Makinhg the Confirm Signing button work
document.getElementById('confirm-signing').addEventListener('click', () => {
    let nameInput = document.getElementById('new-player-name').value;
    let ratingInput = document.getElementById('new-player-rating').value;
    let posInput = document.getElementById('new-player-pos').value;

    if (nameInput && ratingInput) {
        // 1. Push the player exactly ONCE
        players.push({
            name: nameInput,
            rating: ratingInput,
            position: posInput
        });

        // 2. Save to memory ONCE
        localStorage.setItem('mySquad', JSON.stringify(players));

        // 3. Clear the input boxes
        document.getElementById('new-player-name').value = "";
        document.getElementById('new-player-rating').value = "";

        // 4. Update the screen
        displayPlayers();
    }
});

// 5. Run the draw function once the page opens
displayPlayers();