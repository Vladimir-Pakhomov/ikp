import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User, UserRole, LicenseKeyKeyMap, AdminKeyMap, StuffKeyMap, StudentKeyMap, GroupKeyMap, HistoryItemKeyMap, LicenseKey, Admin, Stuff, Student, Group, HistoryItem, ProgramKeyMap, ResultKeyMap, Program, Block, Exersize, NamedObjectKeyMap, ResultKeyMapLite } from '../../../services/models/main.model';
import { AdminService } from '../../../services/admin/admin.service';
import { ActionService } from '../../../services/actions/action.service';
import { checkProgram, checkNamedObject } from '../../misc/pipes/object.pipe';

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

    get programsKeyMap(): any {
        return this.role == 0 ? ProgramKeyMap : NamedObjectKeyMap;
    }

    get resultsKeyMap(): any {
        return this.role < 2 ? ResultKeyMap : ResultKeyMapLite;
    }

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

    currentAdmin: any;
    currentStuff: any;
    currentStudent: any;
    currentGroup: any;
    currentProgram: any;
    currentBlock: any;
    currentExersize: any;
    currentQuestion: any;
    currentConclusion: any;
    currentConclusionItem: any;
    currentResolver: any;

    roleString: string;

    /* extra actions */

    adminExtraActions: any[] = [{ key: 'assignSA', value: 'Назначить СА' }];
    stuffExtraActions: any[] = [{ key: 'changePosition', value: 'Изменить должность' }];
    studentExtraActions: any[] = [{ key: 'changeGroup', value: 'Изменить группу' }];

    programExtraActions: any[] = [{ key: 'viewBlockStructure', value: 'Структура...' }];

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

    onAddLicenseKey() {
        this.action.generateKey(this.currentUser.Company)
        .subscribe(() => this.goToModule('Keys'));
    }

    onAddAdmin() {
        this.goToModule('AddAdmin');
    }

    performAddAdmin(data: Admin){
        this.action.addAdmin(this.currentUser.Company, data.FIO, data.Login, data.Password, false)
        .subscribe(() => this.goToModule('Admins'));
    }

    onEditAdmin(data: any){
        this.currentAdmin = data;
        this.goToModule('EditAdmin');
    }

    performEditAdmin(data: Admin){
        this.action.editUser(data.ID, this.currentUser.Company, data.FIO, data.Login, data.Password)
        .subscribe(() => this.goToModule('Admins'));
    }

    onAddStuff() {
        this.goToModule('AddStuff');
    }

    onEditStuff(data: any){
        this.currentStuff = data;
        this.goToModule('EditStuff');
    }

    onAddStudent() {
        this.goToModule('AddStudent');
    }

    onEditStudent(data: any){
        this.currentStudent = data;
        this.goToModule('EditStudent');
    }

    onDeleteUser(data: User){
        this.action.deleteUser(data.ID, this.currentUser.Company).subscribe();
    }

    onAddGroup(){
        this.goToModule('AddGroup');
    }

    onEditGroup(data: any){
        this.currentGroup = data;
        this.goToModule('EditGroup');
    }

    onDeleteGroups(data: Group){
        this.action.deleteGroup(data.ID, this.currentUser.Company).subscribe();
    }

    onAddProgram() {
        this.goToModule('AddProgram');
    }

    performAddProgram(data: Program) {
        this.action.addProgram(data.Name, data.LicenseKey.ID, this.currentUser.Company)
        .subscribe(() => this.goToModule('Programs'));
    }

    onAddBlock(data: Block){
        this.currentBlock = data;
        this.goToModule('AddBlock');
    }

    onAddExersize(data: Exersize){
        this.currentBlock = data;
        this.goToModule('AddExersize');
    }

    addBlockToParent(data: any){
        let parentType = checkProgram(this.currentBlock) ? "0" : "1";
        this.action.addBlockAsDescendant(data.parentID, parentType, data.Block.Name, this.currentUser.Company)
        .subscribe(() => this.goToModule('BlockStructure'));
    }

    addExersizeToParent(data: any){
        let parentType = checkProgram(this.currentBlock) ? "0" : "1";
        this.action.addExersizeAsDescendant(data.parentID, parentType, data.Exersize.Name, data.Exersize.GeneralQuestion, this.currentUser.Company)
        .subscribe(() => this.goToModule('BlockStructure'));
    }

    onViewDescendantBlock(data: any){
        this.currentBlock = data;
        this.goToModule('BlockStructure');
    }

    onViewDescendantExersize(data: any){
        this.currentExersize = data;
        this.goToModule('ExersizeStructure');
    }

    onAddQuestion() {
        this.goToModule('AddQuestion');
    }

    onAddConclusion() {
        this.goToModule('AddConclusion');
    }

    addQuestionToExersize(data: any){
        this.action.addQuestionAsDescendant(data.parentID, "2", data.Question.Content, this.currentUser.Company)
        .subscribe(() => this.goToModule('ExersizeStructure'));
    }

    addConclusionToExersize(data: any){
        this.action.addConclusionAsDescendant(data.parentID, "2", data.Conclusion.Name, this.currentUser.Company)
        .subscribe(() => this.goToModule('ExersizeStructure'));
    }

    onViewQuestionResolvers(data: any){
        this.currentQuestion = data;
        this.goToModule('QuestionResolvers');
    }

    onViewConclusionStructure(data: any){
        this.currentConclusionItem = data;
        if(checkNamedObject(data))
            this.currentConclusion = data;
        this.goToModule('ConclusionStructure');
    }

    onAddResolver() {
        this.goToModule('AddResolver');
    }

    onViewResolverVideos(data: any){
        this.currentResolver = data;
        this.goToModule('ResolverVideos');
    }

    onAddConclusionItem() {
        this.goToModule('AddConclusionItem');
    }

    addConclusionItemToParent(data: any){
        let parentType = checkNamedObject(this.currentConclusionItem) ? "6" : "7";
        this.action.addConclusionItemAsDescendant(data.parentID, parentType, data.ConclusionItem.Content, data.ConclusionItem.IsBranch, data.ConclusionItem.IsCorrect, this.currentUser.Company)
        .subscribe(() => this.goToModule('ConclusionStructure'));
    }

    addResolverToQuestion(data: any){
        this.action.addResolverAsDescendant(data.parentID, "3", data.Resolver.Type, data.Resolver.Content, this.currentUser.Company)
        .subscribe(() => this.goToModule('QuestionResolvers'));
    }

    onAddVideo(){
        this.goToModule('AddVideo');
    }

    addVideoToResolver(data: any){
        this.action.addVideoAsDescendant(data.parentID, "4", data.Video.Content1, data.Video.Content2, data.Video.IsFirstCorrect, data.Video.PlaybackType, this.currentUser.Company)
        .subscribe(() => this.goToModule('ResolverVideos'));
    }

    onStartExecution(data: any){
        this.currentBlock = data;
        this.goToModule('BlockExecution');
    }

    onBack() {
        switch(this.currentModule){
            case 'BlockStructure':
            case 'BlockExecution':
                this.currentBlock = null;
                this.goToModule('Programs');
                break;
            case 'ExersizeStructure':
                this.currentExersize = null;
                this.goToModule('BlockStructure');
                break;
            case 'QuestionResolvers':
                this.currentQuestion = null;
                this.goToModule('ExersizeStructure');
                break;
            case 'ResolverVideos':
                this.currentResolver = null;
                this.goToModule('QuestionResolvers');
                break;
            case 'ConclusionStructure':
                this.currentConclusionItem = null;
                this.goToModule('ExersizeStructure');
                break;
        }
    }

    /* Extra Actions */


    onExtraAction(event: any){
        switch(event.key){
            case 'assignSA':
                let targetAdmin = event.data as Admin;
                this.action.assignSA(targetAdmin.ID, targetAdmin.Company)
                .subscribe(() => this.updater$.next('Admins'));
                break;
            case 'viewBlockStructure':
                this.currentBlock = event.data;
                if(checkProgram(this.currentBlock))
                    this.currentProgram = Object.assign({}, event.data);
                this.goToModule('BlockStructure');
                break;
            case 'startBlockExecution':
                this.currentBlock = event.data;
                this.goToModule('BlockExecution');
                break;
        }
    }
}

export type MainModule = 
'Keys' | 'Admins' | 'Stuff' | 'Groups' | 'Students' | 'History'|
'MyGroups' | 'AllResults' |
'Programs' | 'MyResults' |
'AddAdmin' | 'AddStuff' | 'AddStudent' | 'AddGroup' |
'EditAdmin' | 'EditStuff' | 'EditStudent' | 'EditGroup' |
'AddProgram' | 'AddBlock' | 'AddExersize' |
'EditProgram' | 'EditBlock' | 'EditExersize' |
'BlockStructure' | 'ExersizeStructure' |
'AddQuestion'  | 'AddConclusion' |
'EditQuestion' | 'EditConclusion' |
'QuestionResolvers' | 'ConclusionStructure' |
'AddResolver' | 'AddConclusionItem' |
'EditResolver' | 'EditConclusionItem' |
'ResolverVideos' | 'AddVideo' | 'EditVideo' |
'BlockExecution';
