const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

const FILE = "./leaderboard.json";

// helper
function readData() {
    if (!fs.existsSync(FILE)) return {};
    return JSON.parse(fs.readFileSync(FILE));
}

function writeData(data) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// GET leaderboard
app.get("/leaderboard", (req, res) => {
    const data = readData();
    res.json(data);
});

// SAVE score
app.post("/score", (req, res) => {
    const { user, score } = req.body;
    if (!user) return res.sendStatus(400);

    const data = readData();
    data[user] = Math.max(data[user] || 0, score);

    writeData(data);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
