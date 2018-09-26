import { Component, OnInit, Input, Output, OnChanges, SimpleChange, SimpleChanges, ViewChild, ElementRef, EventEmitter, SecurityContext, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Component({
    selector: 'media-presenter',
    templateUrl: './media-presenter.component.html',
    styleUrls: ['./media-presenter.component.css']
})
export class MediaPresenterComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() width: number = 400;
    @Input() height: number = 300;
    @Input() mediaSource: string;

    @Output() onPlay: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('video') video: ElementRef;
    @ViewChild('embed') embed: ElementRef;

    ready: boolean = false;

    isSwf(): boolean {
        return this.mediaSource != null && this.mediaSource.indexOf('.swf') >= 0;
    }

    toSwf(source: string): string {
        return source.replace("GetFile", "GetSwfFile");
    }

    constructor(private sanitizer: DomSanitizer) {

    }

    ngAfterViewInit() {
        this.byPass();
    }

    byPass() {
        if(this.isSwf()){
            let swfUrl = this.toSwf(this.mediaSource);
            this.sanitizer.bypassSecurityTrustResourceUrl(swfUrl);
            if(this.embed && this.embed.nativeElement){
                (this.embed.nativeElement as HTMLEmbedElement).src = swfUrl;
                this.onPlay.next();
            }
        }
    }

    ngOnInit() {
        
        let self = this;
        if(this.video) {
            (this.video.nativeElement as HTMLVideoElement).onplay = function() {
                self.onPlay.next();
            };
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.mediaSource) {
            this.mediaSource = changes.mediaSource.currentValue.replace('.avi', '.mp4');
            this.byPass();
            if(this.video)
                (this.video.nativeElement as HTMLVideoElement).load();
        }
    }
}