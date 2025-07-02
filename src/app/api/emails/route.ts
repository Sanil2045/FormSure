// app/api/emails/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const emails = [
    { email: "ivan@example.com", status: "Подтверждён" },
    { email: "maria@example.com", status: "Ожидает" },
  ];

  return NextResponse.json(emails);
}