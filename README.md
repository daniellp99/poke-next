# Poke-Next

This project is a Next.js application that incorporates several third-party libraries and tools for functionality like authentication, styling, and UI components.

[Live Demo on Vercel](https://poke-next-one-mu.vercel.app/)

## Features

- Display a paginated list of Pokemon
- Search for Pokemon names
- View Pokemon details including stats, height, weight, and image
- Authentication with Auth.js using credentials provider (username/password)

## Technologies

- Zod for validate API responses
- Uses URL search params for state management (offset, limit, q)
- Next.js 14 with App Router include server actions and other React features
- Shadcn UI library with accesible component

## Getting Started

### Prerequisites

- Node.js

### Installation

- Clone the repo git clone https://github.com/daniellp99/poke-next.git

- Install NPM packages
  yarn install

```bash
npm install
```

- Run the development server:

```bash
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Customizing

- The Tailwind CSS configuration is in tailwind.config.ts.

- Global styles are in src/app/globals.css.

- Components are located in components/\*.

- Site configuration is in src/constants.ts
