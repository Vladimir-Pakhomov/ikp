import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User } from '../../services/models/main.model';
import { LoginService } from '../../services/login/login.service';
import { Block } from '../../services/models/main.model';
import { AdminService } from '../../services/admin/admin.service';
import { FileService } from '../../services/file/file.service';

@Component({
    selector: 'execution',
    templateUrl: './execution.component.html',
    styleUrls: ['./execution.component.css']
})
export class ExecutionComponent implements OnInit, OnDestroy {
    @Input() company: string;
    @Input() block: Block;

    @Output() onBack: EventEmitter<any> = new EventEmitter<any>();

    blockData: any;

    currentEx: number = -1;
    currentQuestion: number = -1;
    currentResolver: number = -1;

    media1: string = '';
    media2: string = '';

    countdown = {
        days: "0",
        hours: "0",
        minutes: "0",
        seconds: "0"
    };

    constructor(private adminService: AdminService, private fileService: FileService) {

    }

    _destroy$: Subject<boolean> = new Subject<boolean>();

    makeDigitString(value: number): string{
        if(value > 10)
            return value.toString();
        else return `0${value}`;
    }

    ngOnInit() {
        this.adminService.getBlockData(this.block.ID, this.company)
        .subscribe(x => { 
            this.blockData = x; 
            this.currentEx = 0;
            Observable.timer(0, 1000).takeUntil(this._destroy$).subscribe(i => {
                this.countdown.seconds = this.makeDigitString(i%60);
                this.countdown.minutes = this.makeDigitString(Math.floor(i / 60) % 60);
                this.countdown.hours = this.makeDigitString(Math.floor(i / 3600) % 24);
                this.countdown.days = this.makeDigitString(Math.floor(i / (3600 * 24)));
            });
        });
    }

    resolverSelected() {
        this.media1 =
                this.fileService.getVideo(
                this.blockData[this.currentEx].Questions[this.currentQuestion].Resolvers[this.currentResolver].Videos[0].Content1,
                this.company);
            if(!this.blockData[this.currentEx].Questions[this.currentQuestion].Resolvers[this.currentResolver].Videos[0].Content2)
            {
                this.media2 = '';
            }
            else {
                this.media2 = this.fileService.getVideo(
                this.blockData[this.currentEx].Questions[this.currentQuestion].Resolvers[this.currentResolver].Videos[0].Content2,
                this.company);
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

    back() {
        this.onBack.next();
    }
}
