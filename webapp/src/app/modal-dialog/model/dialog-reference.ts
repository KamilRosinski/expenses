import {Observable, Subject} from 'rxjs';

export class DialogReference {

    private readonly closedSubject: Subject<any> = new Subject<any>();

    get closed(): Observable<any> {
        return this.closedSubject.asObservable();
    }

    constructor(public readonly data?: any) {
    }

    close(data?: any): void {
        this.closedSubject.next(data);
        this.closedSubject.complete();
    }

}
