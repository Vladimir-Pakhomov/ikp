import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'linked-table',
    templateUrl: './linked-table.component.html',
    styleUrls: ['./linked-table.component.css']
})
export class LinkedTableComponent implements OnInit {
    @Input() data: any[];
    @Input() title: string;
    @Input() keyMap: any;

    keys: string[];
    values: string[];

    ngOnInit(){
        this.keys = Object.keys(this.keyMap);
        this.values = this.keys.map(x => this.keyMap[x]);
    }
}