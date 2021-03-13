import {parseMasterData, saveCsv} from "./util/fileHelper";
import {Event, EventDeckBonus, GameCharacter, GameCharacterUnit, UnitProfile} from "./util/masterDataStructs";

const events = parseMasterData<Event>("events");
const eventBonuses = parseMasterData<EventDeckBonus>("eventDeckBonuses");
const characterUnits = parseMasterData<GameCharacterUnit>("gameCharacterUnits");
const characters = parseMasterData<GameCharacter>("gameCharacters");
const units = parseMasterData<UnitProfile>("unitProfiles");

const characterCounter = Array(26).fill(0).map((it, i) => {
    return {
        gameCharacterId: i + 1,
        count: 0
    }
})
const unitCounter = Array(6).fill(0).map((it, i) => {
    return {
        unit: units[i].unit,
        count: 0
    }
})
const originPiaproCounter = [0, 0];
const boxMixCounter = [0, 0];

eventBonuses
    .filter(it => it.cardAttr === undefined)
    .forEach(bonus => {
        const characterUnit = characterUnits.find(it => it.id === bonus.gameCharacterUnitId);
        characterCounter[characterUnit.gameCharacterId - 1].count++;

        unitCounter
            .find(it => it.unit === characterUnit.unit)
            .count++;

        originPiaproCounter[Math.floor(characterUnit.gameCharacterId / 21)]++;
    })

events.forEach(e => {
    let units0 = eventBonuses
        .filter(it => it.cardAttr === undefined && it.eventId === e.id)
        .map(bonus => characterUnits.find(it => it.id === bonus.gameCharacterUnitId).unit)
    let unitSet = new Set(units0)
    boxMixCounter[Math.min(2, unitSet.size) - 1]++;


    if (unitSet.size === 1) {
        const unit = units.find(it => it.unit === units0[0]);
        console.log(`${e.id} ${unit.unitName}`);
        if (boxMixCounter[0] % 5 === 0) console.log();
    }
})

events.forEach(e => {
    let bonus = eventBonuses
        .find(it => it.gameCharacterUnitId === undefined && it.eventId === e.id)
    console.log(bonus.cardAttr)
})

const outCsv = [];

characterCounter
    .sort((a, b) => a.count === b.count ? a.gameCharacterId - b.gameCharacterId : b.count - a.count)
    .forEach(counter => {
        const character = characters.find(it => it.id === counter.gameCharacterId);
        const outArr = [`${character.firstName === undefined ? '' : character.firstName}${character.givenName}`, `${counter.count}`];
        outCsv.push(outArr);
        console.log(`${outArr[0]} ${outArr[1]}`);
    })

console.log();

unitCounter
    .sort((a, b) => b.count - a.count)
    .forEach(counter => {
        const unit = units.find(it => it.unit === counter.unit);
        const outArr = [`${unit.unitName}`, `${counter.count}`];
        outCsv.push(outArr);
        console.log(`${outArr[0]} ${outArr[1]}`);
    })

console.log(`\nOrigin ${originPiaproCounter[0]}\nPiapro ${originPiaproCounter[1]}`);
console.log(`\nBox ${boxMixCounter[0]}\nMix ${boxMixCounter[1]}`);

saveCsv("EventBonus", outCsv)