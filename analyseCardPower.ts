import { Card } from "./util/masterDataStructs";
import { parseMasterData } from "./util/fileHelper";

function canSpecialTraining(rarity: string): boolean {
    switch (rarity) {
        case "rarity_3":
        case "rarity_4":
            return true;
    }
    return false;
}

function getCardMaxLevel(rarity: string): number {
    switch (rarity) {
        case "rarity_1":
            return 20;
        case "rarity_2":
            return 30;
        case "rarity_3":
            return 50;
        case "rarity_birthday":
        case "rarity_4":
            return 60;
    }
    return 0;
}

function getCardMaxBasePower(card: Card): number {
    let maxLevel = getCardMaxLevel(card.cardRarityType);
    let powers = getCardBasePower(card, maxLevel);
    if (canSpecialTraining(card.cardRarityType)) {
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

let rarityTypes = new Set<string>();
let skillTypes = new Set<number>();
let cards = parseMasterData<Card>("cards");
cards.forEach(it => {
    rarityTypes.add(it.cardRarityType);
    skillTypes.add(it.skillId);
})
console.log(rarityTypes);

let rarityAnalyse: Map<string, CardPowerAnalyse> = new Map();
let rarityMinAnalyse: Map<string, CardPowerAnalyse> = new Map();
let rarityLevelUpAnalyse: Map<string, CardPowerAnalyse> = new Map();
let skillAnalyse: Map<number, CardPowerAnalyse> = new Map();

rarityTypes.forEach(it => {
    rarityAnalyse.set(it, { sum: 0, count: 0, min: 114514, max: 0 } as CardPowerAnalyse);
    rarityMinAnalyse.set(it, { sum: 0, count: 0, min: 114514, max: 0 } as CardPowerAnalyse);
    rarityLevelUpAnalyse.set(it, { sum: 0, count: 0, min: 114514, max: 0 } as CardPowerAnalyse);
})

skillTypes.forEach(it => {
    skillAnalyse.set(it, { sum: 0, count: 0, min: 114514, max: 0 } as CardPowerAnalyse);
})

cards.forEach(card => {
    let power = getCardMaxBasePower(card);
    let r = card.cardRarityType;
    //if (rarityAnalyse.get(r) === undefined) console.log(r)
    addData(rarityAnalyse.get(r), power);
    //if (skillAnalyse[card.skillId] === undefined) console.log("S" + card.skillId)
    let s = card.skillId >= 15 && card.skillId <= 19 ? 15 : card.skillId;
    addData(skillAnalyse.get(s), power);

    let maxLevel = getCardMaxLevel(card.cardRarityType);
    let minBasePower = getCardBasePower(card, 1);
    let maxBasePower = getCardBasePower(card, maxLevel);
    let averagePower = (maxBasePower - minBasePower) / (maxLevel - 1);
    addData(rarityMinAnalyse.get(r), minBasePower);
    addData(rarityLevelUpAnalyse.get(r), averagePower);
}
)

rarityAnalyse.forEach((ana, i) => {
    if (ana.count === 0) return;
    console.log(`${i} ${ana.min} ${(ana.sum / ana.count).toFixed(1)} ${ana.max}`)
})
console.log();
rarityMinAnalyse.forEach((ana, i) => {
    if (ana.count === 0) return;
    console.log(`${i} ${ana.min} ${(ana.sum / ana.count).toFixed(1)} ${ana.max}`)
})
console.log();
rarityLevelUpAnalyse.forEach((ana, i) => {
    if (ana.count === 0) return;
    console.log(`${i} ${ana.min.toFixed(1)} ${(ana.sum / ana.count).toFixed(1)} ${ana.max.toFixed(1)}`)
})
console.log();
[4,11,12,13,15,10,7,14,3,9,6,2,8,5,1].forEach(i => {
    let ana = skillAnalyse.get(i);
    if (ana.count === 0) return;

    console.log(`${ana.count} ${ana.min} ${(ana.sum / ana.count).toFixed(1)} ${ana.max} ${i}`)
}) 