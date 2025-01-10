import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        const urls = await prisma.url.findMany({
            orderBy: {
                createdAt: "desc"
            },
            take: 5 // max no of data to show
        })
        return NextResponse.json(urls)
    } catch (error) {
        console.error({error})
        return NextResponse.json({
            error: "An error occurred while fetching URLs"
        }, {status: 500})
    }
}