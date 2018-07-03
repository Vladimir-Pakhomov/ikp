import { Component, Input, Output, ViewChild, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { FileService } from '../../../services/file/file.service';

@Component({
    selector: 'file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
    @Input() folder: string;
    @Input() company: string;

    @ViewChild('fileInput') fileInput: ElementRef;

    @Output() onComplete: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private fileService: FileService){

    }

    ngOnInit() {

    }

    upload() {
        let fileBrowser = this.fileInput.nativeElement;
        let formData = new FormData();
        formData.append('uploadedFile', fileBrowser.files[0]);
        formData.append('folder', this.folder);
        formData.append('company', this.company);
        this.fileService.upload(formData)
        .subscribe(
            () => this.onComplete.next(true),
            () => this.onComplete.next(false)
        );
    }
}