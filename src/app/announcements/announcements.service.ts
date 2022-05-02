import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {
  announcementsContent: string = '';

  constructor(private httpClient: HttpClient) { }

  updateAnnouncements(announcements: string) {
    const announcementsData = {
      newAnnouncements: announcements
    }
    return this.httpClient.post(environment.apiUrl + 'announcements', announcementsData)
  }

  getAnnouncementsForCoordinator() {
    return this.httpClient.get<{message: string, announcements: string, program: string}>(environment.apiUrl + 'announcements')
  }

  getAnnouncementsForStudent() {
    return this.httpClient.get<{message: string, announcements: string}>(environment.apiUrl + 'announcements')
  }

  getAnnouncements() {
    return this.announcementsContent;
  }
}
