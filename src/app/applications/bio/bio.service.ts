import {Injectable} from "@angular/core";
import {FormArray} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BioApplication} from "./bio.model";

@Injectable({
  providedIn: 'root'
})
export class BioService {
  year = new Date().getFullYear();
  years: [{label: string, value: string}] = [{label: String(new Date().getFullYear()), value: String(new Date().getFullYear())}]
  bioAppSites = [
    'Greening Youth Foundation',
    'Good Samaritan Health Center of Gwinnett',
    'Yerkes Regional Primate Research Center',
    'Covenant Health Pharmacy',
    'Gwinnett County (Water Resources, Environmental Health and Police Departments)',
    'Consultorio Medico Hispano',
  ]
  bioAppDocs: {position: number, filetype: string, filename: string, date_uploaded: string}[] = [{
    position: 1,
    filename: 'essay.docx',
    filetype: 'Essay',
    date_uploaded: new Date(Date.UTC(2021, 8, 14, 4,42,12)).toLocaleString(),
  },
    {
      position: 2,
      filetype: 'Transcript',
      filename: 'unofficial_transcript.pdf',
      date_uploaded: new Date(Date.UTC(2021, 9, 25, 7,13,54)).toLocaleString(),
    },
    {
      position: 3,
      filetype: 'Preceptor Form',
      filename: 'preceptor.docx',
      date_uploaded: new Date(Date.UTC(2021, 11, 3, 1,28,4)).toLocaleString(),
    }];

  constructor(private httpClient: HttpClient) {
    for (let i = 1; i < 4; i++) {
      this.years.push({
        label: String(this.year + i),
        value: String(this.year + i)
      })
    }
  }

  getBioAppSites() {
    return this.bioAppSites.slice()
  }

  getDocs() {
    return this.bioAppDocs.slice();
  }

  addDoc(pos: number, id: string, filename: string, date_uploaded: string) {
    this.bioAppDocs.push({position: pos, filetype: id, filename: filename, date_uploaded: date_uploaded});
  }

  getApplication() {
    return this.httpClient.get<{message: string, application: BioApplication}>(environment.apiUrl + 'bio');
  }


}
