'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './budget.module.css';

interface Goal {
    id: number;
    name: string;
    target: number;
    saved: number;
    icon: string;
    color: string;
}

interface Expense {
    id: number;
    category: string;
    amount: number;
    date: string;
    icon: string;
}

export default function BudgetPage() {
    const [goals, setGoals] = useState<Goal[]>([
        { id: 1, name: "Bike Fund", target: 80000, saved: 25000, icon: "🏍️", color: "#1A5F7A" },
        { id: 2, name: "Emergency", target: 50000, saved: 10000, icon: "🚨", color: "#2E8B57" }
    ]);

    const [expenses, setExpenses] = useState<Expense[]>([
        { id: 1, category: "Food", amount: 450, date: "Today", icon: "🍔" },
        { id: 2, category: "Transport", amount: 120, date: "Yesterday", icon: "🚌" }
    ]);

    const [activeTab, setActiveTab] = useState<'goals' | 'expenses'>('goals');
    const [showAddGoal, setShowAddGoal] = useState(false);

    // New Goal Form State
    const [newGoalName, setNewGoalName] = useState("");
    const [newGoalTarget, setNewGoalTarget] = useState(10000);

    const handleAddGoal = () => {
        if (!newGoalName) return;
        const newGoal: Goal = {
            id: Date.now(),
            name: newGoalName,
            target: newGoalTarget,
            saved: 0,
            icon: "🎯",
            color: "#FFD700"
        };
        setGoals([...goals, newGoal]);
        setShowAddGoal(false);
        setNewGoalName("");
        setNewGoalTarget(10000);
    };

    return (
        <div className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <div className="container">
                    <div className={styles.headerTop}>
                        <Link href="/" className={styles.backBtn}>← Back</Link>
                        <h1>My Money</h1>
                        <div className={styles.balanceCard}>
                            <span>Total Balance</span>
                            <h2>₹35,000</h2>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${activeTab === 'goals' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('goals')}
                        >
                            Goals 🎯
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'expenses' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('expenses')}
                        >
                            Expenses 💸
                        </button>
                    </div>
                </div>
            </header>

            <main className="container py-6">
                {activeTab === 'goals' ? (
                    <div className={styles.goalsSection}>
                        <div className={styles.sectionHeader}>
                            <h3>Your Goals</h3>
                            <button className={styles.addBtn} onClick={() => setShowAddGoal(true)}>+ New Goal</button>
                        </div>

                        <div className={styles.goalsGrid}>
                            {goals.map(goal => (
                                <div key={goal.id} className={styles.goalCard} style={{ borderTopColor: goal.color }}>
                                    <div className={styles.goalIcon}>{goal.icon}</div>
                                    <div className={styles.goalInfo}>
                                        <h4>{goal.name}</h4>
                                        <div className={styles.goalAmount}>
                                            <span>₹{goal.saved.toLocaleString()}</span>
                                            <span className={styles.target}> / ₹{goal.target.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className={styles.progressBar}>
                                        <div
                                            className={styles.progressFill}
                                            style={{ width: `${(goal.saved / goal.target) * 100}%`, backgroundColor: goal.color }}
                                        ></div>
                                    </div>
                                    <button className={styles.topUpBtn}>+ Add Money</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={styles.expensesSection}>
                        <div className={styles.sectionHeader}>
                            <h3>Recent Spending</h3>
                            <button className={styles.addBtn}>+ Add Expense</button>
                        </div>

                        <div className={styles.expenseList}>
                            {expenses.map(expense => (
                                <div key={expense.id} className={styles.expenseItem}>
                                    <div className={styles.expenseIcon}>{expense.icon}</div>
                                    <div className={styles.expenseInfo}>
                                        <h4>{expense.category}</h4>
                                        <span>{expense.date}</span>
                                    </div>
                                    <span className={styles.expenseAmount}>-₹{expense.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Add Goal Modal */}
            {showAddGoal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3>Create New Goal 🎯</h3>

                        <div className={styles.inputGroup}>
                            <label>Goal Name</label>
                            <input
                                type="text"
                                placeholder="e.g. New Phone"
                                value={newGoalName}
                                onChange={(e) => setNewGoalName(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Target Amount: ₹{newGoalTarget.toLocaleString()}</label>
                            <input
                                type="range"
                                min="1000"
                                max="500000"
                                step="1000"
                                value={newGoalTarget}
                                onChange={(e) => setNewGoalTarget(Number(e.target.value))}
                                className={styles.rangeSlider}
                            />
                        </div>

                        <div className={styles.modalActions}>
                            <button className={styles.cancelBtn} onClick={() => setShowAddGoal(false)}>Cancel</button>
                            <button className={styles.saveBtn} onClick={handleAddGoal}>Create Goal</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
