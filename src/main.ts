import './style.scss';
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
		timeInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
		fillTimeBtn.addEventListener('click', () => this.handleFillTime());
		copyBtn.addEventListener('click', () => this.handleCopy());

		// Global keyboard shortcut for copy
		document.addEventListener('keydown', (e) => {
			if (e.ctrlKey && e.key === 'c') {
				e.preventDefault();
				this.handleCopy();
			}
		});
	}

	private handleKeyDown(e: KeyboardEvent): void {
		if (e.key === 'Enter') {
			e.preventDefault();
			this.handleFormSubmit(e);
		}
	}

	private handleFormSubmit(e: Event): void {
		e.preventDefault();
		const timeInput = document.getElementById('timeInput') as HTMLInputElement;
		const passwordOutput = document.getElementById('passwordOutput') as HTMLInputElement;

		const password = this.passwordGenerator.generate(timeInput.value);
		if (password) {
			passwordOutput.value = password;
		} else {
			this.notificationManager.show('Veuillez saisir une heure valide');
		}
	}

	private handleTimeInput(): void {
		const timeInput = document.getElementById('timeInput') as HTMLInputElement;
		timeInput.value = this.timeFormatter.format(timeInput.value);
	}

	private handleFillTime(): void {
		const timeInput = document.getElementById('timeInput') as HTMLInputElement;
		timeInput.value = this.timeFormatter.getCurrentTime(false);
		timeInput.focus();

		// Place cursor at the end of the input
		const len = timeInput.value.length;
		timeInput.setSelectionRange(len, len);
	}

	private handleCopy(): void {
		const passwordOutput = document.getElementById('passwordOutput') as HTMLInputElement;
		if (!passwordOutput.value) return;

		navigator.clipboard.writeText(passwordOutput.value)
			.then(() => this.notificationManager.show('Mot de passe copié !'))
			.catch(() => this.notificationManager.show('Échec de la copie', 'error'));
	}
}

// Initialize the app
new App();