import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MainModule } from '../../pages/main-page/main-page.component';
import { UserRole, User } from '../../../services/models/main.model';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
    selector: 'rt',
    templateUrl: './rt.component.html',
    styleUrls: ['./rt.component.css']
})
export class RtComponent implements OnInit {
    @Input() level: any[];
    @Input() displayProperty: string = 'Name';
    @Input() childrenProperty: string = 'Children';
    @Input() isExpanded: boolean = false;
    @Input() correctnessProperty: string = 'IsCorrect';

    @Output() onItemSelected: EventEmitter<any> = new EventEmitter<any>();

    hblocks: HBlock[] = [];

    currentIndex: number = 0;

    constructor() { }

    private recursion(level: any[]) {
        for(let i=0; i<level.length; i++){
            if(level[i][this.childrenProperty].length)
            {
                var values = [];
                for(let j=0; j<level[i][this.childrenProperty].length; j++){
                    if(level[i][this.childrenProperty][j][this.childrenProperty].length == 0)
                        values.push(level[i][this.childrenProperty][j]);
                    else
                        this.recursion(level[i][this.childrenProperty]);
                }
                if(values.length > 0) {
                    this.hblocks.push({
                        key: level[i][this.displayProperty],
                        values: values,
                        levelIndex: this.hblocks.length
                    });
                }
            }
        }
    }

    ngOnInit() {
        this.recursion(this.level);
    }

    itemSelected(item: any){
        if(!item.isSuccess && item[this.correctnessProperty])
            this.currentIndex++;
        this.onItemSelected.next(item);
    }

    isBlockSuccess(block: HBlock) {
        return block.values.filter((x: any) => !!x[this.correctnessProperty] && !x.isSuccess).length == 0;
    }

    isDisplayNotNeeded(hblock: HBlock, item: any): boolean{
        // Display not needed if item is incorrect and all its correct brothers are already succeeded
        return !item[this.correctnessProperty] && hblock.values.filter(x => !!x[this.correctnessProperty] && !x.isSuccess).length == 0;
    }
}

class HBlock {
    key: string;
    values: any[];
    levelIndex: number;
}