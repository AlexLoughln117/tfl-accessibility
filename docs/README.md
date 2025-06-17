# TfL Accessibility - Free Flow Routes

A modern, accessible journey planner for London's transport network, focusing on step-free and wheelchair-accessible routes.

## Project Structure

The project is organized as follows:

### CSS and SCSS

- `src/scss/`: Source SCSS files
  - `base/`: Base styles (variables, typography, reset)
  - `components/`: Component styles (buttons, forms, etc.)
  - `layouts/`: Layout styles (header, footer, map)
  - `utils/`: Utilities (mixins, helper classes)
- `css/`: Compiled CSS (manual edits not recommended)
- `dist/css/`: Production-ready, minified CSS

### JavaScript

- `js/`: Main JavaScript files
  - `main.js`: Core functionality (dark mode, forms, accessibility)
  - `map.js`: Map and routing functionality
  - `tfl.js`: TfL API integration
- `dist/js/`: Production-ready, minified JavaScript

### HTML

- `index.html`: Main journey planner page
- `accessibility.html`: Accessibility guide and information
- `dist/`: Production-ready, compressed HTML files

## Development Setup

This project uses Gulp for task automation:

1. Install dependencies:
```
npm install
```

2. Development mode (with live reload):
```
npm start
```

3. Build for production:
```
npm run build
```

## File Organization Notes

- All JavaScript is organized in the root `js/` folder, not in `src/js/`
- SCSS files are in `src/scss/` and compile to `dist/css/`
- The build process compresses assets and creates production files in `dist/`

## Required Files

The minimum files needed to run the application are:

- HTML files: `index.html`, `accessibility.html`
- CSS files: `css/style.css` or the compiled CSS in `dist/css/`
- JS files: `js/main.js`, `js/map.js`
- Assets: All files in the `assets/` directory 