import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BioApplication} from "./bio.model";
import { saveAs } from 'file-saver';
import {CommentThread} from "../../shared/comment/comment-thread.model";
import {BioDoc} from "./biodoc.model";
import {BehaviorSubject, Subject} from "rxjs";

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
  ];
  bioAppComments: CommentThread[] = [];
  // TODO The docs should be subdocs in the bio mongoose schema and a part of a bio app that way.
  // bioAppDocs: {position: number, filetype: string, filename: string, date_uploaded: string}[] = [{
  //   position: 1,
  //   filename: 'essay.docx',
  //   filetype: 'Essay',
  //   date_uploaded: new Date(Date.UTC(2021, 8, 14, 4,42,12)).toLocaleString(),
  // },
  //   {
  //     position: 2,
  //     filetype: 'Transcript',
  //     filename: 'unofficial_transcript.pdf',
  //     date_uploaded: new Date(Date.UTC(2021, 9, 25, 7,13,54)).toLocaleString(),
  //   },
  //   {
  //     position: 3,
  //     filetype: 'Preceptor Form',
  //     filename: 'preceptor.docx',
  //     date_uploaded: new Date(Date.UTC(2021, 11, 3, 1,28,4)).toLocaleString(),
  //   }];
  bioAppDocs: {position: number, filetype: string, filename: string, date_uploaded: string}[] = []
  private docs = new BehaviorSubject<Array<BioDoc>>([]);
  private counter: number = 1;


  constructor(private httpClient: HttpClient) {
    this.makeYears();
  }

  makeYears() {
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

  // TODO Will probably be obsolete once the docs are simply added directly to the application proper and therefore loaded with the rest of the fields altogether
  getDocs() {
    return this.bioAppDocs.slice();
  }

  downloadDoc(fileType: string, filePath: string, fileName: string, appId?: string) {
    if (!appId) {
      appId = 'student';
    }
    const params = appId + "/" + fileType + "/" + filePath + "/" + fileName;
    this.httpClient.get(environment.apiUrl + 'bio/doc/' + params, {responseType: "blob"})
      .toPromise()
      .then(blob => {
        saveAs(blob, fileName);
        }
      )
      .catch(error => {
        console.log(error);
      });

  }

  uploadDoc(docInfo: {fileName: string, fileType: string, dateUploaded: string}, document: File) {
    const docData = new FormData();
    docData.append('fileName', docInfo.fileName);
    docData.append('fileType', docInfo.fileType);
    docData.append('dateUploaded', docInfo.dateUploaded);
    docData.append('document', document)
    return this.httpClient.post<{documents: { essay: Array<BioDoc>, transcript: Array<BioDoc>, otherDoc: Array<BioDoc> }}>(environment.apiUrl + 'bio/doc/upload', docData);
  }

  deleteDoc(fileType: string, filePath: string) {
    this.httpClient.delete<{message: string, documents: { essay: Array<BioDoc>, transcript: Array<BioDoc>, otherDoc: Array<BioDoc> } }>(environment.apiUrl + 'bio/doc/delete/' + fileType + '/' + filePath).subscribe(res => {
      this.updateDocs(res);
    });
  }

  saveApplication(formData: BioApplication) {
    this.httpClient
      .post<{message: string, savedFormData: BioApplication}>(environment.apiUrl + 'bio/save', formData)
      .subscribe(res => {
        console.log(res.savedFormData);
        console.log(res.message);
      });
  }

  getApplication(studentId?: string) {
    let queryParams
    if (studentId !== undefined) {
      queryParams = `?appid=${studentId}`;
    } else {
      queryParams = '';
    }

    return this.httpClient.get<{message: string, application: BioApplication}>(environment.apiUrl + 'bio' + queryParams);
  }

  updateInstructions(instructions: string) {
    const instructionData = {
      newInstructions: instructions
    }
    return this.httpClient.post(environment.apiUrl + 'bio/update-instructions', instructionData)
  }

  getInstructions() {
    return this.httpClient.get<{message: string, instructions: string}>(environment.apiUrl + 'bio/get-instructions')
  }

  get bioDocs() {
    return this.docs;
  }

  updateDocs(res: {documents: { essay: Array<BioDoc>, transcript: Array<BioDoc>, otherDoc: Array<BioDoc> }}) {
    this.bioDocs.next([
      ...res.documents.essay.map(value => {
        value.dateUploaded = new Date(value.dateUploaded).toLocaleDateString();
        return value;
      }),
      ...res.documents.transcript.map(value => {
        value.dateUploaded = new Date(value.dateUploaded).toLocaleDateString();
        return value;
      }),
      ...res.documents.otherDoc.map(value => {
        value.dateUploaded = new Date(value.dateUploaded).toLocaleDateString();
        return value;
      })
    ]);
  }

  addDoc(doc: BioDoc) {
    this.bioDocs.next([
      ...this.docs.value,
      {
        position: this.counter++,
        fileName: doc.fileName,
        fileType: doc.fileType,
        filePath: doc.filePath,
        dateUploaded: new Date(doc.dateUploaded).toLocaleDateString(),
      }
    ]);
    // if (this.docs.value.length > 0) {
    //   this.bioDocs.next([
    //     ...this.docs.value,
    //     {
    //       position: this.counter++,
    //       fileName: doc.fileName,
    //       fileType: doc.fileType,
    //       dateUploaded: new Date(doc.dateUploaded).toLocaleDateString(),
    //     }
    //   ]);
    //   console.log('BIO DOC VALUE: ' , this.docs.value)
    // } else {
    //   this.bioDocs.next([
    //     {
    //       position: this.counter++,
    //       fileName: doc.fileName,
    //       fileType: doc.fileType,
    //       dateUploaded: new Date(doc.dateUploaded).toLocaleDateString(),
    //     }
    //   ]);
    //   console.log('BIO DOC VALUE IN ELSE: ' , this.docs.value)
    // }
  }

  clearDocs() {
    this.docs.next([]);
  }

}
