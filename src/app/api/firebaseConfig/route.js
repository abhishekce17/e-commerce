import { firebaseConfig } from "@/config/firebase-config";
import { NextResponse } from "next/server";
export async function GET() {
    return NextResponse.json({ status: 200, firebaseConfig });
}
