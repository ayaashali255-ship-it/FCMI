// FCMI Database Engine

let tactics = [];

async function loadTactics() {
    try {
        const response = await fetch("data/tactics.json");
        tactics = await response.json();

        console.log("FCMI Database Loaded");
        console.log(tactics);
    } catch (error) {
        console.error("Database Error:", error);
    }
}

loadTactics();