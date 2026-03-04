import { Guest } from '@/lib/types/invitation';

export class CSVParser {
  /**
   * Parse CSV file and extract guest information
   * Expected format: Name,Email,Phone,Group,DietaryRestrictions,Notes
   */
  static async parseGuestListCSV(file: File): Promise<Guest[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const csv = e.target?.result as string;
          const lines = csv.split('\n');
          const guests: Guest[] = [];

          // Skip header row (0) and process data rows
          for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue; // Skip empty lines

            const parts = this.parseCSVLine(line);
            if (parts.length < 2) continue; // Name and Email are minimum required

            const guest: Guest = {
              name: parts[0]?.trim() || '',
              email: parts[1]?.trim() || '',
              phone: parts[2]?.trim() || undefined,
              group: parts[3]?.trim() || undefined,
              dietaryRestrictions: parts[4]?.trim() || undefined,
              notes: parts[5]?.trim() || undefined,
            };

            // Validate email
            if (this.isValidEmail(guest.email)) {
              guests.push(guest);
            }
          }

          if (guests.length === 0) {
            reject(new Error('No valid guests found in CSV file'));
          } else {
            resolve(guests);
          }
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsText(file);
    });
  }

  /**
   * Parse a CSV line handling quoted values
   */
  private static parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current);
    return result;
  }

  /**
   * Validate email format
   */
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Generate CSV template for download
   */
  static generateCSVTemplate(): string {
    const headers = [
      'Name',
      'Email',
      'Phone',
      'Group',
      'DietaryRestrictions',
      'Notes',
    ];
    const exampleRow = [
      'John Doe',
      'john@example.com',
      '+1234567890',
      'Family',
      'Vegetarian',
      'Plus one: Jane',
    ];

    return [headers.join(','), exampleRow.join(',')].join('\n');
  }

  /**
   * Convert guests to CSV format
   */
  static convertGuestsToCSV(guests: Guest[]): string {
    const headers = [
      'Name',
      'Email',
      'Phone',
      'Group',
      'DietaryRestrictions',
      'Notes',
    ];
    const rows = guests.map((guest) => [
      this.escapeCSVValue(guest.name),
      this.escapeCSVValue(guest.email),
      this.escapeCSVValue(guest.phone || ''),
      this.escapeCSVValue(guest.group || ''),
      this.escapeCSVValue(guest.dietaryRestrictions || ''),
      this.escapeCSVValue(guest.notes || ''),
    ]);

    return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  }

  /**
   * Escape CSV values with special characters
   */
  private static escapeCSVValue(value: string): string {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }

  /**
   * Download CSV file
   */
  static downloadCSV(content: string, filename: string): void {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
