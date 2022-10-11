import {parseMusicMeta} from "./fileHelper";

let musicMetas = parseMusicMeta();

export function calculateBaseScore(power: number) {
    return power * 4;
}

export function calculateMultiSkillRate(skills: number[]) {
    let rate = 1.0;
    skills.forEach((v, i) => {
        rate += v * (i == 0 ? 1.0 : 0.2);
    })
    return rate;
}

export function calculateMultiEventPoint(score: number, musicBonus: number, deckBonus: number, liveBonus: number) {
    let musicBonus0 = musicBonus / 100;
    let deckBonus0 = 1 + deckBonus / 100;
    let basePoint = 114 + Math.floor(score / 17500) + Math.min(11, Math.floor(score / 100000));
    return Math.floor(basePoint * musicBonus0 * deckBonus0) * liveBonus;
}