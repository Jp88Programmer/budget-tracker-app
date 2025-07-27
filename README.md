# Budget Tracker App

A modern React + Vite frontend for tracking your income, expenses, and budgets. Visualize your financial data with charts, manage transactions, and keep your spending under control.


## Features

- **User Authentication**: Register and log in securely.
- **Dashboard**: Visual summary of your income, expenses, and balance using charts.
- **Transactions**: Add, view, filter, and delete transactions.
- **Categories**: Organize transactions by category.
- **Budget Management**: Set and view monthly budgets.
- **Charts**: Interactive bar charts for budget vs. expenses and financial summaries.
- **Responsive UI**: Clean, mobile-friendly design using Tailwind CSS.


## Getting Started

### 1. Install Dependencies

```sh
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and set your backend API URL:

```
REACT_APP_API_URL=http://localhost:5000
```

### 3. Run the App

```sh
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.


## Usage

### Authentication

- **Register**: Create a new account on `/register`.
- **Login**: Access your account on `/login`.

### Dashboard

- View a bar chart summarizing your total income, expenses, and balance.
- Data is fetched from the backend `/api/summary` endpoint.

### Adding Transactions

1. Go to the **Transactions** page.
2. Fill in the form with amount, type (income/expense), category, title, and optional description.
3. Click **Add Transaction**.
4. The transaction will appear in the list below.

### Filtering Transactions

- Filter by date, category, or amount using the filter controls above the transactions table.

### Deleting Transactions

- Click the **Delete** button next to a transaction to remove it.

### Budget Management

- Go to the **Budget** page.
- View your monthly budget vs. expenses in a bar chart.
- Set your budget for the month using the backend API (feature can be extended in the UI).

### Charts

- The app uses [Chart.js](https://www.chartjs.org/) via [react-chartjs-2](https://react-chartjs-2.js.org/) for interactive bar charts.
- Charts are shown on the Dashboard and Budget pages.


## Project Structure

- `src/pages/` — Main pages (Dashboard, Transactions, Budget, Login, Register)
- `src/context/` — React context for authentication
- `src/utils/api.js` — Axios instance for API calls
- `src/assets/` — Static assets


## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/)
- [Axios](https://axios-http.com/)


## Backend

This app requires the [budget-tracker-backend](https://github.com/Jp88Programmer/budget-tracker-backend/blob/dev_main/README.md) to be running.

---


**Happy budgeting!**