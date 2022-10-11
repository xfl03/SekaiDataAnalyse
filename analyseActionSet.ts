import { parseMasterData } from "./util/fileHelper";
import { ActionSet, Character2d } from "./util/masterDataStructs";
import { getCharName } from "./util/printHelper";

let actionSets = parseMasterData<ActionSet>("actionSets");
let character2ds = parseMasterData<Character2d>("character2ds");

let counts = [] as Array<number>;
for (let i = 0; i <= 26; ++i) {
    counts.push(0);
}

actionSets.forEach(actionSet => {
    actionSet.characterIds.forEach(id => {
        let character2d = character2ds.find(it => it.id === id);
        if (character2d.characterType === "game_character") {
            counts[character2d.characterId]++;
        } else {
            console.log(`${character2d.characterType} ${character2d.characterId}`);
        }
    })
})

for (let i = 1; i <= 26; ++i) {
    console.log(`${getCharName(i)} ${counts[i]}`)
}