import React, {useEffect, useState} from 'react';
import '../App.css';
import CompetitionClient from "../Infrastructure/Competition/CompetitionClient";
import Deserializer from "../Infrastructure/Competition/Deserializer";
import Competition from "../Domain/Competition/Model/Competition";
import Competitor from "../Domain/Competition/Model/Competitor";
import CompetitorDisplay from "./components/Competitor/CompetitorDisplay";

function App() {
    const [competition, setCompetition] = useState<Competition | null>(null);

    useEffect(() => {
        const competitionClient = new CompetitionClient('1Ro45BgDn99_cOQRF1hmacjYJEJzzU1Ip5F1Ap0C3sF0');
        competitionClient.getRawCompetitionSpreadsheet()
            .then((results) => {
                const loadedCompetition = Deserializer.deserializeRawCompetitionData(results.valueRanges[0].values);
                setCompetition(loadedCompetition);
                console.log(loadedCompetition)
            })
    }, [])


    return (
        <div className="App">
            <div className="top-bar">
                <h2 className="header-name">Übung Wettbewerb Rangliste</h2>
            </div>
            <section>

                {competition ? '' : 'LOADING'}

                <div className="leaderboard-container">
                    {competition ? competition.getCompetitorsDescendingByPointsForAllExercises().map((participant: Competitor, index: number) => {
                        return <CompetitorDisplay key={index} leaderBoardIndex={index} competitor={participant} competition={competition}/>
                    }) : null}
                </div>
            </section>
        </div>
    );
}

export default App;
