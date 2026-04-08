# Wall Calendar Application

A modern, interactive wall calendar application with note-taking capabilities built with React and TypeScript. This project provides an intuitive interface for managing dates, events, and notes with a beautiful paper-like aesthetic.

![Calendar Preview](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Features

- **Interactive Calendar View**: Navigate through months with smooth flip animations
- **Date Selection**: Click to select single dates or drag to select date ranges
- **Smart Note-Taking**: Add notes and pin them to specific dates or date ranges
- **Persistent Storage**: All notes are automatically saved to localStorage
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Visual Indicators**: 
  - Today's date highlighted
  - Weekend dates in different color
  - Note indicators on dates with notes
  - Range selection with hover preview
- **Beautiful UI**: Paper-like texture with spiral binding decoration

## 🛠️ Tech Stack & Design Choices

### Core Technologies
- **React 18** - For building the user interface with hooks and functional components
- **TypeScript** - For type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling

### Key Libraries
- **Framer Motion** - Smooth animations for month transitions and interactions
- **date-fns** - Lightweight date manipulation library (chosen over moment.js for smaller bundle size)
- **Radix UI** - Accessible, unstyled UI components as foundation
- **Lucide React** - Beautiful, consistent icon set

### Design Decisions

1. **Component Architecture**: Modular design with separate components for calendar grid, date cells, and notes sidebar for better maintainability

2. **State Management**: Used React hooks (useState, useCallback, useMemo) instead of external state management to keep the app lightweight

3. **Data Persistence**: localStorage for simplicity and offline-first approach - no backend required

4. **Styling Approach**: Tailwind CSS with custom design tokens for consistent theming and easy customization

5. **Date Handling**: date-fns chosen for its modular approach and tree-shaking capabilities

6. **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation support

## 🚀 Getting Started

### Prerequisites

Before running this project, make sure you have:
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** or **bun**

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/akhtarsohel955/Interactive-calendar.git
   cd Interactive-calendar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   Or if you prefer yarn:
   ```bash
   yarn install
   ```
   Or with bun:
   ```bash
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:8080`

4. **Open in browser**
   Navigate to `http://localhost:8080` in your web browser

### Build for Production

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```text
wall-calendar-app/
├── public/                      # Static assets
│   ├── favicon.svg             # App favicon
│   ├── placeholder.svg         # Logo/placeholder image
│   └── robots.txt              # SEO configuration
├── src/
│   ├── components/
│   │   ├── calendar/
│   │   │   ├── WallCalendar.tsx      # Main calendar container
│   │   │   ├── CalendarGrid.tsx      # Calendar grid with date cells
│   │   │   ├── DateCell.tsx          # Individual date cell component
│   │   │   ├── NotesSidebar.tsx      # Notes management sidebar
│   │   │   └── SpiralBinding.tsx     # Decorative spiral binding
│   │   └── ui/                       # Reusable UI components (Radix UI)
│   ├── pages/
│   │   ├── Index.tsx                 # Home page
│   │   └── NotFound.tsx              # 404 error page
│   ├── lib/
│   │   └── utils.ts                  # Utility functions
│   ├── assets/                       # Images and media
│   ├── App.tsx                       # Root component
│   ├── main.tsx                      # Application entry point
│   └── index.css                     # Global styles and Tailwind imports
├── .editorconfig                # Editor configuration
├── .gitignore                   # Git ignore rules
├── CHANGELOG.md                 # Version history
├── CONTRIBUTING.md              # Contribution guidelines
├── LICENSE                      # MIT License
├── README.md                    # This file
├── package.json                 # Dependencies and scripts
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── vite.config.ts               # Vite configuration
```

## 🎨 Usage

### Selecting Dates
- **Single Date**: Click on any date to select it
- **Date Range**: Click on a start date, then click on an end date to select a range
- **Clear Selection**: Click the X button next to the selected date(s)

### Adding Notes
1. Type your note in the input field in the sidebar
2. (Optional) Check "Pin to [selected date]" to attach the note to a specific date
3. Press Enter or click the + button to add the note

### Deleting Notes
- Hover over a note and click the trash icon that appears

### Navigation
- Use the left/right arrow buttons to navigate between months
- Notes are filtered by the current month view

## 🧪 Testing

Run unit tests:
```bash
npm run test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Akhtar Sohel**
- GitHub: [@akhtarsohel955](https://github.com/akhtarsohel955)

## 🙏 Acknowledgments

- Design inspiration from traditional wall calendars
- Icons by [Lucide](https://lucide.dev/)
- UI components by [Radix UI](https://www.radix-ui.com/)

---

Made with ❤️ using React and TypeScript
