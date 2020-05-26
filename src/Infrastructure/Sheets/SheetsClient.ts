export default class SheetsClient {
    public constructor(
        private baseUri: string,
        private authKey: string,
    ) {
    }

    private async fetchJSON(url: string, method: string) {
        const response = await fetch(url, {
            method,
        });

        return await response.json();
    }

    public async getSpreadSheetMetadata(spreadsheetId: string) {
        return await this.fetchJSON(
            `${this.baseUri}/v4/spreadsheets/${spreadsheetId}?key=${this.authKey}`,
            'GET'
        );
    }

    public async getSpreadsheetCellData(spreadSheetId: string, range: string) {
        return await this.fetchJSON(
            `${this.baseUri}/v4/spreadsheets/${spreadSheetId}/values:batchGet/?ranges=${range}&key=${this.authKey}`,
            'GET'
        );
    }
}