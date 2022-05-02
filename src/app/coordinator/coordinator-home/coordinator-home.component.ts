import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {SelectionModel} from "@angular/cdk/collections";
import {CoordinatorService} from "../coordinator.service";
import {ApplicationData} from "../application.model";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {AsyncSubject, Subject} from "rxjs";
import {AnnouncementsService} from "../../announcements/announcements.service";


@Component({
  selector: 'app-coordinator-home',
  templateUrl: './coordinator-home.component.html',
  styleUrls: ['./coordinator-home.component.css']
})
export class CoordinatorHomeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['email', 'name', 'status', 'progress', 'actions'];
  applications: ApplicationData[] = [];
  applicationsList!: MatTableDataSource<ApplicationData>
  selection = new SelectionModel<ApplicationData>(true, []);

  private editorSubject: Subject<any> = new AsyncSubject();
  announcements: FormGroup = new FormGroup({
    body: new FormControl('')
  });
  editAnnouncements: boolean = false;
  announcementsLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private coordinatorService: CoordinatorService,
              private announcementsService: AnnouncementsService,
              private _route: ActivatedRoute) { }

  ngOnInit() {
    this.applications = this._route.snapshot.data["studentApplications"]
    this.applicationsList = new MatTableDataSource(this.applications);
  }

  ngAfterViewInit(): void {
    this.applicationsList.paginator = this.paginator;
    this.applicationsList.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.applicationsList.filterPredicate = (data, filter) => (data.email.trim().toLowerCase().indexOf(filter) !== -1 || data.name.trim().toLowerCase().indexOf(filter) !== -1 || data.status.trim().toLowerCase().indexOf(filter) !== -1)
    this.applicationsList.filter = filterValue.trim().toLowerCase();

    if (this.applicationsList.paginator) {
      this.applicationsList.paginator.firstPage();
    }
  }

  onViewApplication(application: any) {
    this.coordinatorService.getApplication( application.type, application._id);
  }

  onMarkApproved(application: any) {
    application.status = 'Approved';
    this.coordinatorService.markApplicationApproved(application._id);
  }

  onLeaveComment() {}

  handleEditorInit(e: any) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }

  toggleAnnouncementsMode() {
    this.editAnnouncements = !this.editAnnouncements;
    if (this.editAnnouncements) {
      this.announcements.controls["body"].patchValue(this.announcementsService.getAnnouncements());
    }

  }

  submitAnnouncements() {
    this.announcementsLoading = true;
    this.announcementsService.updateAnnouncements(this.announcements.controls['body'].value).subscribe(() => {
      this.toggleAnnouncementsMode();
      this.announcementsLoading = false;
    }, error => {
      setTimeout(() => {
        this.announcementsLoading = false;
      }, 2000)
    });
  }


}
