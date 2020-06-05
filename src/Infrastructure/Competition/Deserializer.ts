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
                    new ExerciseStats(pushupRow[0], Number(pushupRow[competitor.index] || 0)),
                    new ExerciseStats(situpRow[0], Number(situpRow[competitor.index] || 0)),
                    new ExerciseStats(bikingRow[0], Number(bikingRow[competitor.index] || 0)),
                    new ExerciseStats(runningRow[0], Number(runningRow[competitor.index] || 0)),
                    new ExerciseStats(kneebeugenRow[0], Number(kneebeugenRow[competitor.index] || 0)),
                    new ExerciseStats(pullupVariantRow[0], Number(pullupVariantRow[competitor.index] || 0)),
                ])
        })

        return new Competition(competitors);
    }

    private static getCompetitorData(competitionData: any): Array<{ name: string, index: number }> {
        const competitionNameRow = competitionData[0];

        return (competitionNameRow as string[]).reduce(
            (accumulator: Array<{ name: string, index: number }>, competitorName: string, currentIndex: number) => {
                if (competitorName && currentIndex !== 0 && currentIndex !== 1) {
                    accumulator.push({
                        name: competitorName,
                        index: currentIndex,
                    })
                }

                return accumulator;
            }, []);
    }
}
