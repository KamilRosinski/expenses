import {Component} from '@angular/core';
import {Notification} from '../../model/notification';

@Component({
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

    notifications: Notification[] = [];

    closeNotification(closedNotification: Notification) {
        this.notifications = this.notifications.filter((notification: Notification) => notification !== closedNotification);
    }

}
