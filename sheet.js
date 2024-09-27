import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import creds from './credentials.json' with {type:'json'}

class Sheet {
  constructor() {
    this.serviceAccountAuth = new JWT({
      email: creds.client_email,
      key: creds.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    this.doc = new GoogleSpreadsheet('1OjYTSr_PrH-RGqR1nRMhUENKl03UPlDXDOPD0XTVnxw', this.serviceAccountAuth);
  }

  async load() {
    await this.doc.loadInfo();
  }

  async addRows(rows) {
      const sheet = this.doc.sheetsByIndex[0];
      await sheet.addRows(rows); // Добавляем строки в лист

  }
}

export { Sheet };