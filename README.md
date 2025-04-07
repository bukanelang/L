# Novel Reader App

A simple web-based novel reader built with **React**, **TailwindCSS**, and **Next.js**.

## Features

- Upload and read `.txt` novel files
- Search novels by title
- Save last read position per novel
- Progress bar showing reading position
- Toggle light/dark mode manually

## Planned Features

- Support for `.epub` files
- Auto dark mode (system-based)
- Category/tag support for novels
- Highlight last read sentence

## Installation

```bash
npm install
npm run dev
```

## File Structure

```
novel-reader-app/
├── app/
│   └── page.tsx        # Main novel reader page
├── components/ui/      # Basic UI components (button, input, card, etc.)
├── tailwind.config.js  # TailwindCSS config
├── postcss.config.js   # PostCSS config
├── globals.css         # Tailwind base styles
└── package.json        # Project config
```

## Usage

1. Launch the app with `npm run dev`
2. Upload a `.txt` file to start reading
3. Click on a novel title to open and scroll
4. Toggle dark mode in the top right

---

Built by Elang Ramadhan with help from Wony (ChatGPT).
