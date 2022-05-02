import {NgModule} from "@angular/core";
import {ProfileIconComponent} from "./profile-icon/profile-icon.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    ProfileIconComponent
  ],
  exports: [
    ProfileIconComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProfileModule {}
