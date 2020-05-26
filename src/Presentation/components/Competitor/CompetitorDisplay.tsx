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

        const {competitor, competition} = this.props;
        return (
            <div className="competitor-box">
                <h3>{competitor.name}</h3>
                <br/>
                <div style={{
                    fontWeight: 'bold',
                    padding: '5px',
                    border: '1px solid #bababa',
                    margin: '0 auto',
                    width: '8rem',
                    borderRadius: '8px'
                }}>Total Punkte: {competition.getTotalScoreByCompetitorName(competitor.name)}</div>
                <br/>
                <div className="exercise-list-container">
                    {
                        competition.getListOfExerciseNames().map((exerciseName: string) => {
                            return (
                                <div style={{
                                    width: '18rem',
                                    padding: '8px',
                                    textAlign: 'left',
                                    margin: '4px auto',
                                    background:'transparent',
                                    border: '1px dotted black',
                                    borderRadius: '10px',
                                }}>{exerciseName}: {competitor.getExerciseStatsByName(exerciseName)?.value}</div>
                            )
                        })
                    }
                </div>

            </div>
        )
    }
}
