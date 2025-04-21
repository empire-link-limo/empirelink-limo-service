// app/api/newsletter/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getApiURL } from '@/lib/api';

export async function POST(request: NextRequest) {
  try {
    // Get email from request
    const { email } = await request.json();
    
    // Validate email
    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }
    
    // Submit to Strapi
    const response = await fetch(`${getApiURL('/newsletter-subscribers')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: { email }
      }),
    });
    
    // Check if email already exists
    if (response.status === 400) {
      const errorData = await response.json();
      if (errorData.error?.message?.includes('already exists')) {
        return NextResponse.json(
          { error: 'You are already subscribed to our newsletter' },
          { status: 400 }
        );
      }
    }
    
    if (!response.ok) {
      throw new Error('Failed to subscribe to newsletter');
    }
    
    const data = await response.json();
    
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}