import './style.scss';
import { inject } from '@vercel/analytics';
import { PasswordGenerator } from './passwordGenerator';
import { NotificationManager } from './notificationManager';
import { TimeFormatter } from './timeFormatter';

inject();

class App {
	private passwordGenerator: PasswordGenerator;
	private notificationManager: NotificationManager;
	private timeFormatter: TimeFormatter;
	private isGenerating: boolean = false;

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
		timeInput.addEventListener('input', (e) => this.handleTimeInput(e));
		timeInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
		fillTimeBtn.addEventListener('click', () => this.handleFillTime());
		copyBtn.addEventListener('click', () => this.handleCopy());

		// Add hover effect for copy button
		const passwordOutput = document.getElementById('passwordOutput') as HTMLInputElement;
		passwordOutput.addEventListener('mouseover', () => {
			if (passwordOutput.value) {
				copyBtn.style.opacity = '1';
			}
		});

		// Global keyboard shortcuts
		document.addEventListener('keydown', (e) => {
			// Ctrl/Cmd + C to copy
			if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
				e.preventDefault();
				this.handleCopy();
			}
			// Ctrl/Cmd + Enter to generate
			if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
				e.preventDefault();
				this.handleFormSubmit(e);
			}
			// Focus timeInput when space is pressed
			if (e.key === ' ' && (e.target === document.body || (e.target as HTMLElement).id === 'timeInput')) {
				e.preventDefault();
				const timeInput = document.getElementById('timeInput') as HTMLInputElement;
					timeInput.value = '';
					timeInput.focus();
			}
		});
	}

	private handleKeyDown(e: KeyboardEvent): void {
		const timeInput = e.target as HTMLInputElement;

		if (e.key === 'Enter') {
			e.preventDefault();
			this.handleFormSubmit(e);
		}

		// Auto-add colons
		if (e.key >= '0' && e.key <= '9') {
			const newValue = timeInput.value + e.key;
			if (newValue.length === 2 || newValue.length === 5) {
				timeInput.value = newValue + ':';
				e.preventDefault();
			}
		}
	}

	private async handleFormSubmit(e: Event): Promise<void> {
		e.preventDefault();
		if (this.isGenerating) return;

		const timeInput = document.getElementById('timeInput') as HTMLInputElement;
		const passwordOutput = document.getElementById('passwordOutput') as HTMLInputElement;
		const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement;

		try {
			this.isGenerating = true;
			generateBtn.classList.add('loading');

			// Simulate some processing time for better UX
			await new Promise(resolve => setTimeout(resolve, 300));

			const password = this.passwordGenerator.generate(timeInput.value);
			if (password) {
				passwordOutput.value = password;
				passwordOutput.classList.add('highlight');
				setTimeout(() => passwordOutput.classList.remove('highlight'), 300);
			} else {
				this.notificationManager.show('Veuillez saisir une heure valide', 'error');
			}
		} finally {
			this.isGenerating = false;
			generateBtn.classList.remove('loading');
		}
	}

	private handleTimeInput(e: Event): void {
		const input = e.target as HTMLInputElement;
		const formattedValue = this.timeFormatter.format(input.value);

		if (formattedValue !== input.value) {
			const cursorPos = input.selectionStart;
			input.value = formattedValue;
			input.setSelectionRange(cursorPos, cursorPos);
		}
	}

	private handleFillTime(): void {
		const timeInput = document.getElementById('timeInput') as HTMLInputElement;
		const oldValue = timeInput.value;
		const newValue = this.timeFormatter.getCurrentTime(false);

		timeInput.value = newValue;
		timeInput.focus();

		if (oldValue !== newValue) {
			timeInput.classList.add('highlight');
			setTimeout(() => timeInput.classList.remove('highlight'), 300);
		}

		const len = timeInput.value.length;
		timeInput.setSelectionRange(len, len);
	}

	private async handleCopy(): Promise<void> {
		const passwordOutput = document.getElementById('passwordOutput') as HTMLInputElement;
		const copyBtn = document.getElementById('copyBtn') as HTMLButtonElement;

		if (!passwordOutput.value) return;

		try {
			await navigator.clipboard.writeText(passwordOutput.value);

			// Visual feedback
			copyBtn.classList.add('copied');
			setTimeout(() => copyBtn.classList.remove('copied'), 500);

			this.notificationManager.show('Mot de passe copié !');
		} catch (err) {
			this.notificationManager.show('Échec de la copie', 'error');
		}
	}
}

// Initialize the app
new App();
