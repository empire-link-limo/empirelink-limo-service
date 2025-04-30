// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Extended form data type to include the reCAPTCHA token
type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  notificationEmail?: string;
  recaptchaToken: string; // Added for reCAPTCHA
};

// Function to verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not defined');
      return false;
    }
    
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });
    
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

// POST handler for the contact form
export async function POST(request: Request) {
  try {
    // Parse the request body
    const data: ContactFormData = await request.json();
    
    // Debug logging
    console.log('Form submission received with fields:', Object.keys(data));
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    // Validate reCAPTCHA token
    if (!data.recaptchaToken) {
      return NextResponse.json(
        { error: 'CAPTCHA verification is required' },
        { status: 400 }
      );
    }
    
    // Verify the reCAPTCHA token
    const isValidCaptcha = await verifyRecaptcha(data.recaptchaToken);
    
    if (!isValidCaptcha) {
      return NextResponse.json(
        { error: 'CAPTCHA verification failed' },
        { status: 400 }
      );
    }

    // Log successful verification
    console.log('reCAPTCHA verification successful');

    // Configure email transport
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
      secure: process.env.EMAIL_SERVER_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });
    
    // Continue to use the environment variable for the recipient
    // This maintains our fix from before
    const toEmail = process.env.DEFAULT_CONTACT_EMAIL || 'contact@empirelinklimo.com';
    console.log('Sending email to:', toEmail);

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'empirelinklimousine@gmail.com',
      to: toEmail,
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // Return error response
    return NextResponse.json(
      { error: 'Failed to process contact form submission' },
      { status: 500 }
    );
  }
}