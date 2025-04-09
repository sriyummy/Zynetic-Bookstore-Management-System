Zynetic Bookstore

A full-stack bookstore management platform built using NestJS (TypeScript) for the backend and a separate frontend application (e.g., React or similar). This project supports containerized deployment using Docker and is designed with modularity, scalability, and best practices in mind.

---

Project Structure

. ├── dist/ # Compiled backend code (ignored) ├── frontend/ # Frontend application ├── node_modules/ # Backend dependencies (ignored) ├── src/ # NestJS source code ├── test/ # Test files ├── .env # Environment variables (ignored) ├── docker-compose.yml # Docker multi-service config ├── Dockerfile # Backend Docker image definition ├── package.json # Backend dependencies and scripts ├── README.md # Project guide (this file) └── ...

yaml

---

Getting Started
 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+)
- [Docker](https://www.docker.com/) (optional but recommended)
- [npm](https://www.npmjs.com/)

---

⚙️ Backend Setup (NestJS)

```bash
# Install dependencies
npm install

# Create a .env file
cp .env.sample .env

# Start the backend server
npm run start:dev
💻 Frontend Setup
bash
Copy
Edit
cd frontend

# Install frontend dependencies
npm install

# Run frontend development server
npm run dev
🐳 Docker Setup
To run both frontend and backend via Docker:

bash
Copy
Edit
# Build and run all services
docker-compose up --build
🔑 Environment Variables
Create a .env file in the root directory based on .env.sample.

env
Copy
Edit
PORT=3000
DATABASE_URL=mongodb://localhost:27017/zynetic
JWT_SECRET=your-super-secret-key
❗Never commit real .env files. Always use .env.sample for reference.

🧪 Scripts
Script	Description
npm run start	Run backend in production mode
npm run start:dev	Run backend in watch mode
npm run test	Run unit tests
npm run build	Compile TypeScript to JS
📦 Deployment Ready
✅ Dockerized
✅ Configurable with .env
✅ Works with npm and docker-compose
✅ Modular and readable folder structure