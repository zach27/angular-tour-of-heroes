import { Component } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css'],
})
export class MessagesComponent {
    constructor(private readonly messageService: MessageService) {}

    public clearMessages(): void {
        this.messageService.clear();
    }

    public get messages(): string[] {
        return this.messageService.messages;
    }
}
