import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {NotificationComponent} from './components/notification/notification.component';

@NgModule({
    declarations: [
        NotificationsComponent,
        NotificationComponent
    ],
    imports: [
        CommonModule
    ]
})
export class NotificationsModule {
}