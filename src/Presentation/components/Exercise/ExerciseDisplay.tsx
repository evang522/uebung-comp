import React, {Component, MouseEvent, ReactElement} from 'react';
import ExerciseStats from "../../../Domain/Competition/Model/ExerciseStats";

interface ExerciseDisplayProps {
    stats: ExerciseStats[]
}

class ExerciseDisplay extends Component<ExerciseDisplayProps, any> {
    public render(): null | ReactElement {
        return (
            <div
                onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                className="exercise-display-container">
                <h2>{this.props.stats[0].name}</h2>
                <br/>
                <br/>
                {
                    this.props.stats.sort((a: ExerciseStats, b: ExerciseStats) => (b.value - a.value))
                        .map((stat: ExerciseStats, index: number) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        width: '19rem',
                                        background: 'transparent',
                                        padding: '9px',
                                        textAlign: 'center',
                                        margin: '6px auto',
                                        border: '1px dotted black',
                                        borderRadius: '10px',
                                    }}
                                >

                                    {stat.competitor.name + ': ' + stat.value}
                                    <div
                                        style={{
                                            borderBottom: '2px solid #ff5722',
                                            height: '1px',
                                            width: this.getPercentageForExerciseStat(stat.value) + '%',
                                            opacity: '0.5'
                                        }}

                                    />
                                </div>
                            );
                        })}
            </div>
        )
    }

    private getPercentageForExerciseStat(exerciseValue: number): number {
        const highestValue = this.props.stats.sort((a: ExerciseStats, b: ExerciseStats) => (b.value - a.value))[0].value;

        const decimalExpression = (exerciseValue / highestValue) || 0;

        return decimalExpression * 100;

    }
}


export default ExerciseDisplay;
