import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // Cleanup existing data
    await prisma.expense.deleteMany();
    await prisma.goal.deleteMany();
    await prisma.schemeApplication.deleteMany();
    await prisma.scheme.deleteMany();
    await prisma.userPreferences.deleteMany();
    await prisma.user.deleteMany();

    // Create User
    const hashedPassword = await bcrypt.hash('password123', 12);
    const user = await prisma.user.create({
        data: {
            email: 'rahul@example.com',
            name: 'Rahul Kumar',
            password: hashedPassword,
            language: 'en',
            age: 28,
            monthlyIncome: 45000,
            occupation: 'Software Engineer',
            location: 'Bangalore',
            preferences: {
                create: {
                    currency: 'INR',
                    notifications: true,
                    darkMode: false,
                },
            },
        },
    });

    console.log(`👤 Created user: ${user.name}`);

    // Create Goals
    await prisma.goal.createMany({
        data: [
            {
                userId: user.id,
                name: 'New Bike',
                targetAmount: 120000,
                savedAmount: 35000,
                category: 'Personal',
                icon: '🏍️',
                color: '#FF6B6B',
                deadline: new Date('2024-12-31'),
            },
            {
                userId: user.id,
                name: 'Emergency Fund',
                targetAmount: 100000,
                savedAmount: 80000,
                category: 'Emergency',
                icon: '🛡️',
                color: '#4ECDC4',
            },
            {
                userId: user.id,
                name: 'Diwali Trip',
                targetAmount: 50000,
                savedAmount: 10000,
                category: 'Travel',
                icon: '✈️',
                color: '#FFE66D',
            },
        ],
    });
    console.log('🎯 Created goals');

    // Create Expenses
    await prisma.expense.createMany({
        data: [
            {
                userId: user.id,
                amount: 1200,
                category: 'Food',
                description: 'Grocery shopping',
                date: new Date(),
                icon: '🛒',
            },
            {
                userId: user.id,
                amount: 500,
                category: 'Transport',
                description: 'Uber ride',
                date: new Date(Date.now() - 86400000), // Yesterday
                icon: '🚗',
            },
            {
                userId: user.id,
                amount: 15000,
                category: 'Rent',
                description: 'Monthly Rent',
                date: new Date(Date.now() - 86400000 * 5), // 5 days ago
                icon: '🏠',
            },
        ],
    });
    console.log('💸 Created expenses');

    // Create Schemes
    await prisma.scheme.createMany({
        data: [
            {
                title: 'PM Kisan Samman Nidhi',
                description: 'Financial support of ₹6,000 per year for farmers.',
                category: 'Farmers',
                benefits: ['₹6,000 per year', 'Direct Bank Transfer'],
                eligibility: { criteria: ['Landholding farmer families'] },
                documents: ['Aadhaar', 'Land records', 'Bank account'],
                department: 'Ministry of Agriculture',
                isActive: true,
            },
            {
                title: 'Sukanya Samriddhi Yojana',
                description: 'Small savings scheme for the girl child with high interest rates.',
                category: 'Women',
                benefits: ['8.2% Interest', 'Tax benefits under 80C'],
                eligibility: { criteria: ['Girl child below 10 years'] },
                documents: ['Birth certificate', 'ID proof of guardian'],
                department: 'Ministry of Finance',
                isActive: true,
            },
        ],
    });
    console.log('📜 Created schemes');

    console.log('✅ Seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
