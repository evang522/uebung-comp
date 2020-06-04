import Competitor from "./Competitor";
import ExerciseStats from "./ExerciseStats";

export default class Competition {
    public EXERCISE_POINT_WORTH = 10;

    public constructor(
        private competitors: Competitor[],
        public startTime: Date = new Date('2020.6.3'),
        public endTime: Date = new Date('2020.6.10'),
    ) {}


    public getCompetitors(): Competitor[] {
        return this.competitors;
    }

    public setStartTime(date: Date): void {
       this.startTime = date;
    }

    public setEndTime(date: Date): void {
        this.endTime = date;
    }

    public getCompetitorsDescendingByPointsForAllExercises() {
        return this.competitors.sort((a: Competitor, b: Competitor) => {
            return this.getTotalScoreByCompetitorName(b.name)! - this.getTotalScoreByCompetitorName(a.name)!
        })
    }

    public getTotalScoreByCompetitorName(competitorName: string): number | null {
        const competitor = this.getCompetitorByName(competitorName);

        if (!competitor)
        {
            return null;
        }

        const allExercises = this.getListOfExerciseNames();


        const scoreList = allExercises.map((exerciseName: string) => {
            const competitorExerciseStats = competitor.getExerciseStatsByName(exerciseName);
            const totalScoreForExercise = this.getHighestScoreForNamedExercise(exerciseName);

            if (competitorExerciseStats === null || totalScoreForExercise === null) {
                throw new Error('Exercise: ' + exerciseName + ' was not found. Could not calculate total score for competitor')
            }

            if (competitorExerciseStats.value === 0 || totalScoreForExercise === 0) {
                return 0;
            }

            // const totalScoreForThisExercise = competitorExerciseStats.value >= totalScoreForExercise ? this.EXERCISE_POINT_WORTH : 0;
            const competitorTotalScoreForExercise = (competitorExerciseStats.value / totalScoreForExercise) * this.EXERCISE_POINT_WORTH;


            return competitorTotalScoreForExercise;
        })

        return scoreList.reduce((previousValue, score) => (previousValue + score), 0)
    }

    public getCompetitorByName(competitorName: string): Competitor|null {
        return this.getCompetitors().find((competitor: Competitor) => {
            return competitor.name === competitorName;
        }) || null;
    }

    public getHighestScoreForNamedExercise(exerciseName: string): number| null
    {
        const exerciseStats = this.getAllExerciseStatsByExerciseName(exerciseName);

        if (!exerciseStats.length)
        {
            return null;
        }

        const highestValue = Math.max(...exerciseStats.map((stats: ExerciseStats) => stats.value));

        return highestValue;
    }


    public getAllExerciseStatsByExerciseName(exerciseName: string): ExerciseStats[] {
        const allExerciseStats = this.getAllExerciseStats();

        return allExerciseStats.filter((stats: ExerciseStats) => {
            return stats.name === exerciseName;
        })
    }

    public getListOfExerciseNames(): string[] {
        const allExerciseStats = this.getAllExerciseStats();

        return allExerciseStats.reduce((accumulator: string[], currentValue: ExerciseStats) => {
            if (accumulator.includes(currentValue.name)) {
                return accumulator
            }

            accumulator.push(currentValue.name)
            return accumulator
        }, [])
    }

    private getAllExerciseStats(): ExerciseStats[] {
        let allExerciseStats: ExerciseStats[] = [];
        const allCompetitors = this.getCompetitors();

        allCompetitors.forEach((competitor: Competitor) => {
            allExerciseStats = [...allExerciseStats, ...competitor.exerciseStats];
        })

        return allExerciseStats;
    }
}
