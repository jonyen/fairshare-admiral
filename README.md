# Fair Share

Welcome to Admiral! We have pivoted, and now our product is an equity sharing app. We're still in MVP phase, and are excited for our new hires to help build our app.

## Frontend

The frontend of the application is a React application that uses context and React Query to manage state.

You can find documentation for these here:
https://reactjs.org/docs/context.html
https://react-query.tanstack.com/

Importantly, there are two key concepts for React Query: mutations and queries. When you want to update data, you use a mutation. When you're just referencing data, you use a query. 

The application is broken up into a few main areas:

### Styles
We use Tailwind CSS for styling and have built a custom component library. Our components are located in `src/components/` and include:

- **Form Components**: `Input`, `Select`, `FormControl`, `FormLabel`, `FormHelperText`
- **Layout Components**: `Container`, `Stack`, `StackDivider`
- **UI Components**: `Button`, `Modal`, `Alert`, `Badge`, `Spinner`, `Table`
- **Typography**: `Text`, `Heading`

All components are exported from `src/components/index.ts` for easy importing.

### Testing

We use Vitest and Testing Library to write our tests. So far we have okay tests, but they're not perfect. We're always looking for improvement, but we do require that new features include tests!

https://vitest.dev/
https://testing-library.com/docs/react-testing-library/intro

### Structure

#### Onboarding
This portion of the app contains components for all of the steps in the onboarding process

#### Dashboard
The dashboard contains company and aggregated metrics which show how ownership is broken down across all shareholders.

#### Shareholder
The ShareholderPage contains data specific to a just a single shareholder, and shows how much equity they have.

Today, the app allows basic create operations but isn't great for updates (or other operations). We need your help to improve this functionality.

## Backend

We're saving server expenses by mocking all network calls using MSW (Mock Service Worker). You don't need to understand what MSW is, other than that we use it to define handlers for outgoing network calls. No servers === no problems.

The behavior of our "backend" is defined by the "handlers" in `src/handlers.ts`. If you need to make changes or add endpoints, this is where you can do this.

You probably don't need to worry about our database--its just some objects in memory on the user's browser. Its genius, right?

## Build Tools

This project uses Vite as the build tool instead of Create React App, providing faster development and build times.

## State Management

We use Zustand for state management alongside React Context for authentication state.

# Getting Started

## Prerequisites

Make sure you have Node.js installed on your system.

## Installing dependencies

Installing dependencies with `npm` is easy. Simply run it in the base directory without any arguments, and it will get you what you need.

```
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://vitest.dev/) for more information.

### `npm run test:ui`

Launches the test runner with a UI interface for better debugging.

### `npm run test:coverage`

Runs tests with coverage reporting.

### `npm run test:run`

Runs tests once without watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run preview`

Previews the production build locally.

## Learn More

You can learn more in the [Vite documentation](https://vitejs.dev/).

To learn React, check out the [React documentation](https://reactjs.org/).

To learn Tailwind CSS, check out the [Tailwind documentation](https://tailwindcss.com/).
