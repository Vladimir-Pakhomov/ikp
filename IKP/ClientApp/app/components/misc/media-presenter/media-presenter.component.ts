import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Component({
    selector: 'media-presenter',
    templateUrl: './media-presenter.component.html',
    styleUrls: ['./media-presenter.component.css']
})
export class MediaPresenterComponent {
    @Input() mediaSource: SafeResourceUrl;
    playEnabled: false;
    pauseEnabled: false;
    stopEnabled: false;

    @ViewChild('video') video: ElementRef;
    @ViewChild('file') file: ElementRef;

    constructor(private sanitizer: DomSanitizer) {

    }
}