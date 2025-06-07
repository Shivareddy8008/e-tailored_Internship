# e-tailored_Internship
Here's a clean and focused `README.md` for the **frontend** part of your project:

---

# Frontend 

This is the **frontend** of a frontend web application built using **React**, **TypeScript**, **TailwindCSS**, and **Vite**. It delivers a fast, responsive, and modern user experience using modular UI components and smooth animations.

---

## ⚙️ Tech Stack

* **React 18** (with TSX)
* **TypeScript**
* **TailwindCSS 3** + `tailwindcss-animate`, `@tailwindcss/typography`
* **Vite** (for fast builds and hot reload)
* **Radix UI** primitives for accessibility
* **Framer Motion** for UI animation
* **React Hook Form** + `zod` for form validation
* **ShadCN UI** for component styling and layout
* **Lucide Icons**, **Wouter** (routing), **CMDK**, etc.

---

##  Project Structure

```
client/
└── src/
    ├── components/        # Reusable UI components
    ├── pages/             # Page-level components/views
    ├── hooks/             # Custom hooks
    ├── lib/               # Utility functions
    ├── index.css          # TailwindCSS entry
    └── main.tsx           # Entry point
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (default Vite port).

---

## 🛠️ Scripts

| Script          | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build static assets      |
| `npm run check` | Type check the project   |

---
##Images
![Screenshot 2025-06-07 154435](https://github.com/user-attachments/assets/dc9e3150-6ffe-4e42-9224-1e7e24be23ee)
![Screenshot 2025-06-07 154342](https://github.com/user-attachments/assets/75d3a0c3-d574-4193-8db8-281c47e84e7c)
![Screenshot 2025-06-07 154402](https://github.com/user-attachments/assets/54e3844e-54bc-4344-aa29-8f48d6c1bfc4)
![Screenshot 2025-06-07 154435](https://github.com/user-attachments/assets/c95ac3a6-7959-4c43-8184-dcebee91929d)







##  Features

*  Fully responsive layout
*  Custom themes using Tailwind + ShadCN UI
*  Form validation with Zod + React Hook Form
* Page transitions and animations
*  Routing with `wouter`

---

##  TailwindCSS Setup

* Configuration: `tailwind.config.ts`
* PostCSS: `postcss.config.js`
* Utility-first approach with variant merging (`tailwind-merge`)
* Animations via `tw-animate-css` and `framer-motion`

---

## 🔗 Aliases (via tsconfig + components.json)

* `@/components` → `client/src/components`
* `@/hooks`, `@/lib`, `@/ui` for cleaner imports

---


