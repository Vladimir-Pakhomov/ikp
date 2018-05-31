import { Component, Input, OnInit } from '@angular/core';
import { User, UserRole, LicenseKeyKeyMap, DbKeyMap, AdminKeyMap, StuffKeyMap, StudentKeyMap, GroupKeyMap, HistoryItemKeyMap, LicenseKey, Db, Admin, Stuff, Student, Group, HistoryItem, ProgramKeyMap, ResultKeyMap } from '../../../services/models/main.model';
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
    dbKeyMap = DbKeyMap;
    adminsKeyMap = AdminKeyMap;
    stuffKeyMap = StuffKeyMap;
    studentsKeyMap = StudentKeyMap;
    groupsKeyMap = GroupKeyMap;
    historyKeyMap = HistoryItemKeyMap;
    programsKeyMap = ProgramKeyMap;
    resultsKeyMap = ResultKeyMap;

    keys: LicenseKey[] = [];
    databases: Db[] = [];
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
            this.admin.getLicenseKeys().subscribe(x => this.keys = x);
        }
        if(module == 'Databases' && !this.databases.length){
            this.admin.getDatabases().subscribe(x => this.databases = x);
        }
        if(module == 'Admins' && !this.admins.length){
            this.admin.getAdmins().subscribe(x => this.admins = x);
        }
        if(module == 'Stuff' && !this.stuff.length) {
            this.admin.getStuff().subscribe(x => this.stuff = x);
        }
        if(module == 'Students' && !this.students.length){
            this.admin.getStudents().subscribe(x => this.students = x);
        }
        if(module == 'AllGroups' && !this.groups.length){
            this.admin.getGroups().subscribe(x => this.groups = x);
        }
        if(module == 'History' && !this.history.length){
            this.admin.getHistory(new Date(), new Date()).subscribe(x => this.history = x);
        }

        if(module == 'MyGroups' && !this.myGroups.length){
            this.admin.getMyGroups(this.currentUser).subscribe(x => this.myGroups = x);
        }
        if(module == 'AllResults' && !this.allResults.length){
            this.admin.getAllResults().subscribe(x => this.allResults = x);
        }

        if(module == 'Programs' && !this.programs.length){
            this.admin.getPrograms().subscribe(x => this.programs = x);
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
'Keys' | 'Databases' | 'Admins' | 'Stuff' | 'AllGroups' | 'Students' | 'History'|
'MyGroups' | 'AllResults' |
'Programs' | 'MyResults';
