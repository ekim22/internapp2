import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {CoordinatorService} from "./coordinator.service";
import {ApplicationData} from "./application.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CoordinatorResolver implements Resolve<ApplicationData[]> {
  constructor(private coordinatorService: CoordinatorService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ApplicationData[]> {
    return this.coordinatorService.getApplications().pipe(
      map(applications => {
        return [
          ...applications.studentApplications
        ]
      })
    );
  }
}
