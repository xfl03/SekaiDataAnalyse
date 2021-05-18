import {Card, Event} from "./util/masterDataStructs";
import {parseMasterData} from "./util/fileHelper";

function getCardMaxLevel(rarity: number): number {
    switch (rarity) {
        case 1:
            return 20;
        case 2:
            return 30;
        case 3:
            return 50;
        case 4:
            return 60;
    }
    return 0;
}

function getCardMaxBasePower(card: Card): number {
    let maxLevel = getCardMaxLevel(card.rarity);
    let powers = getCardBasePower(card, maxLevel);
    if (card.rarity >= 3) {
        powers += card.specialTrainingPower1BonusFixed;
        powers += card.specialTrainingPower2BonusFixed;
        powers += card.specialTrainingPower3BonusFixed;
    }
    return powers;
}

function getCardBasePower(card: Card, level: number): number {
    let powers = 0
    card.cardParameters.filter(it => it.cardLevel === level).forEach(it => {
        powers += it.power;
    })
    return powers;
}

interface CardPowerAnalyse {
    sum: number,
    count: number,
    min: number,
    max: number
}

function addData(ana: CardPowerAnalyse, power: number) {
    ana.count++;
    ana.sum += power;
    if (ana.max < power) ana.max = power;
    if (ana.min > power) ana.min = power;
}

let cards = parseMasterData<Card>("cards");

let rarityAnalyse: CardPowerAnalyse[] = [];
for (let i = 0; i <= 4; ++i) {
    rarityAnalyse.push({sum: 0, count: 0, min: 114514, max: 0} as CardPowerAnalyse);
}
let rarityMinAnalyse: CardPowerAnalyse[] = [];
for (let i = 0; i <= 4; ++i) {
    rarityMinAnalyse.push({sum: 0, count: 0, min: 114514, max: 0} as CardPowerAnalyse);
}
let rarityLevelUpAnalyse: CardPowerAnalyse[] = [];
for (let i = 0; i <= 4; ++i) {
    rarityLevelUpAnalyse.push({sum: 0, count: 0, min: 114514, max: 0} as CardPowerAnalyse);
}
let skillAnalyse: CardPowerAnalyse[] = [];
for (let i = 0; i <= 13; ++i) {
    skillAnalyse.push({sum: 0, count: 0, min: 114514, max: 0} as CardPowerAnalyse);
}

cards.forEach(card => {
        let power = getCardMaxBasePower(card);
        if (rarityAnalyse[card.rarity] === undefined) console.log("R" + card.rarity)
        addData(rarityAnalyse[card.rarity], power);
        if (skillAnalyse[card.skillId] === undefined) console.log("S" + card.skillId)
        addData(skillAnalyse[card.skillId], power);

        let maxLevel = getCardMaxLevel(card.rarity);
        let minBasePower = getCardBasePower(card, 1);
        let maxBasePower = getCardBasePower(card, maxLevel);
        let averagePower = (maxBasePower - minBasePower) / (maxLevel - 1);
        addData(rarityMinAnalyse[card.rarity], minBasePower);
        addData(rarityLevelUpAnalyse[card.rarity], averagePower);
    }
)

for (let i = 1; i <= 4; ++i) {
    let ana = rarityAnalyse[i];
    if (ana.count === 0) continue;

    console.log(`R${i} ${(ana.sum / ana.count).toFixed(1)} ${ana.min} ${ana.max}`)
}
console.log();
for (let i = 1; i <= 4; ++i) {
    let ana = rarityMinAnalyse[i];
    if (ana.count === 0) continue;

    console.log(`R${i} ${(ana.sum / ana.count).toFixed(1)} ${ana.min} ${ana.max}`)
}
console.log();
for (let i = 1; i <= 4; ++i) {
    let ana = rarityLevelUpAnalyse[i];
    if (ana.count === 0) continue;

    console.log(`R${i} ${(ana.sum / ana.count).toFixed(1)} ${ana.min} ${ana.max}`)
}
console.log();
for (let i = 1; i <= 13; ++i) {
    let ana = skillAnalyse[i];
    if (ana.count === 0) continue;

    console.log(`S${i} ${ana.count} ${(ana.sum / ana.count).toFixed(1)} ${ana.min} ${ana.max}`)
}