export class PasswordGenerator {
  private readonly conversion: Record<string, string> = {
    '0': 'R',
    '1': 'O',
    '2': 'R',
    '3': 'D',
    '4': 'I',
    '5': 'N',
    '6': 'A',
    '7': 'T',
    '8': 'E',
    '9': 'U'
  };

  public generate(timeString: string): string | null {
    if (!this.isValidTimeFormat(timeString)) return null;

    const today = new Date();
    const timeParts = timeString.split(':').map(part => part.slice(-1));
    
    const dateDigits = [
      today.getDate().toString().slice(-1),
      (today.getMonth() + 1).toString().slice(-1),
      today.getFullYear().toString().slice(-1)
    ];

    const combinedInput = [...dateDigits, ...timeParts].join('');
    return this.convertToPassword(combinedInput);
  }

  private isValidTimeFormat(time: string): boolean {
    const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    return timeRegex.test(time);
  }

  private convertToPassword(input: string): string {
    return input
      .split('')
      .map(digit => this.conversion[digit] || '')
      .join('');
  }
}