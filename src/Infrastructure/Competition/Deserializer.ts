import Competitor from "../../Domain/Competition/Model/Competitor";
import Competition from "../../Domain/Competition/Model/Competition";
import ExerciseStats from "../../Domain/Competition/Model/ExerciseStats";

export default class Deserializer {
    public static deserializeRawCompetitionData(competitionData: any): Competition {
        const competitorData = this.getCompetitorData(competitionData);
        const exerciseRows = (competitionData as any[])
            .reduce((accumulator: Array<string[]>, newValue: string[], index: number) => {
                if (index !== 0 && (newValue.length)) {
                    accumulator.push(newValue)
                }

                return accumulator;
            }, [])

        const competitors = competitorData.map((competitor: { index: number, name: string }) => {
            const competitorModel = new Competitor(
                competitor.name,
                []
            );

            const exerciseStats = exerciseRows.map((row: string[]) => {
                return new ExerciseStats(row[0], Number(row[competitor.index] || 0), competitorModel)
            })
            competitorModel.setExerciseStats(exerciseStats);
            return competitorModel;
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
