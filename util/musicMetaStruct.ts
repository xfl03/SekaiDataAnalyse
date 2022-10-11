export interface MusicMeta {
    music_id: number,
    difficulty: string,
    level: number,
    combo: number,
    music_time: number,
    event_rate: number,
    base_score: number,
    base_score_auto: number,
    skill_score_solo: number[],
    skill_score_auto: number[],
    skill_score_multi: number[],
    skill_note_count: number[],
    fever_score: number,
}