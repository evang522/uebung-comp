import ExerciseStats from "./ExerciseStats";

export default class Competitor {
    public constructor(
        public name: string,
        public exerciseStats: ExerciseStats[]
    ) {}

    public getExerciseStatsByName(exerciseName: string): ExerciseStats | null
    {
        return this.exerciseStats.find((stats: ExerciseStats) => {
            return stats.name === exerciseName;
        }) || null;
    }

}
