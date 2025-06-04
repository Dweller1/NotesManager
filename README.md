## How to run the project

### 1. Clone the repository and install dependecies

```bash
git clone https://github.com/Dweller1/NotesManager.git

cd notes-backend or cd notes-app-frontend

npm install
```

## Backend

### Tech-stack

- Nest js

- TypeORM

- PostgreSQL

- class-validator

### Requirements

- Node.js v16+

- PostgreSQL 12+

- npm or yarn

### 1. Configure the database

```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DB=notes
PORT=3000
```

### 2. Start the backend

```
npm run start:dev
```

```bash
git clone https://github.com/Dweller1/NotesManager.git

cd notes-backend or cd notes-app-frontend

npm install
```

## Frontend

### Tech-stack

```
React 18+

TypeScript

Axios

react-hook-form

```

### 3. Configure API_URL

```bash
const API_URL = "http://localhost:3000/notes";
Or change the API_URL according to your .env in the notes-backend folder
```

### 4. Start the app

```bash
npm run dev
```
