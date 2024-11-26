import { PasswordGenerator } from './passwordGenerator';
import { NotificationManager } from './notificationManager';
import { TimeFormatter } from './timeFormatter';

class App {
  private passwordGenerator: PasswordGenerator;
  private notificationManager: NotificationManager;
  private timeFormatter: TimeFormatter;

  constructor() {
    this.passwordGenerator = new PasswordGenerator();
    this.notificationManager = new NotificationManager();
    this.timeFormatter = new TimeFormatter();
    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    const form = document.getElementById('passwordForm') as HTMLFormElement;
    const timeInput = document.getElementById('timeInput') as HTMLInputElement;
    const fillTimeBtn = document.getElementById('fillTimeBtn') as HTMLButtonElement;
    const copyBtn = document.getElementById('copyBtn') as HTMLButtonElement;

    form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    timeInput.addEventListener('input', () => this.handleTimeInput());
    fillTimeBtn.addEventListener('click', () => this.handleFillTime());
    copyBtn.addEventListener('click', () => this.handleCopy());
  }

  private handleFormSubmit(e: Event): void {
    e.preventDefault();
    const timeInput = document.getElementById('timeInput') as HTMLInputElement;
    const passwordOutput = document.getElementById('passwordOutput') as HTMLInputElement;

    const password = this.passwordGenerator.generate(timeInput.value);
    if (password) {
      passwordOutput.value = password;
    } else {
      this.notificationManager.show('Please enter a valid time');
    }
  }

  private handleTimeInput(): void {
    const timeInput = document.getElementById('timeInput') as HTMLInputElement;
    timeInput.value = this.timeFormatter.format(timeInput.value);
  }

  private handleFillTime(): void {
    const timeInput = document.getElementById('timeInput') as HTMLInputElement;
    timeInput.value = this.timeFormatter.getCurrentTime();
  }

  private handleCopy(): void {
    const passwordOutput = document.getElementById('passwordOutput') as HTMLInputElement;
    if (!passwordOutput.value) return;

    navigator.clipboard.writeText(passwordOutput.value)
      .then(() => this.notificationManager.show('Password copied to clipboard!'))
      .catch(() => this.notificationManager.show('Failed to copy password', 'error'));
  }
}

// Initialize the app
new App();