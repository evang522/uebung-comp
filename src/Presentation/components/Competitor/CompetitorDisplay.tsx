import Competitor from "../../../Domain/Competition/Model/Competitor";
import Competition from "../../../Domain/Competition/Model/Competition";
import React, {Component} from "react";

export interface CompetitorDisplayProps {
    competitor: Competitor;
    competition: Competition;
    leaderBoardIndex: number;
}

export default class CompetitorDisplay extends Component<CompetitorDisplayProps, any> {
    public render() {

        const {competitor, competition, leaderBoardIndex} = this.props;
        const totalPoints = competition.getTotalScoreByCompetitorName(competitor.name);

        return (
            <div
                style={{
                    border: leaderBoardIndex === 0 ? '4px solid #ff5722' : '',
                }}
                className="competitor-box"
            >
                <h3>{competitor.name}</h3>
                <br/>
                <div style={{
                    fontWeight: 'bold',
                    padding: '5px',
                    border: '1px solid #bababa',
                    margin: '0 auto',
                    width: '8rem',
                    borderRadius: '8px'
                }}>Total Punkte: {totalPoints}</div>
                <br/>
                <div className="exercise-list-container">
                    {
                        competition.getListOfExerciseNames().map((exerciseName: string, index: number) => {
                            const exerciseTotal = competition.getHighestScoreForNamedExercise(exerciseName)!;
                            const competitorScore = competitor.getExerciseStatsByName(exerciseName)?.value!;
                            return (
                                <div
                                    key={index}
                                    style={{
                                    width: '18rem',
                                    padding: '8px',
                                    textAlign: 'left',
                                    margin: '4px auto',
                                    background:'transparent',
                                    border: competitorScore !== 0 && competitorScore >= exerciseTotal ? '2px solid maroon': '1px dotted black',
                                    borderRadius: '10px',
                                }}>{exerciseName}: {competitorScore}</div>
                            )
                        })
                    }
                </div>

            </div>
        )
    }
}
