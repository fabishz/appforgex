# Contact Form - Quick Reference Guide

## 🚀 Quick Start (2 Minutes)

### Terminal 1: Start Backend
```bash
cd backend
npm run dev:ts
```

### Terminal 2: Start Frontend  
```bash
npm run dev
```

### Browser
Navigate to: `http://localhost:5173/contact`

## 📋 Form Fields

| Field | Type | Required | Example |
|-------|------|----------|---------|
| Name | Text | ✅ | John Doe |
| Email | Email | ✅ | john@example.com |
| Phone | Text | ❌ | +1 (555) 123-4567 |
| Company | Text | ❌ | Acme Corp |
| Subject | Text | ✅ | Partnership Inquiry |
| Message | Textarea | ✅ | I'd like to discuss... |

## 🔗 API Endpoints

### Submit Form
```bash
curl -X POST http://localhost:3001/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test",
    "message": "Hello"
  }'
```
**Response**: `201 Created`

### Get All Contacts
```bash
curl http://localhost:3001/api/contact
```
**Response**: `200 OK` with pagination

### Get Specific Contact
```bash
curl http://localhost:3001/api/contact/{id}
```
**Response**: `200 OK` with contact details

## 📂 Key Files

| Location | Purpose |
|----------|---------|
| `src/pages/Contact.tsx` | Frontend form |
| `src/utils/api.ts` | API utilities |
| `backend/src/routes/contact.routes.ts` | API routes |
| `backend/src/services/ContactService.ts` | Business logic |
| `backend/prisma/schema.prisma` | Database schema |

## ✅ Validation Rules

```
Name: 1-100 characters
Email: Valid format, max 255 characters
Phone: Max 20 characters
Company: Max 100 characters
Subject: 1-200 characters
Message: 1-2000 characters
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS Error | Start backend first |
| 404 Not Found | Verify backend is running |
| Database Error | Check .env DATABASE_URL |
| Form won't submit | Check browser console |
| Can't see submissions | Use `curl http://localhost:3001/api/contact` |

## 📊 Database Query

### View All Submissions
```bash
cd backend
npx prisma studio
```
Then open browser UI and click on Contact table.

### Search Submissions
```bash
# Via API
curl "http://localhost:3001/api/contact?page=1&limit=10"
```

## 🧪 Test Cases

✅ Fill form completely and submit
✅ Submit without required fields
✅ Enter invalid email
✅ Test special characters
✅ Check database after submission
✅ Verify success notification

## 📖 Full Documentation

- **Setup Guide**: `CONTACT_FORM_README.md`
- **Testing Guide**: `CONTACT_TESTING_GUIDE.md`
- **Build Summary**: `CONTACT_FORM_BUILD_SUMMARY.md`

## 🎯 What Works

✅ Form validation (client + server)
✅ Database persistence
✅ Success/error notifications
✅ Auto form reset
✅ Responsive design
✅ Contact info sidebar
✅ Pagination support
✅ Status tracking

## 🔄 Next Steps

1. Test form submission locally
2. Check database with `npx prisma studio`
3. Try all validation scenarios
4. Review API responses with curl
5. Deploy to production

## 📞 Support Links

- Backend Logs: Check Terminal 1 console output
- Frontend Logs: Check Browser DevTools Console
- Database: `npx prisma studio` in backend folder
- API Status: `curl http://localhost:3001/health`

---

**Everything is ready to test!** Start both servers and navigate to the contact page.
