import { Component, OnInit, Input, Output, OnChanges, SimpleChange, SimpleChanges, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Component({
    selector: 'media-presenter',
    templateUrl: './media-presenter.component.html',
    styleUrls: ['./media-presenter.component.css']
})
export class MediaPresenterComponent implements OnInit, OnChanges {
    @Input() width: number = 400;
    @Input() height: number = 300;
    @Input() mediaSource: string;

    @Output() onPlay: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('video') video: ElementRef;

    ready: boolean = false;

    mediaSourceSecure() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.mediaSource);
    }

    constructor(private sanitizer: DomSanitizer) {

    }

    ngOnInit() {
        let self = this;
        (this.video.nativeElement as HTMLVideoElement).onplay = function() {
            self.onPlay.next();
        };
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.mediaSource) {
            this.mediaSource = changes.mediaSource.currentValue.replace('.avi', '.mp4');
            (this.video.nativeElement as HTMLVideoElement).load();
        }
    }
}