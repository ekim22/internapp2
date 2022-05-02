import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

export interface ActiveRoute {
  [key: string]: boolean
}

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
    routesActivated: ActiveRoute = {
      'posts': false,
      'application': false,
    }
    routeStatusChanged = new Subject();

    getRouteStatuses() {
      return this.routesActivated;
    }

    isRouteActive(route: string) {
      return this.routesActivated[route];
    }

    activateRoute(route: string) {
      this.routesActivated[route] = true;
      this.routeStatusChanged.next();
    }

    deactivateRoute(route: string) {
      this.routesActivated[route] = false;
      this.routeStatusChanged.next();
    }
}
