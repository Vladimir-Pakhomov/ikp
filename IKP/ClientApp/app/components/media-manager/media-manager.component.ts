import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FileService } from '../../services/file/file.service';

@Component({
    selector: 'media-manager',
    templateUrl: './media-manager.component.html',
    styleUrls: ['./media-manager.component.css']
})
export class MediaManagerComponent implements OnInit {
    @Input() company: string;

    get folder(): string {
        if(this.currentMode == 'Video') return 'videos';
        if(this.currentMode == 'Image') return 'images';
        return '';
    }

    get action(): string {
        return this.fileService.getAction();
    }

    currentMode: string = '';

    lastIndex: number = 0;
    totalCount: number = 0;

    videos: string[];
    videosSlice: string[];
    videosLoaded: boolean = false;

    images: string[];
    imagesLoaded: boolean = false;

    constructor(private fileService: FileService) {

    }

    ngOnInit() {

    }

    modeChanged(value: string){
        if(value == this.currentMode) return;
        if(value == 'Video'){
            if(!this.videosLoaded){
                this.fileService.getVideos(this.company)
                .subscribe(data => { 
                    this.videos = data;
                    this.totalCount = this.videos.length;
                    this.more10();
                    this.currentMode = value;
                    this.videosLoaded = true;
                });
            }
            else this.currentMode = value;
        }
        else if(value == 'Image'){
            if(!this.imagesLoaded){
                this.fileService.getImages(this.company)
                .subscribe(data => { 
                    this.images = data; 
                    this.currentMode = value;
                    this.imagesLoaded = true;
                });
            }
            else this.currentMode = value;
        }
    }

    getVideoUrl(video: string){
        return this.fileService.getVideo(video, this.company);
    }

    getImageSrc(image: string){
        return this.fileService.getImage(image, this.company);
    }

    more10() {
        this.lastIndex = Math.min(this.lastIndex + 10, this.totalCount);
        this.videosSlice = this.videos.slice(0, this.lastIndex);
    }
}