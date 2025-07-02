import { NextResponse } from 'next/server';
import {connectDB} from "@/lib/mongodb";
import Email from '@/models/email.model';


export async function GET() {
    await connectDB();
    const emails = await Email.find({});
    return NextResponse.json(emails);
}