import {
    ApplicationRef,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Injectable,
    Injector,
    OnDestroy
} from '@angular/core';
import {NotificationsComponent} from '../components/notifications/notifications.component';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService implements OnDestroy {

    private notificationsRef: ComponentRef<NotificationsComponent>;

    constructor(private readonly componentFactoryResolver: ComponentFactoryResolver,
                private readonly injector: Injector,
                private readonly applicationRef: ApplicationRef) {

        const componentFactory: ComponentFactory<NotificationsComponent> = this.componentFactoryResolver.resolveComponentFactory(NotificationsComponent);
        this.notificationsRef = componentFactory.create(this.injector);
        this.applicationRef.attachView(this.notificationsRef.hostView);
        document.body.appendChild((this.notificationsRef.hostView as EmbeddedViewRef<NotificationsComponent>).rootNodes[0]);
    }

    ngOnDestroy(): void {
        this.applicationRef.detachView(this.notificationsRef.hostView);
        this.notificationsRef.destroy();
    }

    show(message: string): void {
        this.notificationsRef.instance.notifications.push({message});
    }

}
