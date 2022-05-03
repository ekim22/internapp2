export interface BioApplication {
  studentAcademicInfo: {
    desiredInternshipSemester: string,
    desiredInternshipYear: string,
    concentration: string,
    expectedGradSemester: string,
    expectedGradYear: string,
    overallGPA: string,
    programGPA: string,
    hoursCompleted: string,
    intendedProfession: string,
    completed: boolean,
  };
  emergencyContactInfo: {
    contactFirstName: string,
    contactLastName: string,
    contactAddress: string,
    contactCity: string,
    contactState: string,
    contactZip: string,
    contactPhone: string,
    contactEmail: string,
    completed: boolean,
  };
  mentorInfo: {
    mentorFirstName: string,
    mentorLastName: string,
    mentorOffice: string,
    mentorPhone: string,
    mentorEmail: string,
    completed: boolean,
  };
  internshipInfo: {
    committeeSites: string,
    siteName: string,
    siteSpecialty: string,
    siteAddress: string,
    siteCity: string,
    siteState: string,
    siteZip: string,
    sitePhone: string,
    managerFirstName: string,
    managerLastName: string,
    managerTitle: string,
    managerEmail: string,
    preceptorFirstName: string,
    preceptorLastName: string,
    preceptorPhone: string,
    preceptorEmail: string,
    preceptorTitle: string,
    preceptorManagerStatus: string,
    studentEmployedHere: string,
    studentPosition: string,
    studentPayStatus: string,
    studentAvgWorkingHours: string,
    studentInternshipVsWork: string,
    studentPersonalConnection: string,
    completed: boolean,
  };
  educationalObjectives: {
    firstObjective: string,
    secondObjective: string,
    thirdObjective: string,
    completed: boolean,
  };
  documents: {
    essay: [],
    transcript: [],
    otherDoc: [],
    completed: boolean,
  }
  signature: {
    printedSignature: string,
    completed: boolean,
  };
}
