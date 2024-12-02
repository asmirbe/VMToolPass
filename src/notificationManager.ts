export class NotificationManager {
  private container: HTMLDivElement;
  private timeout: number | null = null;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'notification';
    document.body.appendChild(this.container);
  }

  public show(message: string, type: 'success' | 'error' = 'success'): void {
    // Clear any existing timeout
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.container.classList.remove('show');
      
      // Small delay to reset animation
      setTimeout(() => {
        this.displayNotification(message, type);
      }, 100);
    } else {
      this.displayNotification(message, type);
    }
  }

  private displayNotification(message: string, type: 'success' | 'error'): void {
    this.container.textContent = message;
    this.container.className = `notification ${type}`;
    
    // Force a reflow to restart animation
    void this.container.offsetWidth;
    
    this.container.classList.add('show');

    this.timeout = window.setTimeout(() => {
      this.container.classList.remove('show');
      this.timeout = null;
    }, 3000);
  }
}
