import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReplaySubject, Subject} from "rxjs";
import {ProfileService} from "../profile.service";

@Component({
  selector: 'app-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.css']
})
export class ProfileIconComponent implements OnInit, OnChanges {
  initials = new ReplaySubject<string>();
  @Input() iconInitials!: string;
  @Input() iconClass!: string;
  @Input() containerClass!: string;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userInitials']) {
      this.initials.next(this.profileService.makeInitials(changes['userInitials'].currentValue));

    }
  }

  @Input()
  set userInitials(name: string | null) {
    if (name != null) {
      this.initials.next(this.profileService.makeInitials(name));
    }

  }

}
