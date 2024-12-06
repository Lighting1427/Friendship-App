
# README for Friendship Application

## Overview
This is the **Friendship Application**, consisting of a backend and a frontend. 
- The **Backend** is a RESTful API server for managing users and posts, built using Node.js, Express, and PostgreSQL.
- The **Frontend** is a React-based web application for users to interact with the platform.

---

## Features
- **User Management**: Register, login, and update user profiles.
- **Post Management**: Create, read and posts with custom backgrounds and stickers.
- **Post Interactive**: Interface can interact and viewing posts.
- **Authentication**: Basic login functionality.

---

## Folder Structure

### Backend
```
friendship-backend/
├── db/
│   ├── init.sql         # SQL scripts to initialize database tables
├── src/
│   ├── controllers/     # Controllers to handle API requests
│   ├── routes/          # API route 
│   ├── services/        # Business logic for handling database operations
│   ├── db.js            # Database connection configuration
│   ├── index.js         # Main entry point for the backend server
├── .env                 # Environment variables configuration
├── Dockerfile           # Dockerfile for building backend service
├── docker-compose.yml   # Docker Compose setup for backend and database
```

### Frontend
```
friendship-frontend/
├── src/
│   ├── components/      # Reusable React components (e.g., Navbar, Modals, Profile sections)
│   ├── App.jsx          # Main application component
│   ├── index.js         # Entry point for React application
├── public/              # Static assets and index.html for React
├── package.json         # Frontend dependencies
```

---

## Backend Details
### Database Setup
The backend uses PostgreSQL. The following tables are created during initialization:

#### `users_tb`
| Column       | Type         | Constraints                    |
|--------------|--------------|---------------------------------|
| id           | SERIAL       | PRIMARY KEY                    |
| nickname     | VARCHAR(50)  | NOT NULL                       |
| email        | VARCHAR(100) | NOT NULL                       |
| phone        | VARCHAR(15)  |                                 |
| address      | TEXT         |                                 |
| created_at   | TIMESTAMPTZ  | DEFAULT CURRENT_TIMESTAMP      |
| password     | TEXT         | DEFAULT 'default_password'     |

#### `posts_tb`
| Column           | Type         | Constraints                           |
|------------------|--------------|---------------------------------------|
| id               | SERIAL       | PRIMARY KEY                           |
| user_id          | INTEGER      | REFERENCES `users_tb(id)` ON DELETE CASCADE |
| content          | TEXT         | NOT NULL                              |
| background_color | VARCHAR(7)   |                                       |
| sticker_url      | TEXT         |                                       |
| created_at       | TIMESTAMPTZ  | DEFAULT CURRENT_TIMESTAMP             |

### API Endpoints
Refer to the backend API documentation for available routes.

---

## Frontend Details

### Features
- **Homepage**: A welcoming view with a navigation bar.
- **Login/Register**: User authentication handled via forms.
- **Profile Management**: View and edit user profiles.
- **Post Board**: Interactive section for viewing and creating posts.

### Key Components
- `App.jsx`: Main entry point for the frontend.
- `Navbar.jsx`: Top navigation bar.
- `ProfileSection.jsx`: Displays user profile information.
- `PostMessageButton.jsx`: Button to create new posts.
- `Modals (PostModal, BackgroundModal, StickerModal, ProfileModal)`: Handles user interactions such as adding backgrounds or stickers to posts.

### Running the Frontend
1. Navigate to the `friendship-frontend` folder.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```
4. The frontend will run at `http://localhost:5713` (or another port if specified).

---

## How to Run the Application

### Using Docker
1. Install Docker and Docker Compose.
2. Create an `.env` file in the `friendship-backend` directory with the following:
    ```
    PG_USER=postgres
    PG_PASSWORD=yourpassword
    PG_HOST=localhost
    PG_DATABASE=client_db
    PG_PORT=5432
    ```
3. Run the command:
    ```bash
    docker-compose up --build
    ```
4. The backend will be available at `http://localhost:3000/api`.
5. Start the frontend by navigating to `friendship-frontend` and running:
    ```bash
    npm start
    ```

### Without Docker
1. Follow the steps in the Backend and Frontend sections to set up both environments locally.
2. Make sure the backend server is running before starting the frontend.

---

## Environment Variables
### Backend
- `PG_USER`: PostgreSQL username
- `PG_PASSWORD`: PostgreSQL password
- `PG_HOST`: Database host
- `PG_PORT`: Database port (default: `5432`)
- `PG_DATABASE`: Name of the PostgreSQL database

### Frontend
- `REACT_APP_API_URL`: Base URL for API requests (default: `http://localhost:3000/api`)

---

## Development
### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- Docker (for containerized setup)

### Available Scripts
- **Backend**:
  - `npm start`: Starts the backend server.
  - `npx nodemon src/index.js`: Starts the backend server with Nodemon for development.
- **Frontend**:
  - `npm run dev`: Starts the frontend development server.

---

## Contributing
1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add a meaningful commit message"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---
