export class TimeFormatter {
  public format(value: string): string {
    const cleaned = value.replace(/[^\d]/g, '');
    const parts = [];
    
    for (let i = 0; i < cleaned.length && i < 6; i += 2) {
      parts.push(cleaned.substr(i, 2));
    }
    
    return parts.join(':');
  }

  public getCurrentTime(): string {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}`;
  }
}