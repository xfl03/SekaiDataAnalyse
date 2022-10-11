import { Card, UnitProfile } from "./util/masterDataStructs";
import { parseMasterData } from "./util/fileHelper";
import { getCharName } from "./util/printHelper";

//Init order
interface SkillDetail {
    id: number,
    shortName: string,
    priority: number
}
interface AttrStat {
    paid: SkillDetail,
    free: string
}
interface CharacterStat {
    characterId: number,
    supportUnit: string,
    attrStats: Map<string, AttrStat>
}
const characterStats: Array<CharacterStat> = [];
const supportUnits = ["light_sound", "idol", "street", "theme_park", "school_refusal", "none"];
for (let i = 0; i < 6; ++i) {
    //Original
    if (i != 5) {
        for (let j = 1; j <= 4; ++j) {
            characterStats.push({
                characterId: j + i * 4,
                supportUnit: "none",
                attrStats: new Map<string, AttrStat>()
            });
        }
    }
    //Piapro
    for (let j = 0; j < 6; ++j) {
        characterStats.push({
            characterId: 21 + j,
            supportUnit: supportUnits[i],
            attrStats: new Map<string, AttrStat>()
        });
    }
}

//Process cards
const skills: Array<SkillDetail> = [
    { id: 0, shortName: " ", priority: -114514 },
    { id: 4, shortName: "大分", priority: 3 },
    { id: 7, shortName: "判", priority: 0 },
    { id: 10, shortName: "奶", priority: -1 },
    { id: 11, shortName: "P分", priority: 4 },
    { id: 12, shortName: "血分", priority: 5 },
    { id: 13, shortName: "判分", priority: 2 },
    { id: 14, shortName: "生日", priority: -100 },
    { id: 15, shortName: "组分", priority: 6 },
    { id: 16, shortName: "组分", priority: 6 },
    { id: 17, shortName: "组分", priority: 6 },
    { id: 18, shortName: "组分", priority: 6 },
    { id: 19, shortName: "组分", priority: 6 },
];
const rarities: Record<string, number> = {
    "none": 0,
    "rarity_1": 1,
    "rarity_2": 2,
    "rarity_3": 3,
    "rarity_birthday": 4,
    "rarity_4": 5
}
let cards = parseMasterData<Card>("cards");
cards.forEach(it => {
    let characterStat = characterStats.find(s => s.characterId === it.characterId && s.supportUnit === it.supportUnit);
    if (!characterStat.attrStats.has(it.attr)) {
        characterStat.attrStats.set(it.attr, { paid: skills[0], free: "none" })
    }
    let attrStat = characterStat.attrStats.get(it.attr);
    let rarity = rarities[it.cardRarityType];
    if (rarity <= 3) {
        if (rarity >= rarities[attrStat.free]) {
            attrStat.free = it.cardRarityType;
        }
    } else {
        let skill = skills.find(s => s.id === it.skillId);
        if (skill === undefined) console.log(it.skillId);
        if (skill.priority > attrStat.paid.priority) {
            attrStat.paid = skill;
        }
    }
})

//Display result
const attrs = ["cool", "cute", "pure", "happy", "mysterious"];
characterStats.forEach(it => {
    let text = getCharName(it.characterId) + ",";
    attrs.forEach(attr => {
        let attrStat = it.attrStats.has(attr) ? it.attrStats.get(attr) : { paid: skills[0], free: "none" };
        text += attrStat.paid.shortName + ",";
        text += (attrStat.free === "none" ? " " : ("⭐" + rarities[attrStat.free])) + ",";
    })
    console.log(text);
})