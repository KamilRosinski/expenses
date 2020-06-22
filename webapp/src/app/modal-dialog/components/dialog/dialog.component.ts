import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    OnDestroy,
    Type,
    ViewChild
} from '@angular/core';
import {InsertionDirective} from '../../directives/insertion.directive';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements AfterViewInit, OnDestroy {

    content: Type<any>;

    @ViewChild(InsertionDirective, {static: true}) insertionPoint: InsertionDirective;

    private componentRef: ComponentRef<any>;

    constructor(private readonly componentFactoryResolver: ComponentFactoryResolver,
                private readonly changeDetectorRef: ChangeDetectorRef) {
    }

    ngAfterViewInit(): void {
        const componentFactory: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(this.content);
        this.insertionPoint.viewContainerRef.clear();
        this.componentRef = this.insertionPoint.viewContainerRef.createComponent(componentFactory);
        this.changeDetectorRef.detectChanges();
    }

    ngOnDestroy(): void {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }

}
