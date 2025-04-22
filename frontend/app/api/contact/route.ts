// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { getStrapiURL } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Submit to Strapi
    const response = await fetch(`${getStrapiURL('/api/contacts')}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({ data: body }),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Error submitting form" },
      { status: 500 }
    );
  }
}