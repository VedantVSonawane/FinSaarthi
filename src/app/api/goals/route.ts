import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET all goals for current user
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const goals = await prisma.goal.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ goals });
    } catch (error) {
        console.error('Error fetching goals:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST create new goal
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { name, targetAmount, icon, color, deadline, category } = body;

        if (!name || !targetAmount) {
            return NextResponse.json(
                { error: 'Name and target amount are required' },
                { status: 400 }
            );
        }

        const goal = await prisma.goal.create({
            data: {
                userId: session.user.id,
                name,
                targetAmount: parseInt(targetAmount),
                savedAmount: 0,
                icon: icon || '🎯',
                color: color || '#1A5F7A',
                deadline: deadline ? new Date(deadline) : null,
                category: category || null,
            },
        });

        return NextResponse.json({ goal }, { status: 201 });
    } catch (error) {
        console.error('Error creating goal:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PATCH update goal (add money or edit)
export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { id, savedAmount, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ error: 'Goal ID is required' }, { status: 400 });
        }

        // Verify goal belongs to user
        const existingGoal = await prisma.goal.findUnique({
            where: { id },
        });

        if (!existingGoal || existingGoal.userId !== session.user.id) {
            return NextResponse.json({ error: 'Goal not found' }, { status: 404 });
        }

        const goal = await prisma.goal.update({
            where: { id },
            data: {
                ...(savedAmount !== undefined && { savedAmount: parseInt(savedAmount) }),
                ...updateData,
            },
        });

        return NextResponse.json({ goal });
    } catch (error) {
        console.error('Error updating goal:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE goal
export async function DELETE(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Goal ID is required' }, { status: 400 });
        }

        // Verify goal belongs to user
        const goal = await prisma.goal.findUnique({
            where: { id },
        });

        if (!goal || goal.userId !== session.user.id) {
            return NextResponse.json({ error: 'Goal not found' }, { status: 404 });
        }

        await prisma.goal.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Goal deleted successfully' });
    } catch (error) {
        console.error('Error deleting goal:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
