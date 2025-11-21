'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './dashboard.module.css';
import Skeleton from '@/components/ui/Skeleton';

interface Goal {
    id: string;
    name: string;
    targetAmount: number;
    savedAmount: number;
    icon: string;
    color: string;
}

interface Expense {
    id: string;
    amount: number;
    category: string;
    description: string;
    date: string;
    icon: string;
}

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [goals, setGoals] = useState<Goal[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login');
        }
    }, [status, router]);

    useEffect(() => {
        if (session?.user) {
            fetchData();
        }
    }, [session]);

    const fetchData = async () => {
        try {
            const [goalsRes, expensesRes] = await Promise.all([
                fetch('/api/goals'),
                fetch('/api/expenses'),
            ]);

            if (goalsRes.ok) {
                const goalsData = await goalsRes.json();
                setGoals(goalsData.goals || []);
            }

            if (expensesRes.ok) {
                const expensesData = await expensesRes.json();
                setExpenses((expensesData.expenses || []).slice(0, 5));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (status === 'loading' || loading) {
        return (
            <div className={styles.loadingContainer}>
                <Skeleton width="100%" height="200px" />
                <Skeleton width="100%" height="300px" />
            </div>
        );
    }

    if (!session) {
        return null;
    }

    const userName = session.user?.name?.split(' ')[0] || 'User';
    const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
    const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
    const monthlyExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div>
                        <h1 className={styles.greeting}>Welcome back, {userName}! 👋</h1>
                        <p className={styles.subtitle}>Here&apos;s your financial overview</p>
                    </div>
                    <Link href="/auth/login" className={styles.logoutBtn}>
                        Logout
                    </Link>
                </div>
            </header>

            <main className={styles.main}>
                {/* Stats Overview */}
                <section className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>💰</div>
                        <div className={styles.statContent}>
                            <span className={styles.statLabel}>Total Saved</span>
                            <span className={styles.statValue}>₹{totalSaved.toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>🎯</div>
                        <div className={styles.statContent}>
                            <span className={styles.statLabel}>Active Goals</span>
                            <span className={styles.statValue}>{goals.length}</span>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>💸</div>
                        <div className={styles.statContent}>
                            <span className={styles.statLabel}>This Month</span>
                            <span className={styles.statValue}>₹{monthlyExpenses.toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>📈</div>
                        <div className={styles.statContent}>
                            <span className={styles.statLabel}>Progress</span>
                            <span className={styles.statValue}>
                                {totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0}%
                            </span>
                        </div>
                    </div>
                </section>

                {/* Quick Actions */}
                <section className={styles.quickActions}>
                    <Link href="/budget" className={styles.actionCard}>
                        <span className={styles.actionIcon}>📊</span>
                        <span className={styles.actionText}>Manage Budget</span>
                    </Link>
                    <Link href="/schemes" className={styles.actionCard}>
                        <span className={styles.actionIcon}>🎯</span>
                        <span className={styles.actionText}>Find Schemes</span>
                    </Link>
                    <Link href="/chat" className={styles.actionCard}>
                        <span className={styles.actionIcon}>💬</span>
                        <span className={styles.actionText}>AI Advisor</span>
                    </Link>
                    <Link href="/calculators" className={styles.actionCard}>
                        <span className={styles.actionIcon}>🧮</span>
                        <span className={styles.actionText}>Calculators</span>
                    </Link>
                </section>

                <div className={styles.contentGrid}>
                    {/* Goals Section */}
                    <section className={styles.goalsSection}>
                        <div className={styles.sectionHeader}>
                            <h2>Your Goals</h2>
                            <Link href="/budget" className={styles.viewAllLink}>View All →</Link>
                        </div>

                        {goals.length === 0 ? (
                            <div className={styles.emptyState}>
                                <span className={styles.emptyIcon}>🎯</span>
                                <p>No goals yet</p>
                                <Link href="/budget" className={styles.emptyBtn}>
                                    Create Your First Goal
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.goalsList}>
                                {goals.map((goal) => {
                                    const progress = Math.round((goal.savedAmount / goal.targetAmount) * 100);
                                    return (
                                        <div key={goal.id} className={styles.goalCard}>
                                            <div className={styles.goalHeader}>
                                                <span className={styles.goalIcon}>{goal.icon}</span>
                                                <div className={styles.goalInfo}>
                                                    <h3>{goal.name}</h3>
                                                    <p className={styles.goalAmount}>
                                                        ₹{goal.savedAmount.toLocaleString('en-IN')} / ₹{goal.targetAmount.toLocaleString('en-IN')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={styles.progressBar}>
                                                <div
                                                    className={styles.progressFill}
                                                    style={{ width: `${Math.min(progress, 100)}%`, backgroundColor: goal.color }}
                                                ></div>
                                            </div>
                                            <span className={styles.progressPercent}>{progress}% Complete</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    {/* Recent Expenses */}
                    <section className={styles.expensesSection}>
                        <div className={styles.sectionHeader}>
                            <h2>Recent Expenses</h2>
                            <Link href="/budget" className={styles.viewAllLink}>View All →</Link>
                        </div>

                        {expenses.length === 0 ? (
                            <div className={styles.emptyState}>
                                <span className={styles.emptyIcon}>💸</span>
                                <p>No expenses tracked</p>
                                <Link href="/budget" className={styles.emptyBtn}>
                                    Add Expense
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.expensesList}>
                                {expenses.map((expense) => (
                                    <div key={expense.id} className={styles.expenseItem}>
                                        <span className={styles.expenseIcon}>{expense.icon}</span>
                                        <div className={styles.expenseDetails}>
                                            <span className={styles.expenseCategory}>{expense.description || expense.category}</span>
                                            <span className={styles.expenseDate}>
                                                {new Date(expense.date).toLocaleDateString('en-IN', {
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        <span className={styles.expenseAmount}>-₹{expense.amount.toLocaleString('en-IN')}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}
