import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Notification} from '../../model/notification';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

    @Input() notification: Notification;

    @Output() close: EventEmitter<Notification> = new EventEmitter<Notification>();

    closeNotification(): void {
        this.close.emit(this.notification);
    }

}
