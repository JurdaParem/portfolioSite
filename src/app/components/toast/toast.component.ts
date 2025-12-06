import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ToastConfig,ToastService } from './services/toast.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements AfterViewInit, OnDestroy {
  @ViewChild('toastElement') toastElement!: ElementRef;
  toastConfig: ToastConfig | null = null;
  private subscription: Subscription | null = null;
  private hideTimer: any = null;
  private isHovered = false;
  private mouseEnterHandler?: () => void;
  private mouseLeaveHandler?: () => void;

  constructor(
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    // Subscription moved here, but no need to check toastElement immediately
    this.subscription = this.toastService.toastState$.subscribe(config => {
      this.toastConfig = config;
      this.cdr.detectChanges(); // Ensure template updates
      if (config && this.toastElement) {
        // Clear any existing timer and remove old event listeners
        this.clearHideTimer();
        this.removeEventListeners();
        
        // Reset animation classes
        this.toastElement.nativeElement.classList.remove('animate-in', 'animate-out');
        
        // Initialize Bootstrap toast with autohide disabled for manual control
        const toast = new bootstrap.Toast(this.toastElement.nativeElement, {
          autohide: false,
          animation: false, // Disable Bootstrap's animation, we'll use our custom CSS animations
        });
        
        // Add fade-in animation
        this.toastElement.nativeElement.classList.add('animate-in');
        
        toast.show();
        
        // Set up custom auto-hide timer if duration is specified
        if (config.duration && config.duration > 0) {
          this.startHideTimer(config.duration);
        }
        
        // Add hover event listeners to pause/resume auto-dismiss
        this.addEventListeners();
        
        this.toastElement.nativeElement.addEventListener('hidden.bs.toast', () => {
          this.toastService.hide();
        }, { once: true }); // Use { once: true } to avoid multiple listeners
      } else if (config && !this.toastElement) {
        console.warn('toastElement is not available yet');
      }
    });
  }

  private startHideTimer(duration: number): void {
    this.clearHideTimer();
    this.hideTimer = setTimeout(() => {
      if (!this.isHovered) {
        this.closeToast();
      }
    }, duration);
  }

  private clearHideTimer(): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }

  private addEventListeners(): void {
    if (!this.toastElement?.nativeElement) return;
    
    this.mouseEnterHandler = () => {
      this.isHovered = true;
      this.clearHideTimer();
    };
    
    this.mouseLeaveHandler = () => {
      this.isHovered = false;
      if (this.toastConfig?.duration && this.toastConfig.duration > 0) {
        this.startHideTimer(this.toastConfig.duration);
      }
    };
    
    this.toastElement.nativeElement.addEventListener('mouseenter', this.mouseEnterHandler);
    this.toastElement.nativeElement.addEventListener('mouseleave', this.mouseLeaveHandler);
  }

  private removeEventListeners(): void {
    if (!this.toastElement?.nativeElement) return;
    
    if (this.mouseEnterHandler) {
      this.toastElement.nativeElement.removeEventListener('mouseenter', this.mouseEnterHandler);
      this.mouseEnterHandler = undefined;
    }
    
    if (this.mouseLeaveHandler) {
      this.toastElement.nativeElement.removeEventListener('mouseleave', this.mouseLeaveHandler);
      this.mouseLeaveHandler = undefined;
    }
  }

  closeToast(): void {
    if (this.toastElement) {
      // Add fade-out animation
      this.toastElement.nativeElement.classList.remove('animate-in');
      this.toastElement.nativeElement.classList.add('animate-out');
      
      // Wait for animation to complete before actually hiding
      setTimeout(() => {
        const toast = bootstrap.Toast.getInstance(this.toastElement.nativeElement);
        toast?.hide();
        this.toastService.hide();
      }, 200); // 200ms matches the fade-out animation duration
    } else {
      this.toastService.hide();
    }
  }

  onActionClick(): void {
    if (this.toastConfig?.action) {
      this.toastConfig.action();
      this.closeToast(); // Close toast after action is executed
    }
  }

  ngOnDestroy(): void {
    this.clearHideTimer();
    this.removeEventListeners();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}