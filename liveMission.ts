import { parseMasterData, saveCsv } from "./util/fileHelper";
import { LiveMission } from "./util/masterDataStructs";
import { getResourceBox, getResourceBoxString } from "./util/printHelper";

let liveMissions = parseMasterData<LiveMission>("liveMissions");
const latestPeriodId = liveMissions[liveMissions.length - 1].liveMissionPeriodId;
liveMissions = liveMissions.filter(it => it.liveMissionPeriodId === latestPeriodId);

let rewardMap = new Map<number, Record<string, string>>();
let totalRewardMap: Record<string, Map<string, number>> = {
    free: new Map<string, number>(),
    premium: new Map<string, number>(),
};
liveMissions.forEach(lm => {
    let out = "";
    lm.rewards.forEach(it => {
        let rb = getResourceBox("mission_reward", it.resourceBoxId);
        rb.forEach((v, k) => {
            if (!totalRewardMap[lm.liveMissionType].has(k)) {
                totalRewardMap[lm.liveMissionType].set(k, 0);
            }
            totalRewardMap[lm.liveMissionType].set(k, totalRewardMap[lm.liveMissionType].get(k) + v);
        })
        out += getResourceBoxString(rb);
    });
    if (!rewardMap.has(lm.requirement)) {
        rewardMap.set(lm.requirement, {});
    }
    rewardMap.get(lm.requirement)[lm.liveMissionType] = out;
})

let tmp: string[][] = [];
tmp.push(["requirement", "free", "premium"]);
rewardMap.forEach((v, k) => {
    tmp.push([k.toString(), v["free"], v["premium"]]);
})
saveCsv("liveMission", tmp);

console.log(getResourceBoxString(totalRewardMap["free"]))
console.log(getResourceBoxString(totalRewardMap["premium"]))