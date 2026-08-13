export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Molecule ID is required' },
        { status: 400 }
      );
    }

    const molecule = await prisma.molecule.findUnique({
      where: { id },
    });

    if (!molecule) {
      return NextResponse.json(
        { error: 'Molecule not found' },
        { status: 404 }
      );
    }

    await prisma.molecule.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Molecule deleted successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete Molecule Error:', error);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}