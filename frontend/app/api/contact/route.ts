// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getApiURL } from '@/lib/api';

export async function POST(request: NextRequest) {
  try {
    // Get form data from request
    const formData = await request.json();
    
    // Validate required fields
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    // Submit to Strapi
    const response = await fetch(`${getApiURL('/contact-submissions')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: formData
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit form to Strapi');
    }
    
    const data = await response.json();
    
    // You could also add email notification logic here
    
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}