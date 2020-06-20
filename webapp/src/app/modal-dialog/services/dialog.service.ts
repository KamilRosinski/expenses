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

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private componentRef: ComponentRef<any>;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver,
              private readonly injector: Injector,
              private readonly applicationRef: ApplicationRef) {
  }

  open(dialogComponent: Type<any>, data: any): ComponentRef<any> {
    const componentFactory: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    this.componentRef = componentFactory.create(this.injector);
    this.applicationRef.attachView(this.componentRef.hostView);
    document.body.appendChild((this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0]);
    return undefined;
  }

  close(): void {
    this.applicationRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }

}
