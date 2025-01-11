import { Injectable } from '@angular/core';
import * as SignalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class HubService {

  private hubConnection?: SignalR.HubConnection;

  initializeSignalR (username: string): void {
    this.hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl(`http://localhost:5274/gameHub?username=${encodeURIComponent(username)}`)
      .build();

    this.hubConnection.start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.error('Error while starting SignalR connection: ' + err));
  }

  public on (event: string, callback: (...args: any[]) => void): void {
    this.hubConnection?.on(event, callback);
  }

  public off (event: string, callback: (...args: any[]) => void): void {
    this.hubConnection?.off(event, callback);
  }

  public send (event: string, ...args: any[]): void {
    this.hubConnection?.invoke(event, ...args)
      .catch(err =>
        console.error('Error while sending SignalR message: ' + err)
      );
  }
}