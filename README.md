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
![image](https://github.com/user-attachments/assets/2c7d0d5c-d6df-4f1e-8d85-9638784b7136)
![image](https://github.com/user-attachments/assets/82a04a5d-4879-40ba-9c82-95931a68286e)
![image](https://github.com/user-attachments/assets/a7de31f3-838a-431b-82e2-4ab3c675dd54)
![image](https://github.com/user-attachments/assets/e73282a6-4085-496c-873b-fe450fda9a45)





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


