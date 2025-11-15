<div align="center">

![UnitSwitch Logo](./public/logo.png)

[![GitHub Release](https://img.shields.io/github/v/release/ge3224/unitswitch?style=flat-square&color=4EBD85)](https://github.com/ge3224/unitswitch/releases)
[![License](https://img.shields.io/github/license/ge3224/unitswitch?style=flat-square&color=4EBD85)](./LICENSE)
[![Tests](https://img.shields.io/badge/tests-passing-4EBD85?style=flat-square)](https://github.com/ge3224/unitswitch)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-4EBD85?style=flat-square)](https://github.com/ge3224/unitswitch)
[![Vanilla JS](https://img.shields.io/badge/runtime-vanilla_js-4EBD85?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

## Overview

A simple unit converter for web developers. Supports CSS length units, viewport units, typography units, and design proportions. Includes keyboard shortcuts for quick copying.

## Features

### Core Conversion

- **18 Unit Types:** CSS length units (px, rem, mm, cm, pt, pc, in, ft), viewport units (vw, vh, vmin, vmax), typography units (ch, ex), and design proportions (Golden Ratio, Root 2, 16:9)
- **Real-time Bidirectional Conversion:** Convert from any unit to any other instantly
- **One-Click Copy:** Quickly copy any converted value to clipboard with visual feedback
- **Precision Rounding:** All conversions rounded to 3 decimal places for practical use

### Customization

- **Dark Mode:** Choose between Light, Dark, or System theme (follows OS preference)
- **Configurable Settings:** Customize viewport dimensions, base font size, PPI, and character ratios
- **Persistent Preferences:** All settings and last conversion saved to localStorage

### User Experience

- **Responsive Design:** Optimized layouts for desktop, tablet, and mobile devices
- **Detailed Information:** Expandable panels showing calculation breakdowns for key units
- **Touch-Friendly:** Mobile-optimized with touch-friendly controls
- **Toast Notifications:** Clear feedback for all copy actions

## Getting Started

UnitSwitch is built with Deno. Follow these steps to run locally:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/unitswitch.git
   cd unitswitch
   ```

2. **Install Deno:** If you don't have Deno installed, the build script will handle it, or install manually from [deno.land](https://deno.land/).

3. **Start the Development Server:**

   ```bash
   deno task dev
   ```

4. **Access UnitSwitch:** Open your browser and navigate to `http://localhost:5173`

## Build for Production

```bash
deno task build
```

The optimized build will be output to the `dist/` directory.

## Usage

1. **Enter a Value:** Type any number into the input field
2. **Select Your Unit:** Choose the unit you're converting from using the dropdown
3. **View Conversions:** All other units update automatically in the grid
4. **Copy Results:** Click any conversion to copy it, or use keyboard shortcuts (hover to see the hotkey)
5. **Quick Convert:** Press `Ctrl+K` for fast modal-based conversions
6. **Customize:** Press `Ctrl+/` to adjust settings like viewport size, base font size, and theme

## Technologies Used

UnitSwitch leverages modern, lightweight technologies:

- **Deno:** Modern TypeScript runtime with built-in tooling
- **Custom JSX Runtime:** Lightweight JSX implementation (no React dependency)
- **Vite + Rolldown:** Lightning-fast build tool and bundler
- **Tailwind CSS v4:** Utility-first CSS framework with Vite plugin
- **TypeScript:** Strict type checking for reliability
- **Custom State Management:** Minimal reactive state library

## Author

UnitSwitch is maintained by [Jacob Benison](https://jacobbenison.com/).

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
