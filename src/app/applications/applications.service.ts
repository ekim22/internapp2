import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  year = new Date().getFullYear();
  years: [{label: string, value: string}] = [{label: String(new Date().getFullYear()), value: String(new Date().getFullYear())}]

  constructor() {
    for (let i = 1; i < 4; i++) {
      this.years.push({
        label: String(this.year + i),
        value: String(this.year + i)
      })
    }
  }
}
