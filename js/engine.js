/*
==========================================
FCMI Tactics Engine v1.0
Football Club Tactical Intelligence
==========================================
*/

class FCMIEngine {

    constructor() {
        this.squad = null;
        this.tactics = [];
    }

    // Load player's squad
    loadSquad(squad) {
        this.squad = squad;
    }

    // Load tactics database
    loadTactics(tactics) {
        this.tactics = tactics;
    }

    // Calculate compatibility score
    calculateCompatibility(tactic) {

        let score = 0;

        if (!this.squad) return 0;

        // Formation Match
        if (this.squad.formation === tactic.formation) {
            score += 30;
        }

        // Manager Mode bonus
        if (tactic.gameMode === "Manager Mode") {
            score += 20;
        }

        // Verified tactic bonus
        if (tactic.verified === true) {
            score += 20;
        }

        // Community Rating
        score += tactic.rating * 0.3;

        return Math.round(score);

    }

    // Find best tactic
    recommendBestTactic() {

        let bestTactic = null;
        let highestScore = 0;

        for (const tactic of this.tactics) {

            const score = this.calculateCompatibility(tactic);

            if (score > highestScore) {

                highestScore = score;
                bestTactic = tactic;

            }

        }

        return {

            tactic: bestTactic,
            compatibility: highestScore

        };

    }

}

// Export Engine
window.FCMIEngine = FCMIEngine;