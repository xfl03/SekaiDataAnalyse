import {parseMasterData} from "./fileHelper";
import {GameCharacter, GameCharacterUnit, UnitProfile} from "./masterDataStructs";

const characterUnits = parseMasterData<GameCharacterUnit>("gameCharacterUnits");
const characters = parseMasterData<GameCharacter>("gameCharacters");
const units = parseMasterData<UnitProfile>("unitProfiles");

export function getCharName(characterId: number): string {
    const character = characters.find(it => it.id === characterId);
    return `${character.firstName === undefined ? '' : character.firstName}${character.givenName}`;
}

export function getCharUnit(characterUnitId: number): string {
    const charUnit = characterUnits.find(it=>it.id===characterUnitId);
    return charUnit.unit;
}

export function getCharUnitCharId(characterUnitId: number): number {
    const charUnit = characterUnits.find(it=>it.id===characterUnitId);
    return charUnit.gameCharacterId;
}

export function getCharUnitName(characterUnitId: number): string {
    const charUnit = characterUnits.find(it=>it.id===characterUnitId);
    if(characterUnitId<=26) return getCharName(charUnit.gameCharacterId);
    //Piapro
    return `${getCharName(charUnit.gameCharacterId)} (${getUnitName(charUnit.unit)})`;
}

export function getUnitName(unit: string): string {
    const u = units.find(it => it.unit === unit);
    return u.unitName;
}