import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const topicId = searchParams.get("topicId");

  try {
    if (topicId) {
      const questions = await prisma.previousYearQuestion.findMany({
        where: { topicId },
        include: { topic: true },
      });
      return NextResponse.json({ success: true, data: questions });
    }

    const topics = await prisma.chemistryTopic.findMany({
      include: {
        _count: { select: { questions: true } },
      },
    });

    return NextResponse.json({ success: true, data: topics });
  } catch (error) {
    console.error("Error fetching topic-wise PYQs:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}