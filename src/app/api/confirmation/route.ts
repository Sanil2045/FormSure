import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Confirmation from "@/models/confirmation.model";
import Email from "@/models/email.model";


export async function GET(req: NextRequest) {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
        const all = await Confirmation.find();
        return NextResponse.json(all);
    }
    const found = await Confirmation.findOne({ email });

    if (!found) {
        return NextResponse.json({ message: "Не найдено" }, { status: 404 });
    }

    return NextResponse.json(found);
}
export async function POST(req: NextRequest) {
    await connectDB();
    const body = await req.json();
    const { email } = body;
    try {
        const isEmailExists = await Email.exists({ email });
        if (isEmailExists) throw new Error("Email already in database") 
        const isConfirmation = await Confirmation.exists({ email });
        if (isConfirmation) throw new Error("Email validation already in process") 
        const newEmail = new Email({ email, status: "pending" })
        await newEmail.save();
        const newConfirmation = new Confirmation({ email });
        await newConfirmation.save();

        return NextResponse.json(newEmail);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error }, { status: 400 });
        } else {
            return NextResponse.json({ error: error }, { status: 500 });
        }
    }
}

