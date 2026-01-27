import { Router, Request, Response } from 'express';
import { contactService } from '../services/ContactService.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { ApiResponse } from '../types/index.js';
import { z } from 'zod';

const router = Router();

// Validation schema for contact form
const contactFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email address').max(255),
  phone: z.string().trim().max(20).optional().default(''),
  company: z.string().trim().max(100).optional().default(''),
  subject: z.string().trim().min(1, 'Subject is required').max(200),
  message: z.string().trim().min(1, 'Message is required').max(2000),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * POST /api/contact/submit
 * Submit a contact form
 */
router.post(
  '/submit',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Validate request body
    let validatedData: ContactFormData;
    try {
      validatedData = contactFormSchema.parse(req.body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.reduce((acc: Record<string, string>, err: any) => {
          acc[err.path.join('.')] = err.message;
          return acc;
        }, {} as Record<string, string>);
        
        const response: ApiResponse<null> = {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            details: JSON.stringify(fieldErrors),
          },
          timestamp: new Date(),
        };
        res.status(400).json(response);
        return;
      }
      throw error;
    }

    // Submit contact form
    const result = await contactService.submitContactForm(validatedData);

    const response: ApiResponse<{ id: string; message: string }> = {
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: result.id,
        message: 'We will get back to you within 24 hours.',
      },
      timestamp: new Date(),
    };

    res.status(201).json(response);
  })
);

/**
 * GET /api/contact/:id
 * Get contact form submission status
 */
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const contact = await contactService.getContactById(id);

    const response: ApiResponse<any> = {
      success: true,
      data: contact,
      timestamp: new Date(),
    };

    res.json(response);
  })
);

/**
 * GET /api/contact
 * Get all contact submissions (admin only - no auth required for demo)
 */
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await contactService.listContacts(page, limit);

    const response: ApiResponse<any> = {
      success: true,
      data: result,
      timestamp: new Date(),
    };

    res.json(response);
  })
);

export default router;
