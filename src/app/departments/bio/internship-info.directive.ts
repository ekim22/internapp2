import { Directive } from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

/** When site type "other" is chosen, site, manager, and preceptor information becomes required  */
export const otherSiteValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const selectedSite = control.get('committeeSites');

  if (selectedSite?.value !== 'other') {
    return null;
  } else {
    const isSiteInfoComplete = (
      control.get('siteName')?.value !== ''
      && control.get('siteSpecialty')?.value !== ''
      && control.get('siteAddress')?.value !== ''
      && control.get('siteCity')?.value !== ''
      && control.get('siteState')?.value !== ''
      && control.get('siteZip')?.value !== ''
      && control.get('sitePhone')?.value !== ''
      && control.get('managerFirstName')?.value !== ''
      && control.get('managerLastName')?.value !== ''
      && control.get('managerTitle')?.value !== ''
      && control.get('managerEmail')?.value !== ''
      && control.get('preceptorFirstName')?.value !== ''
      && control.get('preceptorLastName')?.value !== ''
      && control.get('preceptorPhone')?.value !== ''
      && control.get('preceptorEmail')?.value !== ''
      && control.get('preceptorTitle')?.value !== ''
      && control.get('preceptorManagerStatus')?.value !== '');
    return isSiteInfoComplete ? null : {siteInfoIncomplete: true};
  }
};

/** If the applicant works at the site, then student employment information becomes required.  */
export const employedHereValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const employedHere = control.get('studentEmployedHere');

  if (employedHere?.value === 'no') {
    return null;
  } else {
    const isEmploymentInfoComplete =
      (control.get('studentPosition')?.value !== ''
      && control.get('studentPosition')?.value !== ''
      && control.get('studentPosition')?.value !== ''
      && control.get('studentPosition')?.value !== ''
      && control.get('studentPosition')?.value !== '');
    return isEmploymentInfoComplete ? null : {employmentIncomplete: true};
  }
};

@Directive({
  selector: '[appInternshipInfo]'
})
export class InternshipInfoDirective {

  constructor() { }

}
