import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ToastConfig {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number; // Duration in milliseconds
  actionText?: string; // Text for action button
  action?: () => void; // Action to execute when button is clicked
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastConfig | null>(null);
  toastState$: Observable<ToastConfig | null> = this.toastSubject.asObservable();

  constructor() { }

  // Show toast notification
  show(message: string, type: 'success' | 'error' | 'info' | 'warning', duration: number = 2500): void {
    // Defer emission to next event loop to avoid change detection issues
    setTimeout(() => {
      this.toastSubject.next({ message, type, duration });
    }, 0);
  }

  // Show toast notification with action button
  showWithAction(message: string, type: 'success' | 'error' | 'info' | 'warning', duration: number = 2500, actionText?: string, action?: () => void): void {
    // Defer emission to next event loop to avoid change detection issues
    setTimeout(() => {
      this.toastSubject.next({ message, type, duration, actionText, action });
    }, 0);
  }

  // Hide the current toast
  hide(): void {
    this.toastSubject.next(null);
  }
}