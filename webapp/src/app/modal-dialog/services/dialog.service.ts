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
import {ModalDialogModule} from '../modal-dialog.module';

@Injectable({
    providedIn: ModalDialogModule
})
export class DialogService {

    constructor(private readonly componentFactoryResolver: ComponentFactoryResolver,
                private readonly injector: Injector,
                private readonly applicationRef: ApplicationRef) {
    }

    open(dialogComponent: Type<any>, data?: any): DialogReference {
        const componentFactory: ComponentFactory<DialogComponent> = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
        const dialogReference: DialogReference = new DialogReference(data);
        dialogReference.closed.subscribe(() => {
            this.applicationRef.detachView(componentRef.hostView);
            componentRef.destroy();
        });
        const injector: Injector = Injector.create({
            parent: this.injector,
            providers: [
                {provide: DialogReference, useValue: dialogReference}
            ]
        });
        const componentRef: ComponentRef<DialogComponent> = componentFactory.create(injector);
        componentRef.instance.content = dialogComponent;
        this.applicationRef.attachView(componentRef.hostView);
        document.body.appendChild((componentRef.hostView as EmbeddedViewRef<DialogComponent>).rootNodes[0]);
        return dialogReference;
    }

}
