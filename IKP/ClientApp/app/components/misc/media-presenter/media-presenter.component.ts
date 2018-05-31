import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Component({
    selector: 'media-presenter',
    templateUrl: './media-presenter.component.html',
    styleUrls: ['./media-presenter.component.css']
})
export class MediaPresenterComponent {
    mediaSource: SafeResourceUrl;
    playEnabled: false;
    pauseEnabled: false;
    stopEnabled: false;

    @ViewChild('video') video: ElementRef;
    @ViewChild('file') file: ElementRef;

    constructor(private sanitizer: DomSanitizer) {

    }

    play() {

    }

    pause() {

    }

    stop() {

    }

    open() {
        (this.file.nativeElement as HTMLElement).click();
    }

    fileSelected() {
        //this.mediaSource = this.sanitizer.bypassSecurityTrustResourceUrl((this.file.nativeElement as HTMLInputElement).value);
        this.mediaSource = "/dist/bb.mp4";
    }
}