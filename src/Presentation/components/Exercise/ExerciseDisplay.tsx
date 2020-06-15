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
                                        margin: '6px auto',
                                        border: '1px dotted black',
                                        borderRadius: '10px',
                                        textAlign: 'center'
                                    }}
                                >

                                        <span
                                            style={{
                                                position: 'absolute',
                                                zIndex: 100,
                                                fontWeight: 'bold',
                                                marginTop: '1rem',
                                                marginLeft: '-1.5rem'
                                            }}
                                        >
                                            {stat.competitor.name + ': ' + stat.value}
                                        </span>
                                    <div
                                        style={{
                                            background: '#f53700',
                                            height: '3rem',
                                            margin: 0,
                                            width: this.getPercentageForExerciseStat(stat.value) + '%',
                                            opacity: '0.6',
                                            color: 'black',
                                            zIndex: 10,
                                            borderRadius: '5px',
                                        }}
                                    >
                                    </div>
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
