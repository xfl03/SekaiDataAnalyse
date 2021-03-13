import {EventRankingRewardRange} from "./masterDataSubStructs";

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