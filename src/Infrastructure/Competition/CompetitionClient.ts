import SheetsClient from "../Sheets/SheetsClient";

export default class CompetitionClient {
    public constructor(
        private resultsSpreadsheetId: string,
        private sheetsClient: SheetsClient = new SheetsClient('https://sheets.googleapis.com', 'AIzaSyDXtCM-58GhCzOLtXVMNr-LzflgOqe8IPo')
    ) {
    }

    public async getRawCompetitionSpreadsheet() {
        return await this.sheetsClient.getSpreadsheetCellData('1Ro45BgDn99_cOQRF1hmacjYJEJzzU1Ip5F1Ap0C3sF0', 'LiveSportData!A3:I10')
    }

}


export type ParticipantResult = { name: string, score: number }
