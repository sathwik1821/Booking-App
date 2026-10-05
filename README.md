# Hotel Booking System - React Frontend

A feature-rich React frontend for the Hotel Booking & Reservation System, built with **React 18**, **Vite**, **Tailwind CSS**, and **Radix UI**.

> ? **Companion Backend**: This client connects to the Spring Boot REST API: [SpringBoot-Based-Hotel-Booking-System](https://github.com/sathwik1821/SpringBoot-Based-Hotel-Booking-System)

---

## ?? Features

- **Landing Page**: Hero section, trending destinations, and service navigation.
- **Hotel Search**: Live search with city, date range, and guest occupancy filters.
- **Search Results**: Hotel cards with skeleton loaders, sorting (popularity, price), star rating filters, and price range filters with pagination.
- **Hotel Details**: Image carousel, amenities, policies, room picker, and checkout card.
- **Authentication**: Sign Up / Sign In flows with JWT token management and protected routing.
- **User Profile**: View and manage booking history.
- **Payment Status**: Real-time booking and payment status page after Stripe checkout.

---

## ??? Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI (Popover, Checkbox, HoverCard, Calendar, etc.)
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios with interceptors for JWT auth
- **Icons**: Lucide React
- **Routing**: React Router DOM

---

## ?? Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/sathwik1821/Booking-App.git
cd Booking-App
git checkout search-details-mock
npm install
```

### 2. Configure Backend URL
Update the base URL in `src/lib/axios-instance.js`:
```js
baseURL: 'http://localhost:8080/api/v1'
```

### 3. Run Development Server
```bash
npm run dev
```
App available at `http://localhost:5173`

---

## ?? Branch Overview

| Branch | Description |
| :--- | :--- |
| `main` | Landing page only |
| `hotel-details` | Hotel details page added |
| `forms-feature` | Auth forms added |
| `search-details-mock` | Full app — search, auth, payments, profile (most complete) |
