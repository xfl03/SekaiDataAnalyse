//Analyse Stamp Character
import { parseMasterData } from "./util/fileHelper";
import { Stamp } from "./util/masterDataStructs";
import { getCharName } from "./util/printHelper";

let stamps = parseMasterData<Stamp>("stamps");

let counts = [] as Array<number>;
for (let i = 0; i <= 26; ++i) {
    counts.push(0);
}

stamps.forEach(it=>{
    counts[it.characterId1]++;
})

for (let i = 1; i <= 26; ++i) {
    console.log(`${getCharName(i)} ${counts[i]}`)
}
