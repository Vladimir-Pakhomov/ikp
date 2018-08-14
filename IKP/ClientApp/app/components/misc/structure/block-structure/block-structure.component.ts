import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Block, Exersize, ExersizeKeyMap, Program, UserRole, NamedObjectKeyMap } from '../../../../services/models/main.model';
import { AdminService } from '../../../../services/admin/admin.service';
import { checkProgram } from '../../pipes/object.pipe';
import { ClipboardService } from '../../../../services/clipboard/clipboard.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'block-structure',
    templateUrl: './block-structure.component.html',
    styleUrls: ['./block-structure.component.css']
})
export class BlockStructureComponent implements OnInit, OnChanges, OnDestroy {
    @Input() role: UserRole;
    @Input() company: string;
    @Input() block: Block;

    @Output() onAddBlock: EventEmitter<any> = new EventEmitter<any>();
    @Output() onAddExersize: EventEmitter<any> = new EventEmitter<any>();

    @Output() onViewDescendantBlock: EventEmitter<any> = new EventEmitter<any>();
    @Output() onViewDescendantExersize: EventEmitter<any> = new EventEmitter<any>();
    @Output() onStartExecution: EventEmitter<any> = new EventEmitter<any>();

    @Output() onBack: EventEmitter<any> = new EventEmitter<any>();
    @Output() onEditBlock: EventEmitter<any> = new EventEmitter<any>();
    @Output() onDeleteBlock: EventEmitter<any> = new EventEmitter<any>();
    @Output() onEditExersize: EventEmitter<any> = new EventEmitter<any>();
    @Output() onDeleteExersize: EventEmitter<any> = new EventEmitter<any>();

    descendantBlocks: Block[] = [];
    blocksKeyMap = NamedObjectKeyMap;

    descendantExersizes: Exersize[] = [];
    exersizesKeyMap = ExersizeKeyMap;

    blockExtraActions: any; 

    exersizeExtraActions: any[] = [];

    topActions: any[] = [];

    private _destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private adminService: AdminService, public clip: ClipboardService){

    }

    ngOnInit() {
        this.blockExtraActions = [{ key: 'viewBlockStructure', value: 'Структура...' }];
        if(this.role == 0) {
            this.exersizeExtraActions.push({ key: 'viewQuestions', value: 'Состав упражнения..' });
            this.exersizeExtraActions.push({ key: 'copyEx', value: 'Копировать' });
            this.clip.canPasteChanged.takeUntil(this._destroy$).subscribe(canPaste => {
                if(canPaste) {
                    if(this.topActions.map(ta => ta.key).indexOf('pasteEx') < 0)
                        this.topActions.push({ key: 'pasteEx', value: 'Вставить'});
                    if(this.topActions.map(ta => ta.key).indexOf('dropEx') < 0)
                        this.topActions.push({ key: 'dropEx', value: 'Очистить буфер'});
                }
                else {
                    this.topActions = this.topActions.filter(x => x.key !== 'pasteEx' && x.key !== 'dropEx');
                }
            });
            this.clip.request();
        }
        if(this.role == 2)  {
            this.topActions.push({ key: 'startBlockExecution', value: 'Начать выполнение!' });
        }
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.block) {
            this.refresh();    
        }
    }

    private refresh() {
        let parentType = checkProgram(this.block) ? 0 : 1;
        this.adminService.getDescendants(this.block.ID, parentType, 1, this.company)
        .subscribe((x) => this.descendantBlocks = x);
        this.adminService.getDescendants(this.block.ID, parentType, 2, this.company)
        .subscribe((x) => this.descendantExersizes = x);
    }

    addDescBlock(){
        this.onAddBlock.next(this.block);
    }

    addDescExersize(){
        this.onAddExersize.next(this.block);
    }

    onExtraAction(event: any) {
        switch(event.key){
            case 'viewBlockStructure':
                this.onViewDescendantBlock.next(event.data);
                break;
            case 'viewQuestions':
                this.onViewDescendantExersize.next(event.data);
                break;
            case 'startBlockExecution':
                this.onStartExecution.next(event.data);
                break;
            case 'copyEx':
                this.clip.copy(event.data);
                break;
        }
    }

    onTopAction(event: any) {
        switch(event){
            case 'startBlockExecution':
                this.onStartExecution.next(this.block);
                break;
            case 'dropEx':
                this.clip.drop();
                break;
            case 'pasteEx':
                this.clip.paste(this.block.ID, checkProgram(this.block) ? '0' : '1', this.company)
                .subscribe(() => this.refresh());
                break;
        }
    }

    back() {
        this.onBack.next();
    }

    editDescBlock(data: any){
        this.onEditBlock.next(data);
    }

    editDescExersize(data: any){
        this.onEditExersize.next(data);
    }

    deleteDescBlock(data: any){
        this.onDeleteBlock.next(data);
    }

    deleteDescExersize(data: any){
        this.onDeleteExersize.next(data);
    }
}