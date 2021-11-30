import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
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
}
