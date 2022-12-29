import { parseMasterData } from "./fileHelper";
import { BoostItem, GameCharacter, GameCharacterUnit, Material, ResourceBox, UnitProfile } from "./masterDataStructs";

const characterUnits = parseMasterData<GameCharacterUnit>("gameCharacterUnits");
const characters = parseMasterData<GameCharacter>("gameCharacters");
const units = parseMasterData<UnitProfile>("unitProfiles");

export function getCharName(characterId: number): string {
    const character = characters.find(it => it.id === characterId);
    return `${character.firstName === undefined ? '' : character.firstName}${character.givenName}`;
}

export function getCharUnit(characterUnitId: number): string {
    const charUnit = characterUnits.find(it => it.id === characterUnitId);
    return charUnit.unit;
}

export function getCharUnitCharId(characterUnitId: number): number {
    const charUnit = characterUnits.find(it => it.id === characterUnitId);
    return charUnit.gameCharacterId;
}

export function getCharUnitName(characterUnitId: number): string {
    const charUnit = characterUnits.find(it => it.id === characterUnitId);
    if (characterUnitId <= 26) return getCharName(charUnit.gameCharacterId);
    //Piapro
    return `${getCharName(charUnit.gameCharacterId)} (${getUnitName(charUnit.unit)})`;
}

export function getUnitName(unit: string): string {
    const u = units.find(it => it.unit === unit);
    return u.unitName;
}

const resourceBoxes = parseMasterData<ResourceBox>("resourceBoxes");
// const materials = parseMasterData<Material>("materials");
// const boostItems = parseMasterData<BoostItem>("boostItems");
const resourcesChinese: Record<string, string> = {
    "coin": "金币",
    "jewel": "水晶",
    "virtual_coin": "虚拟币",
    "material 11": "魔法布",
    "material 12": "魔法线",
    "material 13": "音乐卡",
    "material 14": "奇迹石",
    "material 15": "思念碎片",
    "material 16": "思念结晶",
    "material 17": "不可思议种子",
    "material 57": "愿望泪滴",
    "skill_practice_ticket 2": "中技能券",
    "practice_ticket 2": "中练习券",
    "boost_item 2": "大体力饮料",
}

export function getResourceBox(purpose: string, id: number): Map<string, number> {
    const rb = resourceBoxes.find(it => it.resourceBoxPurpose === purpose && it.id === id);
    let out = new Map<string, number>();
    rb.details.forEach(detail => {
        if (detail.resourceType === "costume_3d") {
            out.set("服装", 1);
            return;
        }
        let name = detail.resourceType + (detail.resourceId === undefined ? "" : ` ${detail.resourceId}`);
        out.set(name, detail.resourceQuantity);
    })
    return out;
}
export function getResourceBoxString(items: Map<string, number>): string {
    let out = "";
    items.forEach((v, k) => {
        out += `${resourcesChinese[k] ? resourcesChinese[k] : k}×${v} `;
    })
    return out;
}