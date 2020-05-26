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
                <h3>{competitor.name} - <span className="placement-number">{this.props.leaderBoardIndex + 1}</span></h3>
                <br/>
                <div>Total Punkte: <span style={{
                    fontWeight: 'bold',
                    padding: '5px',
                    minWidth: '2rem',
                    borderRadius: '15px',
                    backgroundColor: '#1e3d54'
                }}>{competition.getTotalScoreByCompetitorName(competitor.name)}</span></div>
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
