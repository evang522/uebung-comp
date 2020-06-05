import SheetsClient from "../Sheets/SheetsClient";
import Deserializer from "./Deserializer";
import Competition from "../../Domain/Competition/Model/Competition";

export default class CompetitionClient {
    public COMPETITION_DATA_TABLE = 'LiveSportData'

    public constructor(
        private resultsSpreadsheetId: string,
        private sheetsClient: SheetsClient = new SheetsClient('https://sheets.googleapis.com', 'AIzaSyDXtCM-58GhCzOLtXVMNr-LzflgOqe8IPo')
    ) {
    }

    public async getRawCompetitionSpreadsheet() {
        return await this.sheetsClient.getBatchSpreadsheetCellData(this.resultsSpreadsheetId, `${this.COMPETITION_DATA_TABLE}!A3:Q10`)
    }

    public async getCompetition(): Promise<Competition> {
        const rawCompetitionResults = await this.getRawCompetitionSpreadsheet()
        const startDate = await this.getStartDate();
        const endDate = await this.getEndDate();


        const competition = Deserializer.deserializeRawCompetitionData(
            rawCompetitionResults.valueRanges[0].values
        );

        competition.setStartTime(startDate);
        competition.setEndTime(endDate);

        return competition;
    }

    public async getStartDate(): Promise<Date> {
        const rawData = await this.sheetsClient.getSingleSpreadsheetCellData(this.resultsSpreadsheetId, `${this.COMPETITION_DATA_TABLE}!C13`)
        return new Date(rawData.values[0]);
    }

    public async getEndDate(): Promise<Date> {
        const rawData = await this.sheetsClient.getSingleSpreadsheetCellData(this.resultsSpreadsheetId, `${this.COMPETITION_DATA_TABLE}!C14`)
        return new Date(rawData.values[0]);
    }
}


export type ParticipantResult = { name: string, score: number }
