import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Program } from '../../../../services/models/main.model';

@Component({
    selector: 'program-form',
    templateUrl: './program-form.component.html',
    styleUrls: ['./program-form.component.css']
})
export class ProgramFormComponent implements OnInit {

    @Output() onFormCompleted: EventEmitter<Program> = new EventEmitter<Program>();
    @Output() onFormCancelled: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() program: Program;

    editMode: boolean;

    get valid(): boolean {
        return !!this.program && !!this.program.Name && !!this.program.LicenseKey;
    }

    keySelected(data: any){
        this.program.LicenseKey = data;
    }

    ngOnInit() {
        this.editMode = this.program != null;
        if(!this.program) {
            this.program = new Program();
        }
    }

    ok() {
        this.onFormCompleted.next(this.program);
    }

    cancel() {
        this.onFormCancelled.next();
    }
}