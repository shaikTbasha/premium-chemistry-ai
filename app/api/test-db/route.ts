import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();
console.log("SERVER CLERK USER:", userId);

    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      success: true,
      database: "connected",
      clerk: userId ? "authenticated" : "not-authenticated",
      userId: userId ?? null,
    });
  } catch (error) {
    console.error("Test error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Test failed",
      },
      { status: 500 }
    );
  }
}