# Neon PostgreSQL Setup Guide

## 5-Minute Quick Start

### Step 1: Create Neon Account & Database
1. Go to [https://console.neon.tech](https://console.neon.tech)
2. Sign up (free tier available)
3. Create a new project
4. Copy your connection string from the dashboard

### Step 2: Configure Local Environment
```bash
cd backend
cp .env.example .env

# Edit .env and add your Neon connection string:
# DATABASE_URL=postgresql://user:password@ep-xxx.region.neon.tech/database?sslmode=require
```

### Step 3: Install & Initialize
```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
```

### Step 4: Verify Setup
```bash
npm run build
npm run dev:ts

# Should see: "✓ Connected to PostgreSQL (Neon Serverless)"
```

## Connection String Format

```
postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

### Example:
```
postgresql://user_abc:MySecurePass123@ep-cool-water-12345.us-east-1.neon.tech/training_portal?sslmode=require
```

### Finding Your Connection String in Neon:
1. Go to Neon Console
2. Click on your project
3. Go to "Connection Details" (top right)
4. Select "Prisma" from the dropdown
5. Copy the full connection string

## Common Issues & Solutions

### "Can't reach database server"
```bash
# Check connection string has correct format
# Make sure sslmode=require is included
# Verify you copied the entire string
```

### "Database already exists"
```bash
# This is normal on first run
# Prisma will create the schema automatically
```

### "Connection pool exhausted"
```bash
# Add pgbouncer to connection string:
# ...?sslmode=require&pgbouncer=true
```

## Database Management

### View Data with Prisma Studio
```bash
npx prisma studio
# Opens web UI at http://localhost:5555
```

### Run Migrations
```bash
# See pending migrations
npx prisma migrate dev

# Apply to production
npx prisma migrate deploy

# Reset (careful - deletes data!)
npx prisma migrate reset
```

### Seed Database
```bash
# Create src/prisma/seed.ts (if not exists)
npx prisma db seed
```

## Environment Variables

Required for backend to run:
```bash
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://...

JWT_ACCESS_SECRET=your-secret
JWT_REFRESH_SECRET=your-secret
CORS_ORIGIN=http://localhost:5173
```

## Deployment

### To Neon Production:
```bash
# 1. Create production Neon project
# 2. Get production connection string
# 3. Add to production environment
# 4. Run migrations:
npx prisma migrate deploy

# 5. Start production server
NODE_ENV=production npm start
```

## Helpful Commands

```bash
# Check Prisma version
npx prisma version

# Generate Prisma Client
npx prisma generate

# Format schema.prisma
npx prisma format

# Validate schema
npx prisma validate

# Open Prisma Studio
npx prisma studio

# See schema visualization
npx prisma studio --open

# Check for drift between schema and database
npx prisma migrate dev --name describe

# Get SQL for pending migrations
npx prisma migrate diff --from-schema-datamodel prisma/schema.prisma
```

## Performance Tips

1. **Use connection pooling in production**
   - Add `&pgbouncer=true` to connection string

2. **Enable query logging in dev**
   - Already configured in database.ts

3. **Create indexes** (automatic in schema)
   - Already present for email, category, skillLevel

4. **Batch operations**
   - Use `createMany`, `updateMany` when possible

5. **Select only needed fields**
   - Reduce data transferred with select()

## Free Neon Resources

- Free tier: Up to 3 projects, 1 compute unit
- No credit card required
- Full PostgreSQL 15+
- Auto-scaling included
- 0.5 GB storage included

## Next Steps

After setup:
1. ✅ Database is ready
2. ✅ Backend can connect
3. ✅ Frontend can call APIs
4. ✅ Deploy to production

## Support

- Neon Docs: https://neon.tech/docs
- Prisma Docs: https://www.prisma.io/docs
- Community: https://neon.tech/community
