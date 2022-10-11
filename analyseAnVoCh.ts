//Analyse Another Vocal Character

import { parseMasterData } from "./util/fileHelper";
import { MusicVocal } from "./util/masterDataStructs";
import { getCharName } from "./util/printHelper";

let musicVocals = parseMasterData<MusicVocal>("musicVocals");

let counts = [] as Array<number>;
for (let i = 0; i <= 26; ++i) {
    counts.push(0);
}

musicVocals.filter(it=>it.musicVocalType==="another_vocal").forEach(vocal=>{
    vocal.characters.filter(it=>it.characterType==="game_character").forEach(char=>{
        counts[char.characterId]++;
    })
})

for (let i = 1; i <= 26; ++i) {
    console.log(`${getCharName(i)} ${counts[i]}`)
}
