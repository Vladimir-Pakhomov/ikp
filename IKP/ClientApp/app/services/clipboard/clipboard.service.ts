import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionService } from '../actions/action.service';
import { AdminService } from '../admin/admin.service';
import { Exersize } from '../models/main.model';
import { Subject } from 'rxjs';

@Injectable()
export class ClipboardService {
    private currentEx: any;

    constructor(private action: ActionService) {

    }

    public canPasteChanged: Subject<boolean> = new Subject<boolean>();

    copy(ex: Exersize) {
        this.currentEx = Object.assign({}, ex);
        this.canPasteChanged.next(true);
    }

    drop() {
        this.currentEx = null;
        this.canPasteChanged.next(false);
    }

    paste(idTargetBlock: number, blockType: string, company: string): Observable<number> {
        return this.action.pasteExersize(idTargetBlock, blockType, this.currentEx.ID, company)
        .do(e => this.drop());
    }

    request() {
        this.canPasteChanged.next(this.currentEx != null);
    }
}