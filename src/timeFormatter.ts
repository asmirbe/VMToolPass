export class TimeFormatter {
  public format(value: string): string {
    // Remove any non-digit characters
    const cleaned = value.replace(/[^\d]/g, '');
    const parts = [];

    // Format in HH:MM:SS
    for (let i = 0; i < cleaned.length && i < 6; i += 2) {
      let part = cleaned.substr(i, 2);
      
      // Validate hours
      if (i === 0) {
        const hours = parseInt(part);
        if (hours > 23) part = '23';
      }
      // Validate minutes and seconds
      else if (i === 2 || i === 4) {
        const timeUnit = parseInt(part);
        if (timeUnit > 59) part = '59';
      }
      
      parts.push(part);
    }

    return parts.join(':');
  }

  public getCurrentTime(includeSeconds: boolean = true): string {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    if (!includeSeconds) {
      return `${hours}:${minutes}:`;
    }

    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  public isValidTimeFormat(time: string): boolean {
    const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    return timeRegex.test(time);
  }
}
