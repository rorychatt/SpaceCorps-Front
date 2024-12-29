import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-users-editor',
  templateUrl: './users-editor.component.html',
  styleUrls: ['./users-editor.component.scss'],
  imports: [FormsModule, NgFor],
  standalone: true,
})
export class UsersEditorComponent {
  users = [
    { id: 1, name: 'Alice', cats: 100, thulium: 200 },
    { id: 2, name: 'Bob', cats: 150, thulium: 250 },
  ];

  command: string = '';
  commandHistory: string[] = [];

  constructor(private http: HttpClient) {}

  private getCurrentTime(): string {
    const now = new Date();
    return `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
  }

  executeCommand() {
    const timestamp = this.getCurrentTime();

    this.commandHistory.unshift(`${timestamp} ${this.command}`);
    
    if (this.commandHistory.length > 10) {
      this.commandHistory.pop();
    }

    const commandParts = this.command.split(' ');

    if (commandParts.length === 5 && commandParts[0] === 'user' && commandParts[2] === 'set') {
      const username = commandParts[1];
      const resource = commandParts[3];
      const amount = parseInt(commandParts[4], 10);

      if (!isNaN(amount)) {
        this.http.post('/api/command', { username, resource, amount })
          .pipe(
            catchError(error => {
              this.commandHistory.unshift(`${timestamp} Error: ${error.message}`);
              return of(null);
            })
          )
          .subscribe(response => {
            if (response) {
              this.commandHistory.unshift(`${timestamp} Success: ${JSON.stringify(response)}`);
            }
          });
      } else {
        this.commandHistory.unshift(`${timestamp} Invalid amount: ${commandParts[4]}`);
      }
    } else {
      this.commandHistory.unshift(`${timestamp} Invalid command: ${this.command}`);
    }

    this.command = '';
  }
}