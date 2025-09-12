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
- **Backend**: Deployed on Render with PostgreSQL
- **Database**: PostgreSQL on Render

## API Documentation

Visit `/api-docs` when running the backend to see Swagger documentation.
Live API docs: https://mini-learning-platform.onrender.com/api-docs

## Demo

🚀 **Live Demo**: https://mini-learning-platform.vercel.app

### Demo Credentials:
- **Email**: user@example.com
- **Password**: user123

### Features to Try:
1. Login with demo credentials
2. Select a category (Programming/Math/English)
3. Choose a subcategory
4. Ask a question and get AI response
5. View your learning history
6. Try logout functionality

## Project Structure

```
mini-learning-platform/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Data access layer
│   │   ├── middleware/     # Auth & validation
│   │   └── types/         # TypeScript definitions
│   ├── prisma/            # Database schema & migrations
│   └── .env.example       # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── pages/         # React pages
│   │   ├── components/    # Reusable components
│   │   ├── api/          # API service layer
│   │   ├── hooks/        # Custom React hooks
│   │   └── types/        # TypeScript definitions
│   └── .env.example      # Environment variables template
└── docker-compose.yml    # Local PostgreSQL setup
```

## Assumptions Made

- Users need authentication to access learning features
- AI responses are generated using OpenAI API
- Categories and subcategories are pre-seeded
- Learning history is stored per user
- Admin users can manage categories (future feature)
- Secure HTTP-only cookies for JWT storage
- English interface for international accessibility

## Technologies & Best Practices

- **Clean Architecture**: Separated layers (routes/controllers/services)
- **Type Safety**: Full TypeScript implementation
- **Security**: JWT with HTTP-only cookies, input validation, helmet
- **Documentation**: Comprehensive Swagger API docs
- **Database**: Prisma ORM with PostgreSQL
- **Testing Ready**: Structure supports easy test implementation
- **Docker**: Local development with Docker Compose
- **CI/CD**: Automated deployment on git push

## License

MIT