// FCMI Database Engine

let tactics = [];

async function loadTactics() {
    try {
        const response = await fetch("data/tactics.json");
        tactics = await response.json();

        const container = document.getElementById("tactics-container");

        if (!container) return;

        container.innerHTML = "";

        tactics.forEach(tactic => {
            container.innerHTML += `
                <div class="card">
                    <h3>${tactic.name}</h3>
                    <p><b>ID:</b> ${tactic.id}</p>
                    <p><b>Formation:</b> ${tactic.formation}</p>
                    <p><b>Game Mode:</b> ${tactic.gameMode}</p>
                    <p><b>Rating:</b> ${tactic.rating}/100</p>
                </div>
            `;
        });

    } catch (error) {
        console.error("Database Error:", error);
    }
}

loadTactics();