import { Component, input, SimpleChanges, ViewContainerRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.scss'
})
export class ErrorModalComponent {

  constructor (private viewContainerRef: ViewContainerRef) {
  }

  error = input.required<HttpErrorResponse>();

  ngOnChanges (changes: SimpleChanges) {
    if (changes['error'] && this.error()) {
      this.openModal();
    }
  }

  openModal () {
    const modal = document.getElementById('login-form__errorModal') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  closeModal () {
    const modal = document.getElementById('login-form__errorModal') as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
    this.viewContainerRef.clear();
  }

  protected readonly JSON = JSON;
}
