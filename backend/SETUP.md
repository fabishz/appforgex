# Backend Setup & Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB 5.0+ (local or Atlas cloud)
- npm or yarn

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Setup

```bash
# Create environment file
cp .env.example .env

# Edit with your settings
nano .env
```

**Minimum required settings:**
```env
NODE_ENV=development
PORT=3001
MONGODB_URL=mongodb://localhost:27017/training-portal
JWT_ACCESS_SECRET=dev-access-secret
JWT_REFRESH_SECRET=dev-refresh-secret
```

### 3. Start Development Server

```bash
# Using ts-node (with auto-reload)
npm run dev:ts

# Or compile and run
npm run build
npm start
```

The server should start on `http://localhost:3001`

### 4. Verify Installation

```bash
# Check health endpoint
curl http://localhost:3001/health

# Expected response:
{
  "status": "ok",
  "timestamp": "2024-01-26T...",
  "environment": "development",
  "uptime": 12.345
}
```

## 📱 MongoDB Setup

### Local MongoDB

```bash
# Using Docker (recommended)
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:latest

# Update .env
MONGODB_URL=mongodb://admin:password@localhost:27017/training-portal
```

### MongoDB Atlas (Cloud)

1. Create account at mongodb.com/cloud
2. Create a cluster
3. Get connection string
4. Update `.env`:
   ```env
   MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/training-portal
   ```

## 🔨 Build & Deployment

### Development Build

```bash
npm run dev:ts
```

### Production Build

```bash
# Compile TypeScript
npm run build

# Start server
npm start
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy compiled code
COPY dist ./dist

# Create logs directory
RUN mkdir -p logs

EXPOSE 3001

CMD ["node", "dist/server.js"]
```

**Build and run:**
```bash
docker build -t training-portal-backend .
docker run -d \
  --name backend \
  -p 3001:3001 \
  -e MONGODB_URL=mongodb://mongodb:27017/training-portal \
  -e JWT_ACCESS_SECRET=your-secret \
  --link mongodb:mongodb \
  training-portal-backend
```

### Environment Configuration for Production

```env
NODE_ENV=production
PORT=3001
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/training-portal
JWT_ACCESS_SECRET=generate-long-random-string-here
JWT_REFRESH_SECRET=generate-another-long-random-string
CORS_ORIGIN=https://yourdomain.com
RATE_LIMIT_MAX_REQUESTS=100
BCRYPT_ROUNDS=12
LOG_LEVEL=warn
```

**Generate secure secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm test:watch
```

## 📊 Database Seeding

To seed initial course data:

```typescript
import { courseRepository } from './repositories/CourseRepository';
import { courses } from './data/courses';

await courseRepository.seedCourses(courses);
```

## 🔍 Monitoring

### Logs

Logs are saved to `logs/` directory:
- `logs/combined.log` - All logs
- `logs/error.log` - Error logs only

### Health Check

Monitor server health:

```bash
# Periodic health check
while true; do
  curl http://localhost:3001/health
  sleep 30
done
```

### Performance Monitoring

Consider adding:
- **APM Tools**: New Relic, Datadog, or Sentry
- **Metrics**: Prometheus + Grafana
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)

## 🚨 Troubleshooting

### MongoDB Connection Failed

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Ensure MongoDB is running
- Check `MONGODB_URL` in `.env`
- Verify credentials if using authentication

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::3001
```

**Solution:**
```bash
# Find process using port
lsof -i :3001

# Kill process
kill -9 <PID>

# Or change PORT in .env
PORT=3002
```

### JWT Errors

```
Error: jwt malformed / JsonWebTokenError
```

**Solution:**
- Clear browser cache/tokens
- Regenerate JWT secrets
- Ensure tokens are in "Bearer <token>" format

### Out of Memory

```
FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed
```

**Solution:**
- Increase Node.js heap: `NODE_OPTIONS="--max-old-space-size=4096"`
- Optimize MongoDB queries
- Add more RAM or scale horizontally

## 📈 Scaling

### Horizontal Scaling

1. **Load Balancer**: Nginx or AWS ELB
2. **Multiple Instances**: Run multiple server processes
3. **Shared Database**: Single MongoDB instance or replica set

```nginx
upstream backend {
    server localhost:3001;
    server localhost:3002;
    server localhost:3003;
}

server {
    listen 80;
    location /api {
        proxy_pass http://backend;
    }
}
```

### Database Optimization

```typescript
// Connection pooling (already configured)
maxPoolSize: 10
minPoolSize: 2

// Indexed queries
db.users.createIndex({ email: 1 })
db.courses.createIndex({ category: 1, skillLevel: 1 })

// Lean queries for read-only
Course.find().lean()
```

### Caching Layer

Consider Redis for caching:

```typescript
import redis from 'redis';

const cache = redis.createClient();

// Cache recommendations
await cache.set(
  `recommendations:${userId}`,
  JSON.stringify(recommendations),
  'EX',
  3600
);
```

## 🔐 Security Hardening

### Production Checklist

- [ ] Change all secrets/API keys
- [ ] Enable HTTPS/SSL
- [ ] Set CORS properly
- [ ] Enable rate limiting
- [ ] Set up monitoring/logging
- [ ] Enable request/response validation
- [ ] Use strong passwords for database
- [ ] Regular backups of database
- [ ] Security headers configured
- [ ] Input sanitization enabled
- [ ] SQL/NoSQL injection prevention
- [ ] CSRF protection if needed

### SSL/TLS Certificate

```bash
# Using Let's Encrypt with Certbot
sudo certbot certonly --standalone -d yourdomain.com

# Configure in reverse proxy (Nginx)
listen 443 ssl;
ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
```

## 📞 Support

For issues:
1. Check logs: `tail -f logs/error.log`
2. Check environment: `echo $MONGODB_URL`
3. Test connectivity: `nc -zv localhost 27017`
4. Review error messages carefully

## 📚 Resources

- [Express.js Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [JWT Guide](https://jwt.io/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
