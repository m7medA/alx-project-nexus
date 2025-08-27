# E-Commerce React Project

## About This Project

This project was developed as part of my final project at **ALX Nexus**. It is a modern E-Commerce web application that allows users to browse products, view best sellers, manage their shopping cart, and handle user authentication. The project demonstrates my skills in building scalable, maintainable, and responsive web applications using the latest front-end technologies.

> **Note:** I will still work on this project to enhance it further, add new features, and improve the user experience.

---

## Live Demo

[Basket 🛒](https://basket-m.netlify.app/)

---

## Technologies Used

- **React**: For building user interfaces and managing component state.
- **Redux Toolkit**: For efficient and scalable state management.
- **React Router**: For client-side routing and navigation.
- **Tailwind CSS**: For fast and responsive UI styling.
- **Font Awesome**: For modern and scalable icons.
- **JavaScript (ES6+)**: For application logic and interactivity.
- **Supabase**: Used as a backend-as-a-service (BaaS) to manage the users table and handle authentication.

---

## Redux State Management

Redux Toolkit is used to manage the global state of the application in a predictable and scalable way. The main slices and their responsibilities are:

- **Auth Slice (`signInSlice`)**:  
  Manages user authentication by integrating Supabase Auth with Redux.  
  It handles sign-in logic, stores the authenticated user in Redux state, and persists the session in `localStorage`.  
  This abstraction allows the UI to stay in sync with the backend auth state.

- **Cart Slice**:  
  Manages the shopping cart, including adding, removing, and updating products in the cart, as well as calculating totals.

- **Products Slice**:  
  Fetches and stores product data, manages pagination, filtering, and best sellers.

Redux allows different parts of the app to access and update shared state easily, making the app more maintainable and testable.

---

## Features

- **Product Listing**: Browse all available products with updated stock.
- **Best Sellers**: Highlighted section for top-selling products.
- **Product Details**: View detailed information and images for each product.
- **User Authentication**: Sign in functionality powered by Supabase. Auth state is managed by `signInSlice` and persisted with localStorage.
- **Shopping Cart**: Add, remove, and view products in the cart.
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop.
- **Modern UI**: Clean and user-friendly interface using Tailwind CSS.

---

## Pages Overview

- **Home Page**  
  Displays banners, best sellers, and a preview of all products. Includes navigation to view more products.

- **All Products Page**  
  Shows a paginated list of all products, with options to filter and sort.

- **Product Details Page**  
  Shows detailed information about a selected product, including images, description, and add-to-cart functionality.

- **Login Page**  
  Allows users to log in using Supabase Authentication. On successful login, updates Redux state via `signInSlice` and persists session locally.

- **Cart Page**  
  Displays all products added to the cart, allows quantity updates and removal, and shows the total price.

- **Not Found Page**  
  Handles invalid routes with a user-friendly message.

---

## Project Structure

```

components/ # Reusable UI components (Header, Footer, ProductCard, etc.)
featuers/ # Application features (auth, products, cart, etc.)
auth/ # Authentication logic and Redux slice
products/ # Product fetching, display, and Redux slice
cart/ # Cart logic and Redux slice
pages/ # Main pages (Home, Login, All Products, etc.)
assets/ # Images and static assets
utils/ # Utility functions and API calls

yaml
Copy
Edit

```

---

## 🔐 Supabase Integration

This project uses **[Supabase](https://supabase.com/)** to manage user authentication and store user data.

### Supabase Features Used:

- **Auth (Sign In)**:  
  Users can log in securely using their email and password through Supabase Authentication. This is handled inside the custom `signInSlice` which stores the user data in Redux state and persists it in `localStorage`.

- **Users Table**:  
  A Supabase-hosted database is used to store user-related information securely.

---

## 🔄 Sign-In Slice (Redux Auth Layer)

This project uses a custom `signInSlice` to abstract and manage Supabase Authentication logic inside Redux Toolkit.

### Responsibilities:

- Sends login credentials to Supabase.
- Stores authenticated user in Redux state.
- Listens to Supabase session updates.
- Persists authentication using `localStorage`.
- Redirects the user after successful sign-in.

> This abstraction allows for cleaner separation between UI and business logic, and makes it easier to manage user state globally.

---

## What I Learned

- Building scalable React applications with Redux Toolkit.
- Managing authentication and persisting state with Supabase and localStorage.
- Creating responsive layouts with Tailwind CSS.
- Handling routing and navigation with React Router.
- Collaborating in a real-world development environment.

---

## Author

- **M7MED AYMAN**
