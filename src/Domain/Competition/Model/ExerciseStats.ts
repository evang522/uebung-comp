import Competitor from "./Competitor";

export default class ExerciseStats {
    public constructor(
        public name: string,
        public value: number,
        public competitor: Competitor
    ) {}
}
