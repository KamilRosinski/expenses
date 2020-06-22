import {EventEmitter} from '@angular/core';

export class DialogReference {

    readonly closed: EventEmitter<any> = new EventEmitter<any>();

    constructor(public readonly data?: any) {
    }

    close(data?: any): void {
        this.closed.emit(data);
    }

}
