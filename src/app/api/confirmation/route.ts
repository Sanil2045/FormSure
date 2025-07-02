import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Confirmation from "@/models/confirmation.model";


export async function GET(req: NextRequest) {
    await connectDB();
    const confirmations = await Confirmation.find({});
    return NextResponse.json(confirmations);
}
export async function POST(req: NextRequest) {
    await connectDB();
    const body = await req.json();
    const { email } = body;
    try {
        const newConfirmation = new Confirmation({ email });
        await newConfirmation.save();
        return NextResponse.json(newConfirmation);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error }, { status: 400 });
        } else {
            return NextResponse.json({ error: error }, { status: 500 });
        }
    }
}