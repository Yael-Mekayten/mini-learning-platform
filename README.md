# Mini Learning Platform

A full-stack learning platform built with React, TypeScript, Node.js, and PostgreSQL.

## Features

- 🔐 JWT Authentication with secure cookies
- 📚 Interactive learning sessions
- 👥 User management and admin dashboard
- 📊 Learning history and progress tracking
- 🎨 Modern responsive UI with Tailwind CSS
- 🔧 Full TypeScript support
- 📖 Swagger API documentation

## Tech Stack

**Frontend:**
- React 19 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Vite for build tooling

**Backend:**
- Node.js with Express
- TypeScript
- Prisma ORM with PostgreSQL
- JWT authentication
- Swagger documentation
- Helmet for security

## Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose (for local database)
- OR PostgreSQL database (if not using Docker)

### Backend Setup

#### Option 1: With Docker (Recommended)
```bash
# Start PostgreSQL with Docker
docker-compose up -d

# Setup backend
cd backend
npm install
cp .env.example .env
# .env is already configured for Docker database
npx prisma migrate dev
npx prisma db seed
npm run dev
```

#### Option 2: With existing PostgreSQL
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database URL and JWT secret
npx prisma migrate dev
npx prisma db seed
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your API URL
npm run dev
```

## Deployment

- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Railway with PostgreSQL
- **Database**: PostgreSQL on Railway

## API Documentation

Visit `/api-docs` when running the backend to see Swagger documentation.

## Demo

🚀 **Live Demo**: [Coming Soon]

## License

MIT