export class NotificationManager {
  private container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'notification';
    document.body.appendChild(this.container);
  }

  public show(message: string, type: 'success' | 'error' = 'success'): void {
    this.container.textContent = message;
    this.container.style.backgroundColor = type === 'success' ? 'var(--success-color)' : 'var(--error-color)';
    this.container.classList.add('show');

    setTimeout(() => {
      this.container.classList.remove('show');
    }, 3000);
  }
}