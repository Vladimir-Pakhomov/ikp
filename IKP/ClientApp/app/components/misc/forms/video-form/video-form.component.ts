import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MainModule } from '../../../pages/main-page/main-page.component';
import { Video } from '../../../../services/models/main.model';

@Component({
    selector: 'video-form',
    templateUrl: './video-form.component.html',
    styleUrls: ['./video-form.component.css']
})
export class VideoFormComponent implements OnInit {
    @Input() parentID: number;

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
}