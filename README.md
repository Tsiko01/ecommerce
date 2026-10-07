# audiophile storefront

A responsive, frontend-only audio ecommerce demo built with React, Vite, TypeScript, React Router, Tailwind CSS, Zustand, React Hook Form and Zod.

## Run locally

```sh
npm install
npm run dev
```

## Verify

```sh
npm run lint
npm run build
```

## Demo behavior

- Catalog, search, filters and sorting use static TypeScript product data.
- Cart, browser-local inventory and orders are saved to `localStorage`.
- Checkout validates the entered details and simulates a successful payment after a short delay. It does not make a network request, process a real payment, or store card details.
- Inventory is local to the current browser and is not synchronized across users or devices.
