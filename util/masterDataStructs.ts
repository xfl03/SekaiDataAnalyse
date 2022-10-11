import {
    CardParameter,
    EventRankingRewardRange,
    MasterLessonAchieveResource,
    MusicVocalCharacter,
    SpecialTrainingCost
} from "./masterDataSubStructs";

/**
 * 区域对话
 * actionSets.json
 */
export interface ActionSet {
    id: number;
    areaId: number;
    scriptId: string;
    characterIds: Array<number>;
}

/**
 * 卡牌
 * cards.json
 */
export interface Card {
    id: number;
    seq: number;
    characterId: number;
    cardRarityType: string;
    specialTrainingPower1BonusFixed: number;
    specialTrainingPower2BonusFixed: number;
    specialTrainingPower3BonusFixed: number;
    attr: string;
    supportUnit: string;
    skillId: number;
    cardSkillName: string;
    prefix: string;
    assetbundleName: string;
    gachaPhrase: string;
    flavorText: string;
    releaseAt: number;
    cardParameters: CardParameter[];
    specialTrainingCosts: SpecialTrainingCost[];
    masterLessonAchieveResources: MasterLessonAchieveResource[];
}

/**
 * 卡牌稀有度
 * cardRarities.json
 */
export interface CardRarity {
    cardRarityType: string;
    seq: number;
    maxLevel: number;
    maxSkillLevel: number;
}

/**
 * 角色Live 2D
 * character2ds.json
 */
export interface Character2d {
    id: number;
    characterType: string;
    characterId: number;
    unit: string;
    assetName: string;
}

/**
 * 活动
 * events.json
 */
export interface Event {
    id: number;
    eventType: string;
    name: string;
    assetbundleName: string;
    bgmAssetbundleName: string;
    startAt: any;
    aggregateAt: any;
    rankingAnnounceAt: any;
    distributionStartAt: any;
    closedAt: any;
    distributionEndAt: any;
    virtualLiveId: number;
    eventRankingRewardRanges: EventRankingRewardRange[];
}

/**
 * 活动加成
 * eventDeckBonuses.json
 */
export interface EventDeckBonus {
    id: number;
    eventId: number;
    gameCharacterUnitId: number;
    cardAttr: string;
    bonusRate: number;
}

/**
 * 角色资料
 * gameCharacters.json
 */
export interface GameCharacter {
    id: number;
    seq: number;
    resourceId: number;
    /**
     * 姓
     */
    firstName: string;
    /**
     * 名
     */
    givenName: string;
    firstNameRuby: string;
    givenNameRuby: string;
    gender: string;
    height: number;
    live2dHeightAdjustment: number;
    figure: string;
    breastSize: string;
    modelName: string;
    unit: string;
    supportUnitType: string;
}

/**
 * 角色组合
 * gameCharacterUnits.json
 */
export interface GameCharacterUnit {
    id: number;
    gameCharacterId: number;
    unit: string;
    colorCode: string;
    skinColorCode: string;
    skinShadowColorCode1: string;
    skinShadowColorCode2: string;
}

export interface MusicVocal {
    id: number;
    musicId: number;
    musicVocalType: string;
    seq: number;
    releaseConditionId: number;
    caption: string;
    characters: Array<MusicVocalCharacter>;
    assetbundleName: string;
}

export interface Stamp {
    id: number;
    stampType: string;
    seq: number;
    name: string;
    assetbundleName: string;
    balloonAssetbundleName: string;
    characterId1: number;
    gameCharacterUnitId: number;
}

/**
 * 队伍资料
 * unitProfiles.json
 */
export interface UnitProfile {
    unit: string;
    unitName: string;
    seq: number;
    profileSentence: string;
    colorCode: string;
}
