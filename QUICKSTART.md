# Quick Start Guide

Get the Wall Calendar application running in 3 minutes!

## Prerequisites Check

Open your terminal and verify you have Node.js installed:

```bash
node --version
```

You should see version 18 or higher. If not, [download Node.js here](https://nodejs.org/).

## Installation (3 Steps)

### Step 1: Clone the Repository

```bash
git clone https://github.com/akhtarsohel955/Interactive-calendar.git
cd Interactive-calendar
```

### Step 2: Install Dependencies

```bash
npm install
```

This will take 1-2 minutes depending on your internet connection.

### Step 3: Start the Development Server

```bash
npm run dev
```

You should see output like:
```
VITE v5.4.19  ready in 541 ms
➜  Local:   http://localhost:8080/
➜  Network: http://10.x.x.x:8080/
```

### Step 4: Open in Browser

Open your browser and navigate to:
```
http://localhost:8080
```

🎉 **That's it!** Your calendar should now be running.

## First Steps

1. **Navigate Months**: Use the left/right arrow buttons
2. **Select a Date**: Click on any date
3. **Select a Range**: Click start date, then end date
4. **Add a Note**: Type in the sidebar and press Enter
5. **Pin a Note**: Check the "Pin to [date]" checkbox before adding

## Troubleshooting

### Port Already in Use?

If port 8080 is busy, Vite will automatically use the next available port. Check the terminal output for the actual URL.

### Dependencies Won't Install?

Try clearing npm cache:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Page Won't Load?

1. Check if the dev server is running (look for "ready" message in terminal)
2. Try a different browser
3. Clear browser cache (Ctrl+Shift+Delete)

## Building for Production

When you're ready to deploy:

```bash
npm run build
```

The optimized files will be in the `dist` folder.

## Need More Help?

- Read the full [README.md](README.md)
- Check [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines
- See [DEPLOYMENT.md](DEPLOYMENT.md) for hosting options

## Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |
| `npm run test` | Run tests |

---

Happy coding! 🚀
