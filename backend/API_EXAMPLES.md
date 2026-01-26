/**
 * Example API Requests for Testing
 * Import this into Postman or use with curl
 */

// ============ AUTHENTICATION ============

// 1. Register
POST http://localhost:3001/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "skillLevel": "beginner"
}

// Expected Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "skillLevel": "beginner",
      ...
    },
    "tokens": {
      "accessToken": "eyJ...",
      "refreshToken": "eyJ...",
      "expiresIn": 900
    }
  },
  "timestamp": "2024-01-26T..."
}

// 2. Login
POST http://localhost:3001/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

// 3. Refresh Token
POST http://localhost:3001/api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token-here"
}

// 4. Verify Token
GET http://localhost:3001/api/auth/verify
Authorization: Bearer your-access-token-here

// ============ COURSES ============

// 5. Get All Courses
GET http://localhost:3001/api/courses?page=1&limit=10

// Query Parameters:
// - page: number (default: 1)
// - limit: number (default: 10)
// - skillLevel: string (beginner,intermediate,advanced)
// - category: string (web-development,ai-ml,etc)
// - search: string (search term)
// - sortBy: string (popular,recent,rating,duration)

// 6. Get Single Course
GET http://localhost:3001/api/courses/course-id-here

// 7. Get Course Recommendations
GET http://localhost:3001/api/courses/recommendations/user-id-here?limit=5
Authorization: Bearer your-access-token-here

// 8. Enroll in Course
POST http://localhost:3001/api/courses/course-id-here/enroll
Authorization: Bearer your-access-token-here

// Response (200):
{
  "success": true,
  "message": "Successfully enrolled in course",
  "timestamp": "2024-01-26T..."
}

// 9. Get Course Progress
GET http://localhost:3001/api/courses/course-id-here/progress/user-id-here
Authorization: Bearer your-access-token-here

// ============ USERS ============

// 10. Get User Profile
GET http://localhost:3001/api/users/user-id-here

// 11. Update User Profile
PUT http://localhost:3001/api/users/user-id-here
Authorization: Bearer your-access-token-here
Content-Type: application/json

{
  "name": "Updated Name",
  "skillLevel": "intermediate",
  "interests": ["web-development", "ai-ml"],
  "learningGoals": ["Build a full-stack application"]
}

// 12. Get Learning Statistics
GET http://localhost:3001/api/users/user-id-here/stats

// Expected Response:
{
  "success": true,
  "data": {
    "totalCourses": 5,
    "completedCourses": 2,
    "inProgressCourses": 3,
    "totalLessons": 50,
    "completedLessons": 25,
    "totalLearningTime": 1200,
    "certificatesEarned": 2,
    "averageQuizScore": 87,
    "currentStreak": 7,
    "longestStreak": 14
  },
  "timestamp": "2024-01-26T..."
}

// 13. Update Lesson Progress
POST http://localhost:3001/api/users/user-id-here/progress/course-id/module-id/lesson-id
Authorization: Bearer your-access-token-here
Content-Type: application/json

{
  "completed": true,
  "timeSpent": 30,
  "quizScore": 85,
  "attempts": 2
}

// 14. Update Learning Streak
POST http://localhost:3001/api/users/user-id-here/streak
Authorization: Bearer your-access-token-here

// ============ HEALTH CHECK ============

// 15. Health Check
GET http://localhost:3001/health

// Expected Response:
{
  "status": "ok",
  "timestamp": "2024-01-26T...",
  "environment": "development",
  "uptime": 123.456
}

// ============ ERROR EXAMPLES ============

// 400 - Bad Request
// Response:
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "details": "Password must be at least 8 characters long"
  },
  "timestamp": "2024-01-26T..."
}

// 401 - Unauthorized
// Response:
{
  "success": false,
  "error": {
    "code": "AUTHENTICATION_ERROR",
    "details": "Invalid email or password"
  },
  "timestamp": "2024-01-26T..."
}

// 404 - Not Found
// Response:
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "details": "User with ID user-123 not found"
  },
  "timestamp": "2024-01-26T..."
}

// ============ CURL EXAMPLES ============

// Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'

// Get Courses
curl http://localhost:3001/api/courses?page=1&limit=10

// Authenticated Request
curl -H "Authorization: Bearer your-token-here" \
  http://localhost:3001/api/users/user-id

// ============ COMMON STATUS CODES ============

// 200 OK - Successful request
// 201 Created - Resource created successfully
// 202 Accepted - Request accepted for processing
// 204 No Content - Successful, no content to return

// 400 Bad Request - Invalid input
// 401 Unauthorized - Missing/invalid authentication
// 403 Forbidden - Authenticated but not authorized
// 404 Not Found - Resource doesn't exist
// 409 Conflict - Resource conflict

// 500 Internal Server Error - Server error
