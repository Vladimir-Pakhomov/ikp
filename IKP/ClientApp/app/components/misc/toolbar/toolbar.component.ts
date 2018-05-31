import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
    @Input() config: ButtonConfig[];
    @Output() onButtonClick = new EventEmitter<number>();
    ngOnInit() {

    }

    clickButton(index: number) {
        this.onButtonClick.next(index);
    }
}

export class ButtonConfig {
    index: number;
    use: boolean;
    text: string;
    class: string;
}