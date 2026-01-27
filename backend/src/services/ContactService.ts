import { prisma } from '../config/database.js';
import { nanoid } from 'nanoid';

export interface ContactFormSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  createdAt: Date;
  updatedAt: Date;
}

export class ContactService {
  /**
   * Submit a contact form
   */
  async submitContactForm(data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
  }): Promise<{ id: string }> {
    const contact = await prisma.contact.create({
      data: {
        id: nanoid(),
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        company: data.company || '',
        subject: data.subject,
        message: data.message,
        status: 'new',
      },
    });

    // TODO: Send email notification to admin
    // await emailService.sendAdminNotification(contact);

    // TODO: Send confirmation email to user
    // await emailService.sendConfirmationEmail(contact.email);

    return { id: contact.id };
  }

  /**
   * Get contact submission by ID
   */
  async getContactById(id: string): Promise<ContactFormSubmission | null> {
    const contact = await prisma.contact.findUnique({
      where: { id },
    });

    if (contact) {
      // Mark as read
      await prisma.contact.update({
        where: { id },
        data: { status: 'read' },
      });
    }

    return contact as ContactFormSubmission | null;
  }

  /**
   * List all contact submissions with pagination
   */
  async listContacts(
    page: number = 1,
    limit: number = 10
  ): Promise<{
    contacts: ContactFormSubmission[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  }> {
    const skip = (page - 1) * limit;

    const contacts = await prisma.contact.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.contact.count();

    return {
      contacts: contacts as ContactFormSubmission[],
      total,
      page,
      limit,
      hasMore: skip + limit < total,
    };
  }

  /**
   * Update contact status
   */
  async updateContactStatus(
    id: string,
    status: 'new' | 'read' | 'responded'
  ): Promise<ContactFormSubmission> {
    const contact = await prisma.contact.update({
      where: { id },
      data: { status },
    });

    return contact as ContactFormSubmission;
  }

  /**
   * Delete contact submission
   */
  async deleteContact(id: string): Promise<void> {
    await prisma.contact.delete({
      where: { id },
    });
  }

  /**
   * Search contacts
   */
  async searchContacts(query: string): Promise<ContactFormSubmission[]> {
    const contacts = await prisma.contact.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { subject: { contains: query, mode: 'insensitive' } },
          { message: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });

    return contacts as ContactFormSubmission[];
  }
}

export const contactService = new ContactService();
