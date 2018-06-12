import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminService } from '../../../../services/admin/admin.service';
import { Resolver, Video, VideoKeyMap } from '../../../../services/models/main.model';

@Component({
    selector: 'resolver-videos',
    templateUrl: './resolver-videos.component.html',
    styleUrls: ['./resolver-videos.component.css']
})
export class ResolverVideosComponent implements OnInit {
    @Input() company: string;
    @Input() resolver: Resolver;

    @Output() onAddVideo: EventEmitter<any> = new EventEmitter<any>();

    @Output() onBack: EventEmitter<any> = new EventEmitter<any>();

    descendantVideos: Video[] = [];
    videosKeyMap = VideoKeyMap;

    constructor(private adminService: AdminService){
        
    }

    ngOnInit() {
        this.adminService.getDescendants(this.resolver.ID, 4, 5, this.company)
        .subscribe((x) => this.descendantVideos = x);
    }

    addVideo() {
        this.onAddVideo.next();
    }

    back() {
        this.onBack.next();
    }
}