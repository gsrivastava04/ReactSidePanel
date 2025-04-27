# Node Graph Visualization App

A React TypeScript application that visualizes node graphs using D3.js and Material-UI.

## Features

- Interactive node graph visualization using D3.js
- Responsive header with company logo and hamburger menu
- Side panel with four tabs:
  - Node Details
  - Search
  - Settings
  - Analytics
- Material-UI components for consistent styling
- TypeScript for type safety

## Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

## Project Structure

```
src/
  ├── components/
  │   ├── Header.tsx
  │   ├── NodeGraph.tsx
  │   └── SidePanel.tsx
  ├── styles/
  │   └── global.css
  ├── types/
  ├── utils/
  ├── App.tsx
  └── main.tsx
```

## Dependencies

- React 18
- TypeScript
- Material-UI
- D3.js
- Vite

## License

MIT 