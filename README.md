# User Directory Web App

## Overview

This is the **React frontend** for the User Directory application.  
It provides a simple interface to **list users** and **add new users** via the backend API (`UserDirectoryAPI`).

---

## Features

### Pages

- **List View**
  - Displays all users in a table/list:
    - Name, Age, City, State, Pincode
  - Fetches data from the backend API on mount
  - Handles empty state and errors gracefully

- **Add View**
  - Form to create a new user:
    - **Name:** required, 2–100 characters
    - **Age:** required, 0–120
    - **City:** required
    - **State:** required
    - **Pincode:** required, 4–10 characters
  - Client-side validation with inline error messages
  - On successful submission, redirects to List page and shows success notification

### Navigation

- Top bar with links to **Add** and **List** pages

### API Integration

- Fetches and posts data using the backend API:
  - `GET /api/users` → list users
  - `POST /api/users` → add a user
- Shows loading spinners while fetching data
- Handles errors gracefully

### Styling

- Simple and clean UI
- Uses **Tailwind CSS / MUI / plain CSS** (depending on project setup)

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/username/repo-name.git
cd repo-name

2. Install dependencies:

npm install
# or
yarn install

Running the App

npm start
# or
yarn start

The app will open at http://localhost:3000

Make sure the backend API is running to fetch and post user data

src/
│
├── components/      # Reusable React components
├── pages/           # List and Add pages
├── services/        # API service functions (fetch/axios)
├── App.js           # Main app component with routing
└── index.js         # App entry point

Notes

Frontend communicates with UserDirectoryAPI backend for CRUD operations

Displays loading indicators and error messages for API calls

Form input is validated before sending to the backend

Designed to be lightweight, maintainable, and easy to extend