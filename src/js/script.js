const hero = { name: "Helten", hp: 100 };
const monster = { name: "Monsteret", hp: 100 };

const heroHP = document.getElementById("hero-hp");
const monsterHP = document.getElementById("monster-hp");
const logElement = document.getElementById("battle-log");
const attackBtn = document.getElementById("attack-btn");
const resetBtn = document.getElementById("reset-btn");

const heroFinal = document.getElementById("hero-final");
const monsterFinal = document.getElementById("monster-final");

function randomDamage(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateStats() {
    heroHP.textContent = `Liv: ${hero.hp}`;
    monsterHP.textContent = `Liv: ${monster.hp}`;
}

function logMessage(message) {
    const p = document.createElement("p");
    p.textContent = message;
    logElement.appendChild(p);
    logElement.scrollTop = logElement.scrollHeight;
}

function finalMessage(target, message) {
    heroFinal.innerHTML = "";
    monsterFinal.innerHTML = "";

    if (target === "hero" || target === "both") {
        heroFinal.innerHTML = `<strong>${message}</strong>`;
    }
    if (target === "monster" || target === "both") {
        monsterFinal.innerHTML = `<strong>${message}</strong>`;
    }
}

function resetTransforms() {
    const heroElement = document.querySelector(".stats.left");
    const monsterElement = document.querySelector(".stats.right");
    heroElement.style.transform = "";
    monsterElement.style.transform = "";
}

function checkGameOver() {
    if (hero.hp <= 0 || monster.hp <= 0) {
        attackBtn.style.display = "none";
        resetBtn.style.display = "block";

        const heroElement = document.querySelector(".stats.left");
        const monsterElement = document.querySelector(".stats.right");

        resetTransforms();
        heroElement.style.opacity = "1";
        monsterElement.style.opacity = "1";

        if (hero.hp <= 0 && monster.hp <= 0) {
            logMessage("⚖️ Det blev uafgjort!");
            finalMessage("both", "⚖️ Uafgjort");
            heroElement.style.opacity = "0.5";
            monsterElement.style.opacity = "0.5";
        } else if (hero.hp <= 0) {
            logMessage("❌ Monsteret vandt!");
            finalMessage("monster", "🏆 Monsteret vinder!");
            heroElement.style.opacity = "0.5";
            monsterElement.style.opacity = "1";
            monsterElement.style.transform = "scale(1.2) translateY(-20px)";
        } else {
            logMessage("🎉 Helten vandt!");
            finalMessage("hero", "🏆 Helten vinder!");
            monsterElement.style.opacity = "0.5";
            heroElement.style.opacity = "1";
            heroElement.style.transform = "scale(1.2) translateY(-20px)";
        }
    }
}

function showDamage(targetEl, amount) {
    const dmgEl = document.createElement("span");
    dmgEl.className = "damage-popup";
    dmgEl.textContent = `-${amount}`;
    targetEl.appendChild(dmgEl);
    setTimeout(() => dmgEl.remove(), 1000);
}

function resetGame() {
    hero.hp = 100;
    monster.hp = 100;
    updateStats();

    heroFinal.innerHTML = "";
    monsterFinal.innerHTML = "";
    logElement.innerHTML = "";

    attackBtn.style.display = "block";
    resetBtn.style.display = "none";

    const heroElement = document.querySelector(".stats.left");
    const monsterElement = document.querySelector(".stats.right");
    heroElement.style.opacity = "1";
    monsterElement.style.opacity = "1";
    resetTransforms();
}

attackBtn.addEventListener("click", () => {
    if (hero.hp > 0 && monster.hp > 0) {
        const heroDamage = randomDamage(5, 15);
        monster.hp -= heroDamage;

        logMessage(`⚔️ Helten angriber og gør ${heroDamage} skade!`);
        showDamage(document.querySelector(".stats.right"), heroDamage);

        updateStats();
        checkGameOver();
        if (monster.hp <= 0) return;

        setTimeout(() => {
            const monsterDamage = randomDamage(5, 15);
            hero.hp -= monsterDamage;

            logMessage(`👹 Monsteret slår tilbage og gør ${monsterDamage} skade!`);
            showDamage(document.querySelector(".stats.left"), monsterDamage);

            updateStats();
            checkGameOver();
        }, 800);
    }
});

resetBtn.addEventListener("click", resetGame);