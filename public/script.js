// Hämta och visa alla spelare
async function loadPlayers() {
    const response = await fetch("/players");
    const players = await response.json();

    const table = document.getElementById("playersTable");

    // Töm tabellen innan vi lägger till spelarna
    table.innerHTML = "";

    players.forEach(player => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = player.id;

        const nameCell = document.createElement("td");
        nameCell.textContent = player.name;

        const scoreCell = document.createElement("td");
        scoreCell.textContent = player.score;

        const actionsCell = document.createElement("td");

        row.append(idCell, nameCell, scoreCell, actionsCell);
        table.appendChild(row);
    });
}

// Kör funktionen när sidan laddas
loadPlayers();

// CREATE - Lägg till en spelare via formuläret
document.getElementById("playerForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    // Hämta värden från formuläret
    const name = document.getElementById("playerName").value;
    const score = Number(document.getElementById("playerScore").value);

    // Skicka spelaren till Express-servern
    const response = await fetch("/players", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, score })
    });

    if (!response.ok) {
        alert("Could not add player.");
        return;
    }

    // Töm formuläret
    document.getElementById("playerForm").reset();

    // Uppdatera tabellen
    loadPlayers();
});