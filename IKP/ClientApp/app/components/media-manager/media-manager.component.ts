import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FileService } from '../../services/file/file.service';

@Component({
    selector: 'media-manager',
    templateUrl: './media-manager.component.html',
    styleUrls: ['./media-manager.component.css']
})
export class MediaManagerComponent implements OnInit {
    @Input() company: string;

    currentMode: number;

    constructor() {

    }

    ngOnInit() {

    }

    modeChanged(value: number){
        this.currentMode = value;
    }
}