import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MainModule } from '../../../pages/main-page/main-page.component';
import { Resolver } from '../../../../services/models/main.model';
import { FileService } from '../../../../services/file/file.service';

@Component({
    selector: 'resolver-form',
    templateUrl: './resolver-form.component.html',
    styleUrls: ['./resolver-form.component.css']
})
export class ResolverFormComponent implements OnInit {
    @Input() parentID: number;
    @Input() company: string;

    @Output() onFormCompleted: EventEmitter<any> = new EventEmitter<any>();
    @Output() onFormCancelled: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() resolver: Resolver;

    editMode: boolean;
    get checked() {
        return this.resolver.Type == 1;
    }
    set checked(value: any){
        this.resolver.Content = '';
        this.preview = false;
        this.gallery = false;
        if(value)
            this.resolver.Type = 1;
        else
            this.resolver.Type = 0;
    }

    get valid(): boolean {
        return !!this.resolver.Content;
    }

    getImageUrl(image: string){
        return this.fileService.getImage(image, this.company);
    }

    gallery: boolean;
    preview: boolean;
    current: string;

    constructor(private fileService: FileService){

    }

    ngOnInit() {
        this.editMode = this.resolver != null;
        if(!this.editMode){
            this.resolver = new Resolver();
            this.resolver.Type = 0;
        }
    }

    ok() {
        this.onFormCompleted.next({ parentID: this.parentID, Resolver: this.resolver });
    }

    cancel() {
        this.onFormCancelled.next();
    }

    showGallery() {
        this.gallery = true;
        this.preview = false;
    }

    setCurrent() {
        this.gallery = false;
        this.preview = true;
        this.current = this.resolver.Content;
    }

    onGallerySelected(src: string) {
        this.resolver.Content = src;
        this.gallery = false;
        this.preview = false;
    }
}