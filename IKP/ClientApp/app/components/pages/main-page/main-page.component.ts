import { Component, Input, OnInit } from '@angular/core';
import { User, UserRole, LicenseKeyKeyMap, AdminKeyMap, StuffKeyMap, StudentKeyMap, GroupKeyMap, HistoryItemKeyMap, LicenseKey, Admin, Stuff, Student, Group, HistoryItem, ProgramKeyMap, ResultKeyMap } from '../../../services/models/main.model';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
    selector: 'main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
    @Input() currentUser: User;
    role: UserRole;

    licenseKeyMap = LicenseKeyKeyMap;
    adminsKeyMap = AdminKeyMap;
    stuffKeyMap = StuffKeyMap;
    studentsKeyMap = StudentKeyMap;
    groupsKeyMap = GroupKeyMap;
    historyKeyMap = HistoryItemKeyMap;
    programsKeyMap = ProgramKeyMap;
    resultsKeyMap = ResultKeyMap;

    keys: LicenseKey[] = [];
    admins: Admin[] = [];
    stuff: Stuff[] = [];
    students: Student[] = [];
    groups: Group[] = [];
    history: HistoryItem[] = [];

    myGroups: Group[] = [];
    allResults: any[] = [];

    programs: any[] = [];
    myResults: any[] = [];

    currentModule: MainModule;

    roleString: string;

    constructor(private admin: AdminService){

    }

    goToModule(module: MainModule) {
        if(module == 'Keys' && !this.keys.length){
            this.admin.getLicenseKeys(this.currentUser.Company).subscribe(x => this.keys = x);
        }
        if(module == 'Admins' && !this.admins.length){
            this.admin.getAdmins(this.currentUser.Company).subscribe(x => this.admins = x);
        }
        if(module == 'Stuff' && !this.stuff.length) {
            this.admin.getStuff(this.currentUser.Company).subscribe(x => this.stuff = x);
        }
        if(module == 'Students' && !this.students.length){
            this.admin.getStudents(this.currentUser.Company).subscribe(x => this.students = x);
        }
        if(module == 'Groups' && !this.groups.length){
            this.admin.getGroups(this.currentUser.Company).subscribe(x => this.groups = x);
        }
        if(module == 'History' && !this.history.length){
            this.admin.getHistory(this.currentUser.Company, new Date(), new Date()).subscribe(x => this.history = x);
        }

        if(module == 'MyGroups' && !this.myGroups.length){
            this.admin.getMyGroups(this.currentUser).subscribe(x => this.myGroups = x);
        }
        if(module == 'AllResults' && !this.allResults.length){
            this.admin.getAllResults(this.currentUser.Company).subscribe(x => this.allResults = x);
        }

        if(module == 'Programs' && !this.programs.length){
            this.admin.getPrograms(this.currentUser.Company).subscribe(x => this.programs = x);
        }
        if(module == 'MyResults' && !this.myResults.length){
            this.admin.getMyResults(this.currentUser).subscribe(x => this.myResults = x);
        }

        this.currentModule = module;
    }

    ngOnInit() {
        this.role = this.currentUser.Role;
        this.roleString = UserRole[this.role];
        switch(this.role){
            case UserRole.Admin:
                this.goToModule('Keys');
                break;
            case UserRole.Stuff:
                this.goToModule('MyGroups');
                break;
            case UserRole.Student:
                this.goToModule('Programs');
                break;
        }
    }
}

export type MainModule = 
'Keys' | 'Admins' | 'Stuff' | 'Groups' | 'Students' | 'History'|
'MyGroups' | 'AllResults' |
'Programs' | 'MyResults';
