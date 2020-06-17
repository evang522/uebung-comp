import React, {useEffect, useState} from 'react';
import '../App.css';
import CompetitionClient from "../Infrastructure/Competition/CompetitionClient";
import Competition from "../Domain/Competition/Model/Competition";
import Competitor from "../Domain/Competition/Model/Competitor";
import CompetitorDisplay from "./components/Competitor/CompetitorDisplay";
import {TimeInterval} from "time-interval-js";
import ExerciseDisplay from "./components/Exercise/ExerciseDisplay";

export function calculateTimeMessage(competition: Competition): string {
    const startTime = competition.startTime.getTime();
    const endTime = competition.endTime.getTime();

    const now = Date.now();

    if (now < startTime) {
        const interval = TimeInterval.forSpecifiedMilliseconds(startTime - now);

        return `Beginnt in ${interval.inHours() < 24 ? interval.inHours().toFixed(1).toLocaleString() + ' Stunde' : interval.inDays().toFixed(1).toLocaleString() + ' Tagen'}`;
    } else if (now > startTime && now < endTime) {
        const interval = TimeInterval.forSpecifiedMilliseconds(endTime - now);
        return `Endet in ${interval.inHours() < 24 ? interval.inHours().toFixed(1).toLocaleString() + ' Stunde' : interval.inDays().toFixed(1).toLocaleString() + ' Tagen'}`;
    } else if (now > endTime) {
        return `Wettbewerb schon beendet -- ${competition.getCompetitorsDescendingByPointsForAllExercises()[0].name} hat gewonnen!`;
    }

    return '';
}

function App() {
    const [competition, setCompetition] = useState<Competition | null>(null);
    const [displayedExercise, setDisplayedExercise] = useState<string | null>(null);
    window.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setDisplayedExercise(null);
        }
    })

    useEffect(() => {
        const competitionClient = new CompetitionClient('1Ro45BgDn99_cOQRF1hmacjYJEJzzU1Ip5F1Ap0C3sF0');
        competitionClient.getCompetition()
            .then((loadedCompetition: Competition) => {
                setCompetition(loadedCompetition);
                console.log(loadedCompetition)
            })
            .catch(() => {
                document.write('There was a problem! Please Reload or get in contact with the developer.')
            })
    }, [])

    return (
        <div className="App"
             onClick={() => {
                 if (displayedExercise) {
                     setDisplayedExercise(null);
                 }
             }}
        >
            <div
                onClick={() => {
                    if (displayedExercise) {
                        setDisplayedExercise(null);
                    }
                }}
                className="top-bar">
                <h2 className="header-name">Übung Wettbewerb Rangliste</h2>
            </div>
            {displayedExercise ?
                <ExerciseDisplay
                    stats={competition!.getAllExerciseStatsByExerciseName(displayedExercise)}
                    closePanel={() => setDisplayedExercise(null)}
                /> : null
            }
            <section>
                <div style={{marginTop: '6rem', fontWeight: 'bold', fontSize: '1.3rem'}}>
                    {competition ? '' : 'Lädt...'}
                </div>

                <div style={{color: 'green', fontWeight: 'bold'}}>
                    {competition ? calculateTimeMessage(competition) : null}
                </div>

                <div className="leaderboard-container">

                    {competition ? competition.getCompetitorsDescendingByPointsForAllExercises().map((participant: Competitor, index: number) => {
                        return <CompetitorDisplay
                            setDisplayedExercise={setDisplayedExercise}
                            key={index}
                            leaderBoardIndex={index}
                            competitor={participant}
                            competition={competition}
                        />
                    }) : null}
                </div>
            </section>
        </div>
    );
}

export default App;
