import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ConclusionItem, ConclusionItemKeyMap } from '../../../../services/models/main.model';
import { AdminService } from '../../../../services/admin/admin.service';
import { checkNamedObject } from '../../pipes/object.pipe';

@Component({
    selector: 'conclusion-structure',
    templateUrl: './conclusion-structure.component.html',
    styleUrls: ['./conclusion-structure.component.css']
})
export class ConclusionStructureComponent implements OnInit, OnChanges {
    @Input() company: string;
    @Input() conclusionItem: any;

    @Output() onAddConclusionItem: EventEmitter<any> = new EventEmitter<any>();

    @Output() onViewDescendantConclusionItems: EventEmitter<any> = new EventEmitter<any>();

    @Output() onBack: EventEmitter<any> = new EventEmitter<any>();
    @Output() onEditConclusionItem: EventEmitter<any> = new EventEmitter<any>();
    @Output() onDeleteConclusionItem: EventEmitter<any> = new EventEmitter<any>();

    descendantConclusionItems: ConclusionItem[] = [];
    conclusionItemsKeyMap = ConclusionItemKeyMap;

    conclusionItemExtraActions: any[];

    constructor(private adminService: AdminService){
        
    }

    ngOnInit() {
        this.conclusionItemExtraActions = [{ key: 'viewDescendantConclusions', value: 'Структура...' }];
    }

    ngOnChanges(changes: SimpleChanges){
        if(changes.conclusionItem) {
            let conclusionItemType = checkNamedObject(this.conclusionItem) ? 6 : 7;
            this.adminService.getDescendants(this.conclusionItem.ID, conclusionItemType, 7, this.company)
            .subscribe((x) => this.descendantConclusionItems = x);
        }
    }

    addConclusionItem() {
        this.onAddConclusionItem.next();
    }

    onExtraAction(event: any){
        switch(event.key){
            case 'viewDescendantConclusions':
                this.onViewDescendantConclusionItems.next(event.data);
                break;
        }
    }

    back() {
        this.onBack.next();
    }

    editConclusionItem(data: any){
        this.onEditConclusionItem.next(data);
    }

    deleteConclusionItem(data: any){
        this.onDeleteConclusionItem.next(data);
    }
}