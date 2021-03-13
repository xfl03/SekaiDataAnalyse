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