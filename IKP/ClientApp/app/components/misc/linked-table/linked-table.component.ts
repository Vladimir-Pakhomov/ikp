import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'linked-table',
    templateUrl: './linked-table.component.html',
    styleUrls: ['./linked-table.component.css']
})
export class LinkedTableComponent implements OnInit {
    @Input() data: any[];
    @Input() title: string;
    @Input() keyMap: any;

    /* actions */
    @Input() addEnabled: boolean = true;
    @Input() editEnabled: boolean = true;
    @Input() deleteEnabled: boolean = true;

    @Input() extraActions: any[] = [];

    @Output() onAdd: EventEmitter<any> = new EventEmitter<any>();
    @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
    @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

    @Output() onExtraAction: EventEmitter<any> = new EventEmitter<any>();

    keys: string[];
    values: string[];

    ngOnInit(){
        this.keys = Object.keys(this.keyMap);
        this.values = this.keys.map(x => this.keyMap[x]);
    }

    add() {
        this.onAdd.next();
    }

    edit(data: any){
        this.onEdit.next(data);
    }

    delete(data: any){
        this.onDelete.next(data);
    }

    extra(key: string, data: any){
        this.onExtraAction.next({
            key: key,
            data: data
        });
    }
}