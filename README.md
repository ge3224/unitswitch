<div align="center">

# ![UnitSwitch Logo](./public/logo.png) UnitSwitch

[![Live Demo](https://img.shields.io/badge/Live_Demo-View-4EBD85?style=flat-square)](https://unitswitch.jacobbenison.com)
[![GitHub Release](https://img.shields.io/github/v/release/ge3224/unitswitch?style=flat-square&color=4EBD85)](https://github.com/ge3224/unitswitch/releases)
[![License](https://img.shields.io/github/license/ge3224/unitswitch?style=flat-square&color=4EBD85)](./LICENSE)
![GitHub branch check runs](https://img.shields.io/github/check-runs/ge3224/unitswitch/main?style=flat-square&color=4EBD85)

</div>

UnitSwitch is a web-based converter for units of measurement common in web development and UX design. It supports point-and-click and keyboard-driven workflows.

In addition to its practical function, the project is an exploration in framework-free UI development.

## Demo

https://github.com/user-attachments/assets/18d9037d-2e41-466f-92c8-8dabf94221f7

## Features

- **14 unit types** - including CSS lengths (px, rem, em) and viewport units (vw, vh, vmin, vmax)
- **Bidirectional conversion** - enter a value in any of the supported units, see conversions to all others
- **One-click clipboard copy**
- **Keyboard shortcuts** - Ctrl+K to launch keyboard workflow, letter keys to copy specific units (p for px, r for rem, etc.)
- **Design ratios** - calculates corresponding lengths (Golden Ratio, Root 2, 16:9)
- **Customizable settings** - adjust base font size, viewport dimensions, PPI, and character ratios

**Browser Support:** Modern browsers (Chrome, Firefox, Safari, Edge)

## Technical Overview

This implementation prioritizes shipping minimal, auditable code to the browser. Core runtime functionality uses vendored solutions rather than npm packages, reducing supply-chain risk and keeping dependencies transparent and stable.

Build tooling provides compile-time ergonomics without runtime cost.

- **Build**: Deno + Vite with TypeScript (strict mode)
- **UI**: Custom JSX factory functions ([`just-jsx`](https://github.com/ge3224/just-jsx)) + Tailwind CSS
- **State**: Custom reactive state library ([`simple-state`](https://github.com/ge3224/simple-state)) with pub/sub pattern
- **Patterns**: Rust-inspired Result<T, E> for error handling, declarative validation

## Getting Started

UnitSwitch is built with Deno. Follow these steps to run locally:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/ge3224/unitswitch.git
   cd unitswitch
   ```

2. **Install Deno:** If you don't have Deno installed, visit [deno.land](https://deno.land/) for installation instructions.

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

## Author

UnitSwitch is maintained by [Jacob Benison](https://jacobbenison.com/).

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
