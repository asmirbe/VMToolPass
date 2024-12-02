# VMOutils Password Generator

A sleek and secure password generator that creates passwords based on time inputs. Built with TypeScript and Vite.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=sass&logoColor=white)

## Features

- Generate unique passwords based on time input
- Auto-fill current time functionality
- Copy to clipboard with one click
- Real-time input formatting
- Responsive design with modern UI
- Toast notifications for user feedback

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/password-generator.git

# Navigate to project directory
cd password-generator

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
password-generator/
├── src/
│   ├── main.ts              # Application entry point
│   ├── passwordGenerator.ts # Password generation logic
│   ├── notificationManager.ts # Toast notification system
│   ├── timeFormatter.ts     # Time input formatting
│   └── style.scss          # SASS styles
├── index.html              # Main HTML file
├── package.json           # Project dependencies
└── tsconfig.json         # TypeScript configuration
```

## Usage

1. Enter a time in HH:MM:SS format or click "Use Current Time"
2. Click "Generate Password" to create a new password
3. Use the copy button to copy the generated password to clipboard

## Development

The project uses the following technologies:
- TypeScript for type-safe code
- Vite for fast development and building
- SASS for enhanced styling
- Modern ES6+ features

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Developed by [Asmir](https://hiasmir.com)
