import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET all expenses for current user
export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const category = searchParams.get('category');

        const expenses = await prisma.expense.findMany({
            where: {
                userId: session.user.id,
                ...(startDate && endDate && {
                    date: {
                        gte: new Date(startDate),
                        lte: new Date(endDate),
                    },
                }),
                ...(category && { category }),
            },
            orderBy: { date: 'desc' },
        });

        return NextResponse.json({ expenses });
    } catch (error) {
        console.error('Error fetching expenses:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST create new expense
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { amount, category, description, icon, date, isRecurring } = body;

        if (!amount || !category) {
            return NextResponse.json(
                { error: 'Amount and category are required' },
                { status: 400 }
            );
        }

        const expense = await prisma.expense.create({
            data: {
                userId: session.user.id,
                amount: parseInt(amount),
                category,
                description: description || null,
                icon: icon || '💸',
                date: date ? new Date(date) : new Date(),
                isRecurring: isRecurring || false,
            },
        });

        return NextResponse.json({ expense }, { status: 201 });
    } catch (error) {
        console.error('Error creating expense:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE expense
export async function DELETE(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Expense ID is required' }, { status: 400 });
        }

        // Verify expense belongs to user
        const expense = await prisma.expense.findUnique({
            where: { id },
        });

        if (!expense || expense.userId !== session.user.id) {
            return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
        }

        await prisma.expense.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
