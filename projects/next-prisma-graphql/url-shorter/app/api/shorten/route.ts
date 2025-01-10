import prisma from "@/lib/db";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {
    try {
        const { url } = await request.json()

        const shortCode = nanoid(8) // nanoid generates a random string(id) of length 8
        const shortenedUrl = await prisma.url.create({
            data: {
                originalUrl: url,
                shortCode,
            }
        })
    
        return NextResponse.json({
            shortCode: shortenedUrl.shortCode        
        })
    } catch (error) {
        console.log({error});
        return NextResponse.json({
            error: "An error occurred while shortening the URL"
        }, {status: 500})
    }
}