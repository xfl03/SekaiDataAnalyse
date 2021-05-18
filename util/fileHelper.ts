import {Card, Event, EventDeckBonus, GameCharacter, GameCharacterUnit, UnitProfile} from "./masterDataStructs";
import {appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync} from "fs";

export function parseMasterData<T extends Card|
    Event |
    EventDeckBonus |
    GameCharacter |
    GameCharacterUnit |
    UnitProfile>(name: string): T[] {
    return JSON.parse(readFileSync(`sekai-master-db-diff/${name}.json`, 'utf8')) as T[];
}

export function parseMusicMeta() {
    return JSON.parse(readFileSync(`metas.json`, 'utf8'));
}

export function saveJson(name: string, data: Object) {
    if (!existsSync(`out`)) mkdirSync(`out`)

    writeFileSync(`out/${name}.json`, JSON.stringify(data, null, 2), 'utf8')
}

export function saveCsv(name: string, data: string[][]) {
    if (!existsSync(`out`)) mkdirSync(`out`)

    let out = '';
    data.forEach(it => {
        it.forEach(it => out += `${it},`);
        out += '\r\n';
    })
    writeFileSync(`out/${name}.csv`, '\ufeff');
    appendFileSync(`out/${name}.csv`, out);
}