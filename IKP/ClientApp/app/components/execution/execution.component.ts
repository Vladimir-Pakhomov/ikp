import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject, Observable } from 'rxjs';
import { User } from '../../services/models/main.model';
import { LoginService } from '../../services/login/login.service';
import { Block } from '../../services/models/main.model';
import { AdminService } from '../../services/admin/admin.service';
import { FileService } from '../../services/file/file.service';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { ActionService } from '../../services/actions/action.service';

@Component({
    selector: 'execution',
    templateUrl: './execution.component.html',
    styleUrls: ['./execution.component.css']
})
export class ExecutionComponent implements OnInit, OnDestroy {
    @Input() currentUser: User;
    @Input() programID: number;
    @Input() block: Block;

    @Output() onBack: EventEmitter<any> = new EventEmitter<any>();

    blockData: any;

    displayResults: boolean = false;

    questionsCompletedCount(i: number){
        return this.blockData[i].Questions.filter((x: any) => this.isSuccess(x)).length;
    }

    resolverChanges: number = 0;
    successSelections: number = 0;
    errorSelections: number = 0;

    media1State = '';
    media2State = '';
    normalState = '';
    abuseState = '';

    get correctness(): string {
        let a = this.successSelections + this.errorSelections;
        let result = a > 0 ? this.successSelections / a : 0;
        return (result * 100).toFixed(2);
    }

    get rationality(): string {
        let a = this.successSelections + this.errorSelections;
        let result = this.resolverChanges > 0 ? Math.min(a, this.resolverChanges) / this.resolverChanges : 0;
        return (result * 100).toFixed(2);
    }

    get totalPercentage(): string {
        let countAll = 0;
        for(let i1=0; i1<this.blockData.length; i1++){
            for(let i2=0; i2<this.blockData[i1].Questions.length; i2++){
                for(let i3=0; i3<this.blockData[i1].Questions[i2].Resolvers.length; i3++) {
                    countAll++;
                }
            }
        }
        let result = this.successSelections / countAll;
        return (result * 100).toFixed(2);
    }

    currentEx: number = -1;
    currentQuestion: number = -1;
    currentResolver: number = -1;

    media1: string = '';
    media2: string = '';

    start: Date;
    end: Date;

    countdown = {
        days: "0",
        hours: "0",
        minutes: "0",
        seconds: "0"
    };
    
    get currentExSuccess(): boolean {
        return this.blockData[this.currentEx].Questions.filter((x: any) => !this.isSuccess(x)).length == 0;
    }

    constructor(private action: ActionService, private adminService: AdminService, private fileService: FileService, private datePipe: DatePipe) {

    }

    _destroy$: Subject<boolean> = new Subject<boolean>();

    makeDigitString(value: number): string{
        if(value >= 10)
            return value.toString();
        else return `0${value}`;
    }

    ngOnInit() {
        this.adminService.getBlockData(this.block.ID, this.currentUser.Company)
        .subscribe(x => { 
            this.blockData = x; 
            this.currentEx = 0;
            this.start = new Date();
            Observable.timer(0, 1000).takeUntil(this._destroy$).subscribe(i => {
                this.countdown.seconds = this.makeDigitString(i%60);
                this.countdown.minutes = this.makeDigitString(Math.floor(i / 60) % 60);
                this.countdown.hours = this.makeDigitString(Math.floor(i / 3600) % 24);
                this.countdown.days = this.makeDigitString(Math.floor(i / (3600 * 24)));
            });
        });
    }

    selectQuestion(i: number){
        this.currentQuestion = i;
        this.currentResolver = -1;
    }

    selectResolver(i: number) {
        if(this.currentResolver != i) {
            this.currentResolver = i;
            this.resolverChanges++;
            this.media1 =
                this.fileService.getVideo(
                this.blockData[this.currentEx].Questions[this.currentQuestion].Resolvers[this.currentResolver].Videos[0].Content1,
                this.currentUser.Company);
            if(!this.blockData[this.currentEx].Questions[this.currentQuestion].Resolvers[this.currentResolver].Videos[0].Content2)
            {
                this.media2 = '';
            }
            else {
                this.media2 = this.fileService.getVideo(
                this.blockData[this.currentEx].Questions[this.currentQuestion].Resolvers[this.currentResolver].Videos[0].Content2,
                this.currentUser.Company);
            }
        }
    }

    ngOnDestroy() {
        this._destroy$.next(true);
        this._destroy$.unsubscribe();
    }

    switchEx(i: number){
        this.currentEx = i;
        this.currentQuestion = -1;
        this.currentResolver = -1;
    }

    selectMedia1() {
        if(this.media1State) return;
        let video = this.blockData[this.currentEx].Questions[this.currentQuestion].Resolvers[this.currentResolver].Videos[0];
        if(video.IsFirstCorrect) {
            this.media1State = 'success';
            this.successSelections++;
            this.blockData[this.currentEx].Questions[this.currentQuestion].Resolvers[this.currentResolver].IsSuccess = true;
        }
        else {
            this.errorSelections++;
            this.media1State = 'error';
        }
        TimerObservable.create(1000).subscribe(() => { this.media1State = ''; this.currentResolver = -1; });
    }

    selectMedia2() {
        if(this.media2State) return;
        let video = this.blockData[this.currentEx].Questions[this.currentQuestion].Resolvers[this.currentResolver].Videos[0];
        if(!video.IsFirstCorrect) {
            this.successSelections++;
            this.blockData[this.currentEx].Questions[this.currentQuestion].Resolvers[this.currentResolver].IsSuccess = true;
            this.media2State = 'success';
        }
        else {
            this.errorSelections++;
            this.media2State = 'error';
        }
        TimerObservable.create(1000).subscribe(() => { this.media2State = ''; this.currentResolver = -1; });
    }

    selectNormal() {
        if(this.normalState) return;
        let video = this.blockData[this.currentEx].Questions[this.currentQuestion].Resolvers[this.currentResolver].Videos[0];
        if(video.IsFirstCorrect) {
            this.successSelections++;
            this.blockData[this.currentEx].Questions[this.currentQuestion].Resolvers[this.currentResolver].IsSuccess = true;
            this.normalState = 'success';
        }
        else {
            this.errorSelections++;
            this.normalState = 'error';
        }
        TimerObservable.create(1000).subscribe(() => { this.normalState = ''; this.currentResolver = -1; });
    }

    selectAbuse() {
        if(this.abuseState) return;
        let video = this.blockData[this.currentEx].Questions[this.currentQuestion].Resolvers[this.currentResolver].Videos[0];
        if(!video.IsFirstCorrect) {
            this.successSelections++;
            this.blockData[this.currentEx].Questions[this.currentQuestion].Resolvers[this.currentResolver].IsSuccess = true;
            this.abuseState = 'success';
        }
        else {
            this.errorSelections++;
            this.abuseState = 'error';
        }
        TimerObservable.create(1000).subscribe(() => { this.abuseState = ''; this.currentResolver = -1; });
    }

    isSuccess(question: any): boolean {
        return question.Resolvers.filter((x: any) => !x.IsSuccess).length == 0;
    }

    back() {
        if(this.displayResults)
            this.onBack.next();
        else {
            this.end = new Date();
            this._destroy$.next(true);
            this.displayResults = true;

            this.action.sendResult(
                this.datePipe.transform(this.start, 'dd.MM.yyyy HH:mm:ss') || '',
                this.datePipe.transform(this.end, 'dd.MM.yyyy HH:mm:ss') || '',
                this.programID,
                this.block.ID,
                this.correctness,
                this.rationality,
                this.totalPercentage,
                this.currentUser)
            .subscribe();
        }
    }
}
