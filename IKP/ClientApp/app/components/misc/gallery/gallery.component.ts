import { Component, Input, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { FileService } from '../../../services/file/file.service';

@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
    @Input() mode: number;
    @Input() selectionEnabled: boolean;
    @Input() company: string;

    data: string[];
    dataSlice: string[];
    lastIndex: number = 0;
    total: number = 0;

    @Output() onFileSelected: EventEmitter<string> = new EventEmitter<string>();

    get folder(): string {
        if(this.mode == 0) return 'videos';
        if(this.mode == 1) return 'images';
        return '';
    }

    constructor(private fileService: FileService){

    }

    ngOnInit() {
        switch(this.mode){
            case 0:
                this.fileService.getVideos(this.company)
                .take(1)
                .subscribe(data => { 
                    this.data = data;
                    this.total = data.length;
                    this.more10();
                });
                break;
            case 1:
                this.fileService.getImages(this.company)
                .take(1)
                .subscribe(data => { 
                    this.data = data;
                    this.total = data.length;
                    this.more10();
                });
                break;
            default:
                break;
        }
    }

    more10(){
        this.lastIndex = Math.min(this.lastIndex + 10, this.data.length);
        this.dataSlice = this.data.slice(0, this.lastIndex);
    }

    getVideoUrl(video: string){
        return this.fileService.getVideo(video, this.company);
    }

    getImageSrc(image: string){
        return this.fileService.getImage(image, this.company);
    }

    onFileUploadComplete(success: boolean){
        if(success) {
            window.alert('Загрузка файла успешно завершена');
            if(this.mode == 0){
                this.fileService.getVideos(this.company)
                .take(1)
                .subscribe(data => { 
                    this.data = data;
                    this.total = data.length;
                    this.lastIndex = 0;
                    this.more10();
                });
            }
            else if(this.mode == 1){
                this.fileService.getImages(this.company)
                .take(1)
                .subscribe(data => { 
                    this.data = data;
                    this.total = data.length;
                    this.lastIndex = 0;
                    this.more10();
                });
            }
        }
        else
            window.alert('Произошла ошибка при загрузке файла');
    }

    onSelected(fileName: string){
        this.onFileSelected.next(fileName);
    }
}