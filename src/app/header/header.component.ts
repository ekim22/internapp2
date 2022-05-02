import {Component, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {PageService} from "../posts/page.service";
import {ActiveRoute, HeaderService} from "./header.service";
import {StudentService} from "../student/student.service";
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {CommentService} from "../shared/comment/comment.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated!: boolean;
  activeRoutes! : ActiveRoute;
  appType!: string;
  userRole!: string;
  overlayRef!: OverlayRef | null;
  private loginListener!: Subscription;
  private routeStatusListener!: Subscription;
  private userRoleListener!: Subscription;
  private appTypeListener!: Subscription;
  @Output() menuClicked = new EventEmitter<Event>();

  constructor(private authService: AuthService,
              private pageService: PageService,
              private headerService: HeaderService,
              private studentService: StudentService,
              private overlay: Overlay,
              private commentService: CommentService,
              ) { }

  ngOnInit(): void {
    this.loginListener = this.authService.loggedIn.subscribe((isLogged) => {
      this.isAuthenticated = !!isLogged;
      if (this.isAuthenticated) {
        this.appTypeListener = this.studentService.appTypeSub.subscribe((appType) => {
          this.appType = appType;
        })

        this.userRoleListener = this.authService.userRole$.subscribe(role => {
          this.userRole = role;
        });
      }
    });
    this.activeRoutes = this.headerService.getRouteStatuses();
    this.routeStatusListener = this.headerService.routeStatusChanged.subscribe( () => {
      this.activeRoutes = this.headerService.getRouteStatuses();
    });

  }

  ngOnDestroy() {
    this.loginListener.unsubscribe();
    this.routeStatusListener.unsubscribe();
    this.appTypeListener.unsubscribe();
    this.userRoleListener.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
    this.pageService.setPageOptionsToDefault();
  }

  onMenuClicked() {
    this.menuClicked.emit()
  }

  open() {
    this.commentService.open(true)
  }

}
