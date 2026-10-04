# 📚 Custom Story Book Creator

A modern web application that helps users create beautiful 10-page children's books by uploading their own pictures, which are automatically converted to line drawings and paired with predefined story templates.

## Features

- **3 Predefined Storylines**
  - 📖 **A Day in the Life**: Follow a child through a special day with customizable details
  - 🗺️ **Adventure Journey**: An exciting quest where the child overcomes challenges
  - 💝 **Friendship Story**: A heartwarming tale about connection and friendship

- **Image Processing**
  - Upload up to 10 pictures
  - Automatic conversion to line drawings using edge detection
  - Real-time preview of processed images
  - Server-side processing with Sharp.js

- **Story Customization**
  - Fill in character names, settings, emotions, and more
  - Automatically generated 10-page book with custom story text
  - Image-text pairing with thoughtful layout

- **PDF Generation**
  - Download finished books as PDF
  - Landscape board book format (8.5" x 11")
  - Professional layout with images and text

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI Components**: shadcn/ui with Radix UI
- **Styling**: Tailwind CSS
- **Image Processing**: Sharp.js
- **PDF Generation**: jsPDF
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── process-image/      # Image to line drawing conversion
│   │   └── generate-pdf/       # PDF generation endpoint
│   ├── page.tsx                # Main application page
│   └── layout.tsx              # Root layout
├── components/
│   ├── StorylineSelector.tsx   # Step 1: Choose storyline
│   ├── StorylineForm.tsx       # Step 2: Fill in story details
│   ├── ImageUpload.tsx         # Step 3: Upload & process images
│   ├── BookPreview.tsx         # Step 4: Preview & download PDF
│   └── ui/                     # shadcn UI components
├── lib/
│   ├── types.ts                # TypeScript types
│   ├── storylines.ts           # Storyline templates & logic
│   └── utils.ts                # Utility functions
└── public/                     # Static assets
```

## How It Works

### Step 1: Select a Storyline
Users choose from three pre-written storylines, each with a unique narrative arc.

### Step 2: Fill in Details
Complete form fields for the selected storyline with custom character names, settings, emotions, and themes.

### Step 3: Upload Pictures
- Upload up to 10 images (any standard image format)
- Images are processed server-side to create line drawings
- Real-time processing feedback with status indicators

### Step 4: Preview & Download
- View all 10 pages with line drawings and generated text
- Edit book title
- Download as PDF for printing or sharing

## Storyline Details

### A Day in the Life
**Fields:** Child's name, Age, Main activity, Time of day, Life lesson

**Page Flow:** Morning routine → Activity introduction → Main experience → Interaction → Reflection → Evening wind-down

### Adventure Journey
**Fields:** Child's name, Destination, Adventure companion, Challenge, Resolution

**Page Flow:** Discovery → Preparation → Journey → Challenge → Problem-solving → Success → Celebration

### Friendship Story
**Fields:** Character 1 & 2 names, Where they meet, A misunderstanding, What they learn

**Page Flow:** Meeting → Connection → Everyday fun → Conflict → Separation → Realization → Reconciliation

## API Endpoints

### POST `/api/process-image`
Converts an uploaded image to a line drawing using edge detection.

### POST `/api/generate-pdf`
Generates a PDF of the complete 10-page book with images and text.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## Performance

- Image processing: ~1-2 seconds per image
- PDF generation: ~2-3 seconds
- Optimized with lazy loading and streaming

---

**Created to help families create magical stories together** ✨
