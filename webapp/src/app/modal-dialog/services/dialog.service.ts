import {
    ApplicationRef,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Injectable,
    Injector,
    Type
} from '@angular/core';
import {DialogComponent} from '../components/dialog/dialog.component';
import {DialogReference} from '../model/dialog-reference';
import {Subscription} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    constructor(private readonly componentFactoryResolver: ComponentFactoryResolver,
                private readonly injector: Injector,
                private readonly applicationRef: ApplicationRef) {
    }

    open(dialogComponent: Type<any>, data: any): DialogReference {
        console.log(this.injector);
        const componentFactory: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
        const dialogReference: DialogReference = new DialogReference(data);
        const dialogRefSubscription: Subscription = dialogReference.closed.subscribe(() => {
            this.applicationRef.detachView(componentRef.hostView);
            componentRef.destroy();
            dialogRefSubscription.unsubscribe();
        });
        const injector: Injector = Injector.create({
            parent: this.injector,
            providers: [
                {provide: DialogReference, useValue: dialogReference}
            ]
        });
        const componentRef: ComponentRef<any> = componentFactory.create(injector);
        componentRef.instance.content = dialogComponent;
        this.applicationRef.attachView(componentRef.hostView);
        document.body.appendChild((componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0]);
        return dialogReference;
    }

}
