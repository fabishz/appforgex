# Training Portal Backend API

A modern, scalable, and secure backend for a comprehensive training portal with course management, user authentication, progress tracking, and personalized recommendations.

## 🚀 Features

### Core Features
- **User Authentication**: JWT-based authentication with refresh tokens
- **Course Management**: Complete course management system with modules and lessons
- **Progress Tracking**: Real-time progress tracking with detailed statistics
- **Achievements**: Badge and certificate system
- **Smart Recommendations**: AI-powered personalized course recommendations
- **Learning Analytics**: Comprehensive learning statistics and streak tracking

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Password Security**: Bcrypt hashing with configurable rounds
- **CORS Protection**: Configurable cross-origin resource sharing
- **Rate Limiting**: Built-in rate limiting to prevent abuse
- **Input Sanitization**: XSS protection through HTML sanitization
- **Helmet.js**: Security headers for HTTP responses

### Scalability Features
- **MongoDB**: NoSQL database with connection pooling
- **Indexed Queries**: Optimized database queries with strategic indexing
- **Pagination**: Efficient data pagination for large datasets
- **Async/Await**: Non-blocking asynchronous operations
- **Error Handling**: Comprehensive error handling and logging

### Monitoring & Logging
- **Winston Logger**: Structured logging with multiple transports
- **Health Checks**: Built-in health check endpoint
- **Request Logging**: HTTP request/response logging
- **Error Tracking**: Detailed error logging with stack traces

## 📋 Prerequisites

- Node.js 18+
- MongoDB 5.0+
- npm or yarn

## 🔧 Installation

1. **Clone and setup**
```bash
cd backend
npm install
```

2. **Environment Configuration**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Application
NODE_ENV=development
PORT=3001

# Database
MONGODB_URL=mongodb://localhost:27017/training-portal

# JWT
JWT_ACCESS_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-key

# Security
CORS_ORIGIN=http://localhost:5173

# Logging
LOG_LEVEL=info
```

3. **Build**
```bash
npm run build
```

4. **Start Development Server**
```bash
npm run dev:ts
```

5. **Start Production Server**
```bash
npm run build
npm start
```

## 📚 API Endpoints

### Authentication (`/api/auth`)

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "skillLevel": "beginner"
}

Response: { user, tokens, expiresIn }
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response: { user, tokens, expiresIn }
```

#### Refresh Token
```
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}

Response: { accessToken, refreshToken, expiresIn }
```

#### Verify Token
```
GET /api/auth/verify
Authorization: Bearer your-access-token

Response: { user }
```

### Courses (`/api/courses`)

#### Get All Courses
```
GET /api/courses?page=1&limit=10&skillLevel=beginner&category=web-development&sortBy=popular

Response: { courses[], pagination: { page, limit, total, hasMore } }
```

#### Get Course Details
```
GET /api/courses/:courseId

Response: { course }
```

#### Get Recommendations
```
GET /api/courses/recommendations/:userId?limit=5
Authorization: Bearer your-access-token

Response: { recommendations[] }
```

#### Enroll in Course
```
POST /api/courses/:courseId/enroll
Authorization: Bearer your-access-token

Response: { success: true }
```

#### Get Course Progress
```
GET /api/courses/:courseId/progress/:userId
Authorization: Bearer your-access-token

Response: { courseProgress }
```

### Users (`/api/users`)

#### Get User Profile
```
GET /api/users/:userId

Response: { user }
```

#### Update User Profile
```
PUT /api/users/:userId
Authorization: Bearer your-access-token
Content-Type: application/json

{
  "name": "Updated Name",
  "skillLevel": "intermediate",
  "interests": ["web-development", "ai-ml"]
}

Response: { user }
```

#### Get Learning Statistics
```
GET /api/users/:userId/stats

Response: {
  totalCourses,
  completedCourses,
  inProgressCourses,
  totalLessons,
  completedLessons,
  totalLearningTime,
  certificatesEarned,
  averageQuizScore,
  currentStreak,
  longestStreak
}
```

#### Update Lesson Progress
```
POST /api/users/:userId/progress/:courseId/:moduleId/:lessonId
Authorization: Bearer your-access-token
Content-Type: application/json

{
  "completed": true,
  "timeSpent": 30,
  "quizScore": 85,
  "attempts": 2
}

Response: { success: true }
```

#### Update Learning Streak
```
POST /api/users/:userId/streak
Authorization: Bearer your-access-token

Response: { success: true }
```

## 🏗️ Architecture

### Project Structure

```
backend/
├── src/
│   ├── config/              # Configuration
│   │   ├── config.ts       # Environment config
│   │   └── database.ts     # MongoDB connection
│   ├── middleware/          # Express middleware
│   │   ├── auth.ts         # JWT authentication
│   │   ├── errorHandler.ts # Error handling
│   │   ├── logger.ts       # Winston logger
│   │   └── validation.ts   # Input validation
│   ├── models/              # Mongoose schemas
│   │   ├── User.ts
│   │   └── Course.ts
│   ├── repositories/        # Data access layer
│   │   ├── UserRepository.ts
│   │   └── CourseRepository.ts
│   ├── services/            # Business logic
│   │   ├── AuthService.ts
│   │   ├── CourseService.ts
│   │   └── ProgressService.ts
│   ├── routes/              # API routes
│   │   ├── auth.routes.ts
│   │   ├── courses.routes.ts
│   │   └── user.routes.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── utils/               # Utilities
│   │   ├── jwt.ts
│   │   ├── password.ts
│   │   └── helpers.ts
│   └── server.ts            # Express server
├── dist/                    # Compiled output
├── logs/                    # Application logs
├── .env.example             # Environment template
├── package.json
└── tsconfig.json
```

### Design Patterns

- **Repository Pattern**: Abstracted data access layer
- **Service Pattern**: Centralized business logic
- **Middleware Pattern**: Composable request handlers
- **Factory Pattern**: Object creation utilities
- **Singleton Pattern**: Single instance services

### Authentication Flow

```
Client Request
    ↓
Auth Middleware (Verify JWT)
    ↓
Extract User Info from Token
    ↓
Attach to Request Object
    ↓
Route Handler (Protected)
    ↓
Response
```

## 🔐 Security Best Practices

### Implemented

1. **JWT Tokens**
   - Short-lived access tokens (15 minutes)
   - Longer-lived refresh tokens (7 days)
   - Token verification on protected routes

2. **Password Security**
   - Bcrypt hashing (10 rounds)
   - Strength validation (8+ chars, uppercase, lowercase, number, special char)
   - Never stored in plain text

3. **Input Validation**
   - Email format validation
   - Type checking
   - Length limits
   - XSS sanitization

4. **HTTP Security**
   - CORS configuration
   - Rate limiting
   - Security headers (Helmet.js)
   - Secure cookie flags

5. **Authorization**
   - Role-based access control
   - User ownership verification
   - Protected routes

### Recommended for Production

1. **HTTPS**: Always use HTTPS in production
2. **Secrets Management**: Use environment variables or secret managers
3. **API Keys**: For external integrations
4. **CAPTCHA**: For registration to prevent bots
5. **Two-Factor Authentication**: For enhanced security
6. **Request Signing**: For critical operations
7. **Audit Logging**: Track all user actions
8. **DDoS Protection**: Cloudflare or similar service

## 📊 Data Models

### User Model
```typescript
{
  id: string (unique)
  name: string
  email: string (unique)
  password: string (hashed)
  role: 'student' | 'instructor' | 'admin'
  skillLevel: 'beginner' | 'intermediate' | 'advanced'
  enrolledCourses: string[]
  completedCourses: string[]
  courseProgress: CourseProgress[]
  achievements: Achievement[]
  totalLearningTime: number (minutes)
  currentStreak: number (days)
  longestStreak: number (days)
  lastActiveDate: Date
  createdAt: Date
  updatedAt: Date
}
```

### Course Model
```typescript
{
  id: string (unique)
  title: string
  skillLevel: 'beginner' | 'intermediate' | 'advanced'
  category: CourseCategory
  modules: Module[]
  prerequisites: string[]
  duration: number (hours)
  enrollmentCount: number
  certificateOffered: boolean
  tags: string[]
  createdAt: Date
  updatedAt: Date
}
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage
npm run test:coverage
```

## 📈 Performance Considerations

1. **Database Indexing**: Frequently queried fields are indexed
2. **Connection Pooling**: MongoDB connection pooling for efficiency
3. **Pagination**: Large datasets are paginated
4. **Caching**: Consider implementing Redis for caching
5. **Query Optimization**: Lean queries for read-only operations

## 🚀 Deployment

### Docker (Recommended)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY dist ./dist
EXPOSE 3001
CMD ["node", "dist/server.js"]
```

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3001
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_ACCESS_SECRET=very-long-random-string-generate-one
JWT_REFRESH_SECRET=another-long-random-string
CORS_ORIGIN=https://yourdomain.com
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=warn
```

## 📝 License

ISC

## 👥 Support

For issues and feature requests, please open an issue on the repository.
