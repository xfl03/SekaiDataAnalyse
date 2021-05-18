import {parseMasterData, saveCsv} from "./util/fileHelper";
import {Event, EventDeckBonus, GameCharacter, GameCharacterUnit, UnitProfile} from "./util/masterDataStructs";
import {getCharName, getCharUnit, getUnitName} from "./util/printHelper";

const events = parseMasterData<Event>("events");
const eventBonuses = parseMasterData<EventDeckBonus>("eventDeckBonuses");
const characterUnits = parseMasterData<GameCharacterUnit>("gameCharacterUnits");
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

console.log(`Last event:${events[events.length - 1].id}`)

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
        .map(bonus => getCharUnit(bonus.gameCharacterUnitId))
    let unitSet = new Set(units0)
    boxMixCounter[Math.min(2, unitSet.size) - 1]++;

    //Box Event
    if (unitSet.size === 1) {
        console.log(`${e.id} ${getUnitName(units0[0])}`);
        if (boxMixCounter[0] % 5 === 0) console.log();
    }
})

events.forEach(e => {
    let bonus = eventBonuses
        .find(it => it.gameCharacterUnitId === undefined && it.eventId === e.id)
    console.log(`${e.id} ${bonus.cardAttr}`)
    if (e.id % 5 === 0) console.log();
})

const outCsv = [];

characterCounter
    .sort((a, b) => a.count === b.count ? a.gameCharacterId - b.gameCharacterId : b.count - a.count)
    .forEach(counter => {
        const outArr = [getCharName(counter.gameCharacterId), `${counter.count}`];
        outCsv.push(outArr);
        console.log(`${outArr[0]} ${outArr[1]}`);
    })

console.log();

unitCounter
    .sort((a, b) => b.count - a.count)
    .forEach(counter => {
        const outArr = [getUnitName(counter.unit), `${counter.count}`];
        outCsv.push(outArr);
        console.log(`${outArr[0]} ${outArr[1]}`);
    })

console.log(`\nOrigin ${originPiaproCounter[0]}\nPiapro ${originPiaproCounter[1]}`);
console.log(`\nBox ${boxMixCounter[0]}\nMix ${boxMixCounter[1]}`);

saveCsv("EventBonus", outCsv)