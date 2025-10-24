# Vue 3 + TypeScript + Vite

This project was built using Vue 3, TypeScript, and Vite. It demonstrates the use of modern frontend tools, reusable components, and clean architecture for scalable applications. The template uses Vue 3 `<script setup>` syntax and supports efficient development and production builds.

## Table of Contents

1. Overview
2. Features
3. Tech Stack
4. Project Structure
5. Installation
6. Development
7. Build
8. Linting and Formatting
9. Environment Variables
10. Deployment
11. Contributing
12. License

## Overview

This project is a Vue 3 application built with Vite for fast development and optimized builds. It follows the Composition API style with TypeScript for type safety and maintainability. The setup includes essential configurations for routing, state management, and linting.

## Features

1. Vue 3 Composition API with `<script setup>`
2. TypeScript support for strong typing and developer efficiency
3. Vite for fast bundling and hot module replacement
4. Organized folder structure for scalability
5. Reusable and modular components
6. Environment-based configuration for flexibility
7. Linting and Prettier integration for consistent code style
8. Dynamic routing and lazy-loaded components
9. API integration examples and reusable hooks
10. Authentication
11. OpenAI integration

## Tech Stack

- Frontend Framework: Vue 3
- Language: TypeScript
- Bundler: Vite
- Router: Vue Router
- Styling: Tailwind CSS
- Linting & Formatting: ESLint + Prettier

## Project Structure

src/
├── assets/ # Static assets
├── components/ # Reusable Vue components
│ ├── TodoForm.vue
│ ├── suggestBox.vue
├── composables/ # Custom reusable logic (e.g. useAuth)
├── lib/ # API helpers and TypeScript types
│ ├── todoApi.ts
│ ├── newTodoApi.ts
│ ├── todotypes.ts
├── pages/ # Application pages
│ ├── HomePage.vue
│ ├── TodoPage.vue
│ ├── LoginPage.vue
├── router/ # Vue Router configuration
├── App.vue
├── main.ts
└── index.css

Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/motoyocodes/vueJS-todoapp-yusuf-omotoyosi.git

cd vuejs-migration

2️⃣ Install dependencies
npm install

3️⃣ Start development server
npm run dev
