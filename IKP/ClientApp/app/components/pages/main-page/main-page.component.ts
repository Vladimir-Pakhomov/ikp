import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User, UserRole, LicenseKeyKeyMap, AdminKeyMap, StuffKeyMap, StudentKeyMap, GroupKeyMap, HistoryItemKeyMap, LicenseKey, Admin, Stuff, Student, Group, HistoryItem, ProgramKeyMap, ResultKeyMap } from '../../../services/models/main.model';
import { AdminService } from '../../../services/admin/admin.service';
import { ActionService } from '../../../services/actions/action.service';

@Component({
    selector: 'main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {
    @Input() currentUser: User;
    role: UserRole;

    destroy$: Subject<boolean> = new Subject<boolean>();
    updater$: Subject<string> = new Subject<string>();

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

    adminExtraActions: any[] = [{ key: 'assignSA', value: 'Назначить СА' }];
    stuffExtraActions: any[] = [{ key: 'changePosition', value: 'Изменить должность' }];
    studentExtraActions: any[] = [{ key: 'changeGroup', value: 'Изменить группу' }];

    constructor(private admin: AdminService, private action: ActionService){

    }

    updateModule(module: MainModule) {
        this.updater$.next(module);
    }

    goToModule(module: MainModule) {
        this.updater$.next(module);
        this.currentModule = module;
    }

    ngOnInit() {
        this.updater$
        .concatMap(m => {
            if(m == 'Keys') return Observable.zip(Observable.of(m), this.admin.getLicenseKeys(this.currentUser.Company).map(r => <any[]>r));
            if(m == 'Admins') return Observable.zip(Observable.of(m), this.admin.getAdmins(this.currentUser.Company).map(r => <any[]>r));
            if(m == 'Stuff') return Observable.zip(Observable.of(m), this.admin.getStuff(this.currentUser.Company).map(r => <any[]>r));
            if(m == 'Students') return Observable.zip(Observable.of(m), this.admin.getStudents(this.currentUser.Company).map(r => <any[]>r));
            if(m == 'Groups') return Observable.zip(Observable.of(m), this.admin.getGroups(this.currentUser.Company).map(r => <any[]>r));
            if(m == 'History') return Observable.zip(Observable.of(m), this.admin.getHistory(this.currentUser.Company, new Date(), new Date()).map(r => <any[]>r));
            if(m == 'MyGroups') return Observable.zip(Observable.of(m), this.admin.getMyGroups(this.currentUser).map(r => <any[]>r));
            if(m == 'AllResults') return Observable.zip(Observable.of(m), this.admin.getAllResults(this.currentUser.Company).map(r => <any[]>r));
            if(m == 'Programs') return Observable.zip(Observable.of(m), this.admin.getPrograms(this.currentUser.Company).map(r => <any[]>r));
            if(m == 'MyResults') return Observable.zip(Observable.of(m), this.admin.getMyResults(this.currentUser).map(r => <any[]>r));
            return Observable.zip(Observable.of(m), Observable.of([]));
        })
        .takeUntil(this.destroy$)
        .subscribe(([m, data]) => {
            switch(m){
                case 'Keys':
                    this.keys = data;
                    break;
                case 'Admins':
                    this.admins = data;
                    break;
                case 'Stuff':
                    this.stuff = data;
                    break;
                case 'Students':
                    this.students = data;
                    break;
                case 'Groups':
                    this.groups = data;
                    break;
                case 'History':
                    this.history = data;
                    break;
                case 'MyGroups':
                    this.myGroups = data;
                    break;
                case 'AllResults':
                    this.allResults = data;
                    break;
                case 'Programs':
                    this.programs = data;
                    break;
                case 'MyResults':
                    this.myResults = data;
                    break;
            }
        });

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

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    onExtraAction(event: any){
        switch(event.key){
            case 'assignSA':
                let targetAdmin = event.data as Admin;
                this.action.assignSA(targetAdmin.ID, targetAdmin.Company)
                .subscribe(() => this.updater$.next('Admins'));
                break;
        }
    }
}

export type MainModule = 
'Keys' | 'Admins' | 'Stuff' | 'Groups' | 'Students' | 'History'|
'MyGroups' | 'AllResults' |
'Programs' | 'MyResults';
