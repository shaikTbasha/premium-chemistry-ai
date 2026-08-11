export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

// GET: Fetch all saved molecules for the logged-in user
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const molecules = await prisma.molecule.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(molecules);
  } catch (error: any) {
    console.error('Fetch Molecules Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Save a new molecule
export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, smiles, formula } = body;

    const molecule = await prisma.molecule.create({
      data: {
        userId,
        name: name || 'Untitled Molecule',
        smiles: smiles || '',
        formula: formula || '',
      },
    });

    return NextResponse.json({ success: true, molecule });
  } catch (error: any) {
    console.error('Save Molecule Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}