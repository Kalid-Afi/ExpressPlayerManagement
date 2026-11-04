const express = require("express");

const app = express();
const PORT = 3000;

//Express kan läsa JSON-data från förfrågningar
app.use(express.json());

// Tillfällig lista med spelare
let players = [
    { id: 1, name: "Player One", score: 120 },
    { id: 2, name: "Player Two", score: 95 },
    { id: 3, name: "Player Three", score: 80 }
];

// Startsidan
app.get("/", (req, res) => {
    res.send("Welcome to Player Management System!");
});

// READ - Visa alla spelare
app.get("/players", (req, res) => {
    res.json(players);
});

// CREATE - Lägg till en ny spelare
app.post("/players", (req, res) => {
    const { name, score } = req.body;

    // Kontrollera att informationen är giltig
    if (typeof name !== "string" || !name.trim() ||
        typeof score !== "number" || !Number.isFinite(score) || score < 0) {
        return res.status(400).json({
            message: "Enter a valid name and score."
        });
    }

    // Skapa ett unikt ID
    const newId = players.length > 0
        ? Math.max(...players.map(player => player.id)) + 1
        : 1;

    const newPlayer = {
        id: newId,
        name: name.trim(),
        score: score
    };

    players.push(newPlayer);

    res.status(201).json(newPlayer);
});

// UPDATE - Uppdatera en befintlig spelare
app.put("/players/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, score } = req.body || {};

    // Hitta spelaren med rätt ID
    const player = players.find(player => player.id === id);

    if (!player) {
        return res.status(404).json({
            message: "Player not found."
        });
    }

    // Kontrollera informationen
    if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof score !== "number" ||
        !Number.isFinite(score) ||
        score < 0
    ) {
        return res.status(400).json({
            message: "Enter a valid name and score."
        });
    }

    // Uppdatera spelaren
    player.name = name.trim();
    player.score = score;

    res.json(player);
});

// DELETE - Ta bort en spelare
app.delete("/players/:id", (req, res) => {
    const id = Number(req.params.id);

    // Hitta spelarens position i listan
    const playerIndex = players.findIndex(player => player.id === id);

    // Kontrollera om spelaren finns
    if (playerIndex === -1) {
        return res.status(404).json({
            message: "Player not found."
        });
    }

    // Ta bort spelaren
    const deletedPlayer = players.splice(playerIndex, 1)[0];

    res.json({
        message: "Player deleted successfully.",
        player: deletedPlayer
    });
});


// Starta servern
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

