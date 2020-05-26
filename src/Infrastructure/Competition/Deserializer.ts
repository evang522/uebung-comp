import Competitor from "../../Domain/Competition/Model/Competitor";
import Competition from "../../Domain/Competition/Model/Competition";
import ExerciseStats from "../../Domain/Competition/Model/ExerciseStats";

export default class Deserializer {
    public static deserializeRawCompetitionData(competitionData: any): Competition {
        const competitorData = this.getCompetitorData(competitionData);
        const pushupRow = competitionData[1];
        const situpRow = competitionData[2];
        const bikingRow = competitionData[3];
        const runningRow = competitionData[4];
        const kneebeugenRow = competitionData[5];
        const pullupVariantRow = competitionData[6];

        const competitors = competitorData.map((competitor: { index: number, name: string }) => {
            return new Competitor(
                competitor.name,
                [
                    new ExerciseStats(pushupRow[0], Number(pushupRow[competitor.index])),
                    new ExerciseStats(situpRow[0], Number(situpRow[competitor.index])),
                    new ExerciseStats(bikingRow[0], Number(bikingRow[competitor.index])),
                    new ExerciseStats(runningRow[0], Number(runningRow[competitor.index])),
                    new ExerciseStats(kneebeugenRow[0], Number(kneebeugenRow[competitor.index])),
                    new ExerciseStats(pullupVariantRow[0], Number(pullupVariantRow[competitor.index])),
                ])
        })

        return new Competition(competitors);
    }

    public static getCompetitorData(competitionData: any): Array<{ name: string, index: number }> {
        const competitionNameRow = competitionData[0];
        return [
            {name: competitionNameRow[2], index: 2},
            {name: competitionNameRow[3], index: 3},
            {name: competitionNameRow[4], index: 4},
            {name: competitionNameRow[5], index: 5},
            {name: competitionNameRow[6], index: 6},
            {name: competitionNameRow[7], index: 7},
            {name: competitionNameRow[8], index: 8},
        ];
    }
}
