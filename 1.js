import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import creds from './credentials.json' with {type:'json'}

// Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
const serviceAccountAuth = new JWT({
  email: creds.client_email,
  key: creds.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});


const doc = new GoogleSpreadsheet('1OjYTSr_PrH-RGqR1nRMhUENKl03UPlDXDOPD0XTVnxw', serviceAccountAuth);

await doc.loadInfo(); // loads document properties and worksheets
console.log(doc.title);
await doc.updateProperties({ title: 'renamed doc' });

const sheet = doc.sheetsByIndex[0];
await sheet.addRows([
    {name: 'Vladimira', email: 'phobosbest@list.ru'},
    {name: 'Abua', email:'wellwool@mail.ru'}
]);
console.log(sheet.title);
console.log(sheet.rowCount);

// adding / removing sheets
const newSheet = await doc.addSheet({ title: 'another sheet' });
await newSheet.delete();