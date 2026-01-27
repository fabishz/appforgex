# Contact Form Feature Documentation

## Overview

A fully functional contact form system that allows visitors to submit inquiries through the website. The form includes:

- **Frontend**: React form with real-time validation using Zod
- **Backend**: Express API endpoint with PostgreSQL/Prisma persistence
- **Validation**: Client-side and server-side validation
- **Error Handling**: Comprehensive error messages and user feedback
- **API Integration**: RESTful API for form submissions and retrieval

## Features

### Frontend (Contact.tsx)

✅ **Form Fields**
- Name (required)
- Email (required, validated)
- Phone (optional)
- Company (optional)
- Subject (required)
- Message (required, up to 2000 characters)

✅ **Validation**
- Client-side validation using Zod schema
- Real-time error clearing on field change
- Server-side validation with detailed error messages
- Field-level error display

✅ **User Experience**
- Loading state while submitting
- Success/error toast notifications
- Form reset after successful submission
- Contact information sidebar with links
- Responsive design (mobile, tablet, desktop)

✅ **Styling**
- Shadcn/ui components
- Tailwind CSS
- Gradient effects
- Hover animations
- Border and shadow styling

### Backend API

#### Endpoint: POST `/api/contact/submit`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "company": "Acme Corp",
  "subject": "Partnership Inquiry",
  "message": "I'd like to discuss a partnership opportunity..."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "id": "abc123xyz",
    "message": "We will get back to you within 24 hours."
  },
  "timestamp": "2026-01-27T20:55:00.000Z"
}
```

**Validation Error Response (400):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "details": "{\"name\": \"Name is required\", \"email\": \"Invalid email address\"}"
  },
  "timestamp": "2026-01-27T20:55:00.000Z"
}
```

#### Endpoint: GET `/api/contact/:id`

Retrieve a specific contact submission and mark it as read.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "abc123xyz",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "company": "Acme Corp",
    "subject": "Partnership Inquiry",
    "message": "I'd like to discuss a partnership opportunity...",
    "status": "read",
    "createdAt": "2026-01-27T20:55:00.000Z",
    "updatedAt": "2026-01-27T20:55:30.000Z"
  },
  "timestamp": "2026-01-27T20:55:30.000Z"
}
```

#### Endpoint: GET `/api/contact`

List all contact submissions with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": {
    "contacts": [...],
    "total": 42,
    "page": 1,
    "limit": 10,
    "hasMore": true
  },
  "timestamp": "2026-01-27T20:55:00.000Z"
}
```

## Database Schema

### Contact Model (Prisma)

```prisma
model Contact {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String   @default("")
  company   String   @default("")
  subject   String
  message   String   @db.Text
  status    String   @default("new") // "new", "read", "responded"
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
  @@index([createdAt])
  @@index([status])
}
```

## File Structure

```
Backend:
├── src/
│   ├── routes/
│   │   └── contact.routes.ts        # Contact API endpoints
│   ├── services/
│   │   └── ContactService.ts        # Business logic
│   ├── server.ts                    # API route registration
│   └── config/
│       └── database.ts              # Prisma client
├── prisma/
│   └── schema.prisma                # Database schema

Frontend:
├── src/
│   ├── pages/
│   │   └── Contact.tsx              # Contact form page
│   ├── utils/
│   │   └── api.ts                   # API utilities
│   └── components/
│       └── layout/
│           └── Layout.tsx           # Page layout wrapper
```

## Setup Instructions

### Backend Setup

1. **Update .env with database URL:**
   ```bash
   DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
   ```

2. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Run Prisma migration:**
   ```bash
   npx prisma migrate dev --name add_contact_model
   ```

4. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

5. **Start development server:**
   ```bash
   npm run dev:ts
   ```

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set API URL (optional):**
   Create `.env.local`:
   ```
   REACT_APP_API_URL=http://localhost:3001
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

## Usage Examples

### Submit Contact Form (JavaScript)

```javascript
import { apiCall, API_ENDPOINTS } from '@/utils/api';

async function submitContactForm(formData) {
  const response = await apiCall(API_ENDPOINTS.CONTACT_SUBMIT, {
    method: 'POST',
    body: JSON.stringify(formData),
  });

  if (response.success) {
    console.log('Submission ID:', response.data.id);
    // Show success message
  } else {
    console.error('Error:', response.error.details);
    // Show error message
  }
}
```

### Retrieve Contact Details (cURL)

```bash
curl http://localhost:3001/api/contact/abc123xyz
```

### List All Submissions (cURL)

```bash
curl "http://localhost:3001/api/contact?page=1&limit=10"
```

## Validation Rules

| Field | Type | Required | Max Length | Constraints |
|-------|------|----------|-----------|-------------|
| name | string | Yes | 100 | Trimmed, non-empty |
| email | string | Yes | 255 | Valid email format |
| phone | string | No | 20 | Phone number format |
| company | string | No | 100 | Company name |
| subject | string | Yes | 200 | Trimmed, non-empty |
| message | string | Yes | 2000 | Trimmed, non-empty |

## Status States

- **new**: Newly submitted contact form
- **read**: Form has been viewed
- **responded**: Response has been sent

## Error Handling

### Client-Side Validation Errors

```json
{
  "name": "Name is required",
  "email": "Invalid email address",
  "subject": "Subject is required"
}
```

### Server-Side API Errors

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "details": "..."
  }
}
```

## Future Enhancements

- [ ] Email notifications to admin
- [ ] Automatic confirmation emails to users
- [ ] Email template system
- [ ] Admin dashboard for contact management
- [ ] Contact categorization
- [ ] Attachment support
- [ ] Rate limiting per IP
- [ ] CAPTCHA integration
- [ ] Webhook notifications
- [ ] CRM integration (HubSpot, Salesforce)

## API Configuration

The frontend uses a centralized API configuration in `src/utils/api.ts`:

```typescript
export const API_BASE_URL = 
  process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  CONTACT_SUBMIT: `${API_BASE_URL}/api/contact/submit`,
  CONTACT_GET: (id: string) => `${API_BASE_URL}/api/contact/${id}`,
  CONTACT_LIST: `${API_BASE_URL}/api/contact`,
  // ... more endpoints
};
```

## Testing the Contact Form

1. **Fill out the form** on the Contact page
2. **Submit** the form
3. **Check API** to verify submission was stored:
   ```bash
   curl http://localhost:3001/api/contact
   ```
4. **Verify database** using Prisma Studio:
   ```bash
   npx prisma studio
   ```

## Troubleshooting

### Form submission fails with 404

**Issue**: Backend API not running
**Solution**: Start backend with `npm run dev:ts`

### Form submission fails with CORS error

**Issue**: CORS not configured
**Solution**: Backend has CORS enabled for `http://localhost:5173` (frontend port)

### Form submissions not appearing in database

**Issue**: Migration not run
**Solution**: Run `npx prisma migrate dev --name add_contact_model`

### Validation errors not displaying

**Issue**: Error parsing failed
**Solution**: Check browser console for details, verify backend response format

## Performance Notes

- Contact submissions are indexed by email and creation date
- Pagination with `limit` parameter for large datasets
- Database queries optimized with appropriate indexes
- Frontend form validation happens before API call

## Security Notes

- Input validation on both client and server
- Text sanitization prevents XSS attacks
- SQL injection prevented through Prisma ORM
- Rate limiting available via express-rate-limit
- CORS configured to allow only frontend origin

## Support

For issues or questions, refer to:
- Backend: `/backend/src/services/ContactService.ts`
- Frontend: `/src/pages/Contact.tsx`
- API Config: `/src/utils/api.ts`
