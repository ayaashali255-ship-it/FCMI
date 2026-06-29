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
analyzeSquad() {

    if (!this.squad) {
        return null;
    }

    return {

        formation: this.squad.formation,

        overall: this.squad.overall,

        attack: this.calculateAttack(),

        midfield: this.calculateMidfield(),

        defence: this.calculateDefence(),

        balance: this.calculateBalance()

    };

}
calculateAttack() {

    let attack = 0;

    if (!this.squad) return 0;

    attack += this.squad.overall * 0.4;

    if (this.squad.formation.includes("3")) {
        attack += 10;
    }

    return Math.round(attack);

}

calculateMidfield() {

    let midfield = 0;

    if (!this.squad) return 0;

    midfield += this.squad.overall * 0.35;

    if (this.squad.formation.includes("3")) {
        midfield += 15;
    }

    return Math.round(midfield);

}
calculateDefence() {

    let defence = 0;

    if (!this.squad) return 0;

    defence += this.squad.overall * 0.25;

    if (this.squad.formation.includes("4")) {
        defence += 15;
    }

    return Math.round(defence);

}

calculateBalance() {

    const attack = this.calculateAttack();
    const midfield = this.calculateMidfield();
    const defence = this.calculateDefence();

    return Math.round(
        (attack + midfield + defence) / 3
    );
}
countPositions() {

    if (!this.squad || !this.squad.players) {
        return {};
    }

    const positions = {};

    for (const player of this.squad.players) {

        if (!positions[player.position]) {
            positions[player.position] = 0;
        }

        positions[player.position]++;

    }

    return positions;

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