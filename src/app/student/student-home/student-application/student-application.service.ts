import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentApplicationService {
  appInfoTitle!: Subject<string>;
  appInfoSubtitle!: Subject<string>;
  appInfoContent!: Subject<string>;


  constructor() { }

}
