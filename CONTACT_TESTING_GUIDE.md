# Contact Form Testing Guide

## Quick Start

### Terminal 1: Start Backend Server
```bash
cd backend
npm run dev:ts
```

Expected output:
```
2026-01-27 20:55:00 info: Connecting to PostgreSQL via Neon Serverless...
2026-01-27 20:55:02 info: ✓ Connected to PostgreSQL (Neon Serverless)
2026-01-27 20:55:02 info: Database connected
2026-01-27 20:55:02 info: Server running on port 3001 (development)
2026-01-27 20:55:02 info: CORS enabled for: http://localhost:5173, http://localhost:8080
```

### Terminal 2: Start Frontend Server
```bash
npm run dev
```

Expected output:
```
  VITE v5.4.21  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

## Testing Steps

### 1. Navigate to Contact Page
- Open http://localhost:5173/contact
- Verify form displays with all fields
- Check contact info sidebar is visible

### 2. Test Validation

#### 2.1 Submit Empty Form
- Click "Send Message" without filling fields
- Expected: Error messages for required fields
  - "Name is required"
  - "Invalid email address"
  - "Subject is required"
  - "Message is required"

#### 2.2 Test Invalid Email
- Enter: `invalidemail@`
- Expected: "Invalid email address" error

#### 2.3 Test Max Length
- Name: Enter 101+ characters
- Expected: "Name must be less than 100 characters"

### 3. Test Successful Submission

#### 3.1 Fill Form Correctly
```
Name: John Doe
Email: john@example.com
Phone: +1 (555) 123-4567
Company: Acme Corp
Subject: Partnership Inquiry
Message: I'd like to discuss a partnership opportunity.
```

#### 3.2 Submit Form
- Click "Send Message"
- Expected: "Sending..." state on button
- Expected: Success toast: "Message sent successfully! We'll get back to you within 24 hours."
- Expected: Form clears all fields

### 4. Verify Database Storage

#### 4.1 Using cURL
```bash
curl http://localhost:3001/api/contact
```

Expected response:
```json
{
  "success": true,
  "data": {
    "contacts": [
      {
        "id": "...",
        "name": "John Doe",
        "email": "john@example.com",
        "subject": "Partnership Inquiry",
        "status": "new",
        "createdAt": "2026-01-27T20:55:00.000Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10,
    "hasMore": false
  }
}
```

#### 4.2 Using Prisma Studio
```bash
cd backend
npx prisma studio
```

- Navigate to Contact table in browser UI
- Verify all submitted forms are stored
- Check status field (should be "new")

### 5. Test Retrieval Endpoint

```bash
# Replace with actual ID from previous test
curl http://localhost:3001/api/contact/cly1a2b3c4d5e6f7g8h9i0j
```

Expected:
- Contact details returned
- Status changes to "read"

### 6. Test Pagination

```bash
curl "http://localhost:3001/api/contact?page=1&limit=5"
```

Expected:
- Returns max 5 contacts per page
- Includes `hasMore: true/false` indicator

## Browser Console Tests

### Monitor Network Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Submit contact form
4. Verify request:
   - Method: POST
   - URL: http://localhost:3001/api/contact/submit
   - Status: 201 (Created)

### Monitor Toast Notifications
1. Check for success/error toast messages
2. Verify content matches expected messages
3. Check toast styling and animations

## Edge Cases to Test

### 1. Network Error (Optional)
- Stop backend server while form is visible
- Try to submit
- Expected: Error toast with network error message

### 2. Special Characters in Message
```
Subject: Test & Special <Characters> "Quotes"
Message: Test with @mentions and #hashtags
```
- Expected: Form submits successfully
- Verify no XSS issues

### 3. Very Long Message
```
Message: [2000 characters of text]
```
- Expected: Form accepts and submits
- Verify stored correctly in database

### 4. Multiple Rapid Submissions
- Submit form
- Immediately click "Send Message" again before response
- Expected: Button disabled during submission
- Expected: Only one submission created

### 5. Optional Fields
- Submit with only required fields filled
- Leave phone and company empty
- Expected: Form submits successfully
- Verify optional fields stored as empty strings

## Performance Testing

### 1. Form Load Time
- Clear browser cache
- Visit http://localhost:5173/contact
- Check DevTools > Performance
- Expected: Page loads in < 2 seconds

### 2. Form Submission Time
- Monitor DevTools > Network
- Submit form
- Expected: API response in < 1 second

### 3. List Large Number of Contacts
```bash
# Submit multiple forms to create 100+ contacts
for i in {1..50}; do
  curl -X POST http://localhost:3001/api/contact/submit \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"User $i\",\"email\":\"user$i@example.com\",\"subject\":\"Test $i\",\"message\":\"Message $i\"}"
done
```

Then test pagination:
```bash
curl "http://localhost:3001/api/contact?page=1&limit=10"
curl "http://localhost:3001/api/contact?page=2&limit=10"
```

## Common Issues and Solutions

### Issue: CORS Error
```
Access to XMLHttpRequest at 'http://localhost:3001/api/contact/submit' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution**: 
- Verify backend is running
- Check CORS is enabled in backend (should be by default)
- Verify frontend is on http://localhost:5173

### Issue: 404 Not Found
```
POST http://localhost:3001/api/contact/submit 404 (Not Found)
```

**Solution**:
- Verify backend is running: `npm run dev:ts`
- Check routes are registered in server.ts
- Verify contact.routes.ts is imported

### Issue: Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution**:
- Verify Neon PostgreSQL connection URL in .env
- Check internet connection
- Verify DATABASE_URL is set correctly

### Issue: Form Won't Submit
**Cause**: Validation errors

**Solution**:
- Check browser console for error details
- Verify all required fields are filled
- Check email format is valid
- Verify no fields exceed max length

## Cleanup

### Reset Database (WARNING: Deletes all contacts)
```bash
cd backend
npx prisma migrate reset
```

### Clear Form Data
- Right-click input fields
- Select "Clear recent searches" in browser

## Documentation

- Backend API: See `/backend/src/routes/contact.routes.ts`
- Service Logic: See `/backend/src/services/ContactService.ts`
- Frontend Form: See `/src/pages/Contact.tsx`
- API Config: See `/src/utils/api.ts`
- Full Documentation: See `CONTACT_FORM_README.md`

## Success Criteria

✅ Form displays correctly on Contact page
✅ Client-side validation prevents empty submissions
✅ Invalid email formats are rejected
✅ Successful submissions show success toast
✅ Form clears after successful submission
✅ Submissions are stored in PostgreSQL database
✅ API endpoints return correct responses
✅ No console errors during submission
✅ CORS works between frontend and backend
✅ Optional fields can be left empty
✅ Special characters are handled safely
✅ Pagination works for contact list
✅ Status field tracks read/unread status
