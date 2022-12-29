import { ActionSet, BoostItem, Card, CardRarity, Character2d, Event, EventDeckBonus, GameCharacter, GameCharacterUnit, LiveMission, Material, MusicVocal, ResourceBox, Stamp, UnitProfile } from "./masterDataStructs";
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { MusicMeta } from "./musicMetaStruct";

export function parseMasterData<T extends ActionSet | BoostItem | Card | CardRarity | Character2d |
    Event |
    EventDeckBonus |
    GameCharacter |
    GameCharacterUnit | LiveMission | Material | MusicVocal | ResourceBox | Stamp |
    UnitProfile>(name: string): T[] {
    return JSON.parse(readFileSync(`../sekai-master-db-diff/${name}.json`, 'utf8')) as T[];
}

export function parseMusicMeta(): MusicMeta[] {
    return JSON.parse(readFileSync(`../SekaiMusicMeta/music_metas.json`, 'utf8')) as MusicMeta[];
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