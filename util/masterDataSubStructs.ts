export interface EventRankingReward {
    id: number;
    eventRankingRewardRangeId: number;
    resourceBoxId: number;
}

export interface EventRankingRewardRange {
    id: number;
    eventId: number;
    fromRank: number;
    toRank: number;
    eventRankingRewards: EventRankingReward[];
}

export interface CardParameter {
    id: number;
    cardId: number;
    cardLevel: number;
    cardParameterType: string;
    power: number;
}

export interface Cost {
    resourceId: number;
    resourceType: string;
    resourceLevel: number;
    quantity: number;
}

export interface SpecialTrainingCost {
    cardId: number;
    seq: number;
    cost: Cost;
}

export interface MasterLessonAchieveResource {
    releaseConditionId: number;
    cardId: number;
    masterRank: number;
    resources: any[];
}
