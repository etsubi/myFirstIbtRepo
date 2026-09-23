# Addis Eats — Next.js

A mini-project built with Next.js App Router to demonstrate file-system based routing.

## Routes

### 1. Home

**URL:** `/`

**File:** `app/page.tsx`

The home page for Addis Eats.

---

### 2. Menu

**URL:** `/menu`

**File:** `app/menu/page.tsx`

Displays the available dishes.

---

### 3. Dynamic Dish Page

**URL:** `/menu/[id]`

**File:** `app/menu/[id]/page.tsx`

Displays information about a specific dish using the dynamic `id` from the route parameters.

Examples:

- `/menu/doro-wat`
- `/menu/kitfo`
- `/menu/tibs`

The page reads `id` from the `params` prop rather than using a routing hook.

---

### 4. Cart

**URL:** `/cart`

**File:** `app/cart/page.tsx`

Displays the shopping cart page.

---

### 5. Checkout

**URL:** `/checkout`

**File:** `app/checkout/page.tsx`

Displays the checkout page.

## Special Route Files

### Loading State

**File:** `app/menu/loading.tsx`

Displays a loading UI while the menu page is loading.

The loading state was tested using an intentional delay in the menu page.

### Error State

**File:** `app/menu/error.tsx`

Displays an error UI when an error occurs in the menu segment.

The error state was tested using an intentional error.

### Not Found

**File:** `app/not-found.tsx`

Provides the custom 404 page.

It can be reached by visiting an unknown URL.

The dynamic dish page also calls `notFound()` when an unknown dish ID is entered.

For example:

`/menu/pizza`

## Colocated Menu Component

**File:** `app/menu/DishList.jsx`

`DishList.jsx` is colocated inside the `app/menu` folder and is imported by the menu page.

It does not create a route because it is not a special Next.js route file.

Therefore:

`/menu/DishList`

is not a valid route.

## Navigation

Internal navigation uses Next.js `Link` from `next/link`.

No plain `<a>` elements are used for internal navigation.

## Project Structure

```text
app/
├── layout.tsx
├── page.tsx
├── not-found.tsx
│
├── menu/
│   ├── page.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   ├── DishList.jsx
│   │
│   └── [id]/
│       └── page.tsx
│
├── cart/
│   └── page.tsx
│
└── checkout/
    └── page.tsx
```

## Build Verification

The project was tested with:

```bash
npm run build
```

The production build completed successfully.

The generated application routes were:

```text
/
 /cart
 /checkout
 /menu
 /menu/[id]
```

Next.js also generated its internal `/_not-found` route.

## Technologies

- Next.js
- React
- TypeScript
- JavaScript
- Next.js App Router
- `next/link`
- `notFound()`
