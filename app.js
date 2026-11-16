
const express = require("express");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// Kontrollera spelarens uppgifter
function isValidPlayer(name, score) {
  return (
    typeof name === "string" &&
    name.trim().length > 0 &&
    typeof score === "number" &&
    Number.isFinite(score) &&
    score >= 0
  );
}

// READ - Visa alla spelare
app.get("/players", (req, res) => {
  const players = db.prepare("SELECT * FROM players").all();

  res.json(players);
});

// CREATE - Lägg till en ny spelare
app.post("/players", (req, res) => {
  const { name, score } = req.body || {};

  if (!isValidPlayer(name, score)) {
    return res.status(400).json({
      message: "Enter a valid name and score."
    });
  }

  const result = db.prepare(
    "INSERT INTO players (name, score) VALUES (?, ?)"
  ).run(name.trim(), score);

  const newPlayer = db.prepare(
    "SELECT * FROM players WHERE id = ?"
  ).get(result.lastInsertRowid);

  res.status(201).json(newPlayer);
});

// UPDATE - Uppdatera en spelare
app.put("/players/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, score } = req.body || {};

  const player = db.prepare(
    "SELECT * FROM players WHERE id = ?"
  ).get(id);

  if (!player) {
    return res.status(404).json({
      message: "Player not found."
    });
  }

  if (!isValidPlayer(name, score)) {
    return res.status(400).json({
      message: "Enter a valid name and score."
    });
  }

  db.prepare(
    "UPDATE players SET name = ?, score = ? WHERE id = ?"
  ).run(name.trim(), score, id);

  const updatedPlayer = db.prepare(
    "SELECT * FROM players WHERE id = ?"
  ).get(id);

  res.json(updatedPlayer);
});

// DELETE - Ta bort en spelare
app.delete("/players/:id", (req, res) => {
  const id = Number(req.params.id);

  const player = db.prepare(
    "SELECT * FROM players WHERE id = ?"
  ).get(id);

  if (!player) {
    return res.status(404).json({
      message: "Player not found."
    });
  }

  db.prepare(
    "DELETE FROM players WHERE id = ?"
  ).run(id);

  res.json({
    message: "Player deleted successfully.",
    player: player
  });
});

// Starta servern
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
