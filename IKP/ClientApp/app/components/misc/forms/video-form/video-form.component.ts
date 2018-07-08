import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MainModule } from '../../../pages/main-page/main-page.component';
import { Video } from '../../../../services/models/main.model';
import { FileService } from '../../../../services/file/file.service';

@Component({
    selector: 'video-form',
    templateUrl: './video-form.component.html',
    styleUrls: ['./video-form.component.css']
})
export class VideoFormComponent implements OnInit {
    @Input() parentID: number;
    @Input() company: string;

    @Output() onFormCompleted: EventEmitter<any> = new EventEmitter<any>();
    @Output() onFormCancelled: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() video: Video;

    editMode: boolean;

    playbackTypeSelectedIndex: number;

    get checked(): boolean {
        return this.video.IsFirstCorrect;
    }

    set checked(value: boolean) {
        this.video.IsFirstCorrect = value;
    }

    get valid(): boolean {
        return !!this.video.Content1 && !!this.video.PlaybackType;
    }

    getVideoUrl(video: string){
        return this.fileService.getVideo(video, this.company);
    }

    showGallery: boolean;
    gallery1: boolean;
    gallery2: boolean;
    preview: boolean;
    current: string;

    constructor(private fileService: FileService){

    }

    ngOnInit() {
        this.editMode = this.video != null;
        if(!this.editMode){
            this.video = new Video();
            this.video.IsFirstCorrect = false;
            this.video.Content2 = '';
        }
    }

    ok() {
        this.onFormCompleted.next({ parentID: this.parentID, Video: this.video });
    }

    cancel() {
        this.onFormCancelled.next();
    }

    onPlaybackTypeSelected() {
        this.video.PlaybackType = this.playbackTypeSelectedIndex;
    }

    showG1() {
        this.showGallery = true;
        this.gallery1 = true;
        this.gallery2 = false;
        this.preview = false;
    }

    setCurrent1() {
        this.current = this.video.Content1;
        this.preview = true;
        this.showGallery = false;
    }

    showG2() {
        this.showGallery = true;
        this.gallery1 = false;
        this.gallery2 = true;
        this.preview = false;
    }

    setCurrent2() {
        this.current = this.video.Content2;
        this.preview = true;
        this.showGallery = false;
    }

    onGallery1Selected(src: string){
        this.video.Content1 = src;
        this.showGallery = false;
        this.gallery1 = false;
        this.preview = false;
    }

    onGallery2Selected(src: string){
        this.video.Content2 = src;
        this.showGallery = false;
        this.gallery2 = false;
        this.preview = false;
    }
}