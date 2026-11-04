const express = require("express");

const app = express();
const PORT = 3000;

// Startsidan
app.get("/", (req, res) => {
    res.send("Welcome to Player Management System!");
});

// Starta servern
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});