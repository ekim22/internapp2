import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AnnouncementsService} from "./announcements.service";

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit, OnDestroy {
  program!: string;
  content!: string;
  announcementsSub!: Subscription;

  constructor(private announcementsService: AnnouncementsService) { }

  /*
  TODO Because of bad design on the dev's part, for every new department added in the future, you must add a case for it here if you wish the program to be styled intelligently on the template.
   */
  ngOnInit(): void {
    this.announcementsSub = this.announcementsService.getAnnouncementsForCoordinator().subscribe((res) => {
      switch (res.program) {
        case 'bio':
          this.program = 'Biology'
          break;
        default:
          console.log(res.program + ' has not been registered as a department yet. A complaint to the programmer in charge is in order.')
      }
      this.content = res.announcements;
      this.announcementsService.announcementsContent = res.announcements;
    })
  }

  ngOnDestroy() {
    this.announcementsSub.unsubscribe();
  }

}
