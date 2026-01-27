# 🚀 Quick Reference Guide

## Installation & Setup (5 minutes)

```bash
# 1. Install dependencies
cd backend
npm install

# 2. Setup environment
cp .env.example .env
# Edit .env with MongoDB URL and JWT secrets

# 3. Start development server
npm run dev:ts
# Server: http://localhost:3001
```

## Environment Variables

```env
# Required
NODE_ENV=development
PORT=3001
MONGODB_URL=mongodb://localhost:27017/training-portal
JWT_ACCESS_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-key

# Optional (defaults provided)
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
```

## Core Commands

```bash
npm run dev:ts        # Development with auto-reload
npm run build         # Compile TypeScript
npm start             # Production server
npm test              # Run tests
npm lint              # Run linter
npm run format        # Format code
```

## Project Structure

```
backend/
├── src/
│   ├── config/        # Configuration
│   ├── middleware/    # Express middleware
│   ├── models/        # Mongoose schemas
│   ├── repositories/  # Data access layer
│   ├── services/      # Business logic
│   ├── routes/        # API endpoints
│   ├── types/         # TypeScript types
│   ├── utils/         # Utilities
│   └── server.ts      # Express setup
├── dist/              # Compiled output
├── logs/              # Application logs
└── package.json
```

## Key API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
GET    /api/auth/verify
```

### Courses
```
GET    /api/courses
GET    /api/courses/:id
GET    /api/courses/recommendations/:userId
POST   /api/courses/:id/enroll
GET    /api/courses/:id/progress/:userId
```

### Users
```
GET    /api/users/:userId
PUT    /api/users/:userId
GET    /api/users/:userId/stats
POST   /api/users/:userId/progress/:courseId/:moduleId/:lessonId
POST   /api/users/:userId/streak
```

## Response Format

```javascript
// Success
{
  "success": true,
  "message": "...",
  "data": {...},
  "timestamp": "2024-01-26T..."
}

// Error
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "details": "..."
  },
  "timestamp": "2024-01-26T..."
}
```

## Authentication

```javascript
// 1. Register
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'SecurePass123!',
    skillLevel: 'beginner'
  })
});
const { data: { tokens } } = await response.json();

// 2. Use access token
const courseResponse = await fetch('/api/courses/recommendations/user-id', {
  headers: {
    'Authorization': `Bearer ${tokens.accessToken}`
  }
});

// 3. Refresh token when expired
const refreshResponse = await fetch('/api/auth/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refreshToken: tokens.refreshToken })
});
const { data: newTokens } = await refreshResponse.json();
```

## Common Curl Commands

```bash
# Health check
curl http://localhost:3001/health

# Get courses
curl http://localhost:3001/api/courses?page=1&limit=10

# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'

# Get user profile (with auth)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3001/api/users/user-id

# Update progress
curl -X POST http://localhost:3001/api/users/user-id/progress/course-id/module-id/lesson-id \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"completed": true, "timeSpent": 30, "quizScore": 85}'
```

## Database Setup

### MongoDB Local
```bash
# Docker
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  mongo:latest

# Update .env
MONGODB_URL=mongodb://localhost:27017/training-portal
```

### MongoDB Atlas (Cloud)
```
1. Create account at mongodb.com
2. Create cluster
3. Get connection string
4. Update .env: MONGODB_URL=mongodb+srv://...
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Port 3001 in use** | `PORT=3002 npm run dev:ts` or kill process |
| **Cannot connect to MongoDB** | Check MONGODB_URL, ensure MongoDB is running |
| **Token expired** | Use refresh token endpoint to get new access token |
| **CORS errors** | Update CORS_ORIGIN in .env |
| **Password validation fails** | 8+ chars, uppercase, lowercase, number, special char |

## Logging

```bash
# View error logs
tail -f logs/error.log

# View all logs
tail -f logs/combined.log

# Change log level in .env
LOG_LEVEL=debug  # error, warn, info, http, debug
```

## Deployment

### Docker
```bash
docker build -t training-backend .
docker run -p 3001:3001 \
  -e MONGODB_URL=mongodb://... \
  -e JWT_ACCESS_SECRET=... \
  training-backend
```

### Production Environment
```env
NODE_ENV=production
PORT=3001
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/training-portal
JWT_ACCESS_SECRET=generate-long-random-string
JWT_REFRESH_SECRET=another-long-random-string
CORS_ORIGIN=https://yourdomain.com
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=warn
```

## Useful Resources

- **API Docs**: See `API_EXAMPLES.md`
- **Setup Guide**: See `SETUP.md`
- **Full Architecture**: See `BACKEND_ARCHITECTURE.md`
- **Main Docs**: See `README.md`

## Key Features Checklist

- ✅ JWT Authentication
- ✅ Course Management
- ✅ Progress Tracking
- ✅ Recommendations Engine
- ✅ User Statistics
- ✅ Achievement System
- ✅ Role-based Access
- ✅ Input Validation
- ✅ XSS Protection
- ✅ Rate Limiting
- ✅ Error Handling
- ✅ Structured Logging

## File Navigation

| File | Purpose |
|------|---------|
| `src/server.ts` | Express server setup |
| `src/config/config.ts` | Configuration loader |
| `src/types/index.ts` | All TypeScript types |
| `src/middleware/auth.ts` | JWT authentication |
| `src/services/AuthService.ts` | Auth business logic |
| `src/services/CourseService.ts` | Course business logic |
| `src/repositories/UserRepository.ts` | User data access |
| `src/routes/auth.routes.ts` | Auth endpoints |
| `src/routes/courses.routes.ts` | Course endpoints |
| `backend/README.md` | Full documentation |

## Git Workflow

```bash
# Check changes
git status

# View file changes
git diff backend/

# Commit
git add backend/
git commit -m "feat: add complete backend implementation"

# Push
git push origin main
```

## Performance Tips

1. **Enable Caching** - Use Redis for frequently accessed data
2. **Index Databases** - Already done in MongoDB models
3. **Pagination** - Always paginate large datasets
4. **Lean Queries** - Use `.lean()` for read-only operations
5. **Connection Pool** - Already configured (2-10)
6. **Compression** - Add `compression` middleware for production
7. **Rate Limiting** - Already enabled
8. **Error Tracking** - Add Sentry for production

## Security Reminders

🔐 Never commit secrets to git  
🔐 Use strong passwords for testing  
🔐 Change JWT secrets in production  
🔐 Enable HTTPS in production  
🔐 Use environment variables for config  
🔐 Rotate tokens regularly  
🔐 Keep dependencies updated  
🔐 Enable database authentication  
🔐 Use SSL/TLS for database connection  
🔐 Monitor logs for suspicious activity  

## Success Indicators

✅ Health endpoint returns `status: ok`  
✅ Can register new users  
✅ Can login and receive tokens  
✅ Can list courses with pagination  
✅ Can get recommendations  
✅ Can track progress  
✅ No errors in logs  
✅ Database connected  
✅ Rate limiting working  
✅ CORS enabled for frontend  

## Quick Wins for Enhancement

1. Add email notifications (use Nodemailer)
2. Implement Redis caching
3. Add Swagger/OpenAPI docs
4. Setup CI/CD pipeline
5. Add unit tests
6. Add integration tests
7. Setup APM (Application Performance Monitoring)
8. Add admin dashboard endpoints
9. Implement WebSocket for real-time updates
10. Add file upload support

---

**Your backend is ready to go! 🚀**

For detailed documentation, see:
- `backend/README.md` - Full documentation
- `backend/SETUP.md` - Deployment guide
- `BACKEND_ARCHITECTURE.md` - Architecture overview
- `API_EXAMPLES.md` - API request examples
