import {Injectable} from "@angular/core";

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
  bioAppDocs: {position: number, filetype: string, filename: string}[] = [{
    position: 1,
    filename: 'essay.docx',
    filetype: 'essay'
  },
    {
      position: 2,
      filetype: 'transcript',
      filename: 'unofficial_transcript.pdf',
    },
    {
      position: 3,
      filetype: 'preceptor form',
      filename: 'preceptor.docx'
    }];
  // Statuses: complete, incomplete, not started
  studentApplicationStatus!: string;

  constructor() {
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

  addDoc(pos: number, id: string, filename: string) {
    this.bioAppDocs.push({position: pos, filetype: id, filename});
  }

  setStudentApplicationStatus(status: string) {
    this.studentApplicationStatus = status;
  }

  getStudentApplicationStatus() {
    return this.studentApplicationStatus;
  }
}
