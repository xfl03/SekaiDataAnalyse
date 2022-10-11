//Analyse Card Character
import { parseMasterData, saveCsv } from "./util/fileHelper";
import { Card, CardRarity } from "./util/masterDataStructs";
import { getCharName } from "./util/printHelper";

let cards = parseMasterData<Card>("cards");
let cardRarities = parseMasterData<CardRarity>("cardRarities").sort((a, b) => b.seq - a.seq);

let counts = [] as Map<string,number>[];
for (let i = 1; i <= 26; ++i) {
    counts[i] = new Map()
    cardRarities.forEach(it => {
        counts[i].set(it.cardRarityType, 0);
    });
}

cards.forEach(card => {
    counts[card.characterId].set(card.cardRarityType,counts[card.characterId].get(card.cardRarityType));
});

console.log(counts);

let csvOut = [] as string[][];
for (let i = 1; i <= 26; ++i) {
    let out = [getCharName(i)] as string[];
    cardRarities.forEach(it => {
        out.push(counts[i].get(it.cardRarityType).toString());
    });
    csvOut.push(out);
}
saveCsv("CardChar", csvOut);