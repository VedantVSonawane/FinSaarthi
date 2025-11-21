'use client';

import { useState } from 'react';
import styles from './calculators.module.css';
import Input from '@/components/ui/Input';

export default function CalculatorsPage() {
    const [activeTab, setActiveTab] = useState<'sip' | 'emi' | 'tax'>('sip');

    return (
        <div className={styles.page}>
            <div className="container">
                <h1 className={styles.title}>Financial Calculators</h1>
                <p className={styles.subtitle}>Plan your future with our smart tools</p>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'sip' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('sip')}
                    >
                        📈 SIP Calculator
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'emi' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('emi')}
                    >
                        🏠 EMI Calculator
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'tax' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('tax')}
                    >
                        💰 Tax Calculator
                    </button>
                </div>

                <div className={styles.calculatorCard}>
                    {activeTab === 'sip' && <SIPCalculator />}
                    {activeTab === 'emi' && <EMICalculator />}
                    {activeTab === 'tax' && <TaxCalculator />}
                </div>
            </div>
        </div>
    );
}

function SIPCalculator() {
    const [monthlyInvest, setMonthlyInvest] = useState(5000);
    const [years, setYears] = useState(10);
    const [rate, setRate] = useState(12);

    const calculateSIP = () => {
        const monthlyRate = rate / 12 / 100;
        const months = years * 12;
        const invested = monthlyInvest * months;
        const totalValue = monthlyInvest * ((((1 + monthlyRate) ** months) - 1) / monthlyRate) * (1 + monthlyRate);
        const returns = totalValue - invested;

        return {
            invested: Math.round(invested),
            returns: Math.round(returns),
            total: Math.round(totalValue)
        };
    };

    const result = calculateSIP();

    return (
        <div className={styles.calculatorGrid}>
            <div className={styles.inputs}>
                <h3>SIP Investment</h3>
                <div className={styles.inputGroup}>
                    <label>Monthly Investment (₹)</label>
                    <input
                        type="range" min="500" max="100000" step="500"
                        value={monthlyInvest} onChange={(e) => setMonthlyInvest(Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        value={monthlyInvest}
                        onChange={(e) => setMonthlyInvest(Number(e.target.value))}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Time Period (Years)</label>
                    <input
                        type="range" min="1" max="30" step="1"
                        value={years} onChange={(e) => setYears(Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(Number(e.target.value))}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Expected Return (%. p.a)</label>
                    <input
                        type="range" min="1" max="30" step="0.5"
                        value={rate} onChange={(e) => setRate(Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                    />
                </div>
            </div>

            <div className={styles.results}>
                <div className={styles.resultCard}>
                    <span>Invested Amount</span>
                    <strong>₹{result.invested.toLocaleString('en-IN')}</strong>
                </div>
                <div className={styles.resultCard}>
                    <span>Est. Returns</span>
                    <strong className={styles.success}>₹{result.returns.toLocaleString('en-IN')}</strong>
                </div>
                <div className={`${styles.resultCard} ${styles.totalCard}`}>
                    <span>Total Value</span>
                    <strong>₹{result.total.toLocaleString('en-IN')}</strong>
                </div>
            </div>
        </div>
    );
}

function EMICalculator() {
    const [amount, setAmount] = useState(1000000);
    const [rate, setRate] = useState(8.5);
    const [years, setYears] = useState(20);

    const calculateEMI = () => {
        const r = rate / 12 / 100;
        const n = years * 12;
        const emi = amount * r * (((1 + r) ** n) / (((1 + r) ** n) - 1));
        const totalPayment = emi * n;
        const totalInterest = totalPayment - amount;

        return {
            emi: Math.round(emi),
            interest: Math.round(totalInterest),
            total: Math.round(totalPayment)
        };
    };

    const result = calculateEMI();

    return (
        <div className={styles.calculatorGrid}>
            <div className={styles.inputs}>
                <h3>Loan EMI</h3>
                <div className={styles.inputGroup}>
                    <label>Loan Amount (₹)</label>
                    <input
                        type="range" min="10000" max="10000000" step="10000"
                        value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Interest Rate (% p.a)</label>
                    <input
                        type="range" min="1" max="20" step="0.1"
                        value={rate} onChange={(e) => setRate(Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Loan Tenure (Years)</label>
                    <input
                        type="range" min="1" max="30" step="1"
                        value={years} onChange={(e) => setYears(Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(Number(e.target.value))}
                    />
                </div>
            </div>

            <div className={styles.results}>
                <div className={`${styles.resultCard} ${styles.totalCard}`}>
                    <span>Monthly EMI</span>
                    <strong>₹{result.emi.toLocaleString('en-IN')}</strong>
                </div>
                <div className={styles.resultCard}>
                    <span>Total Interest</span>
                    <strong className={styles.danger}>₹{result.interest.toLocaleString('en-IN')}</strong>
                </div>
                <div className={styles.resultCard}>
                    <span>Total Payment</span>
                    <strong>₹{result.total.toLocaleString('en-IN')}</strong>
                </div>
            </div>
        </div>
    );
}

function TaxCalculator() {
    const [income, setIncome] = useState(800000);
    const [regime, setRegime] = useState<'new' | 'old'>('new');

    const calculateTax = () => {
        let tax = 0;
        const standardDeduction = 50000; // Standard deduction for salaried
        const taxableIncome = Math.max(0, income - standardDeduction);

        if (regime === 'new') {
            // New Regime (FY 2023-24 slabs simplified)
            if (taxableIncome <= 300000) tax = 0;
            else if (taxableIncome <= 600000) tax = (taxableIncome - 300000) * 0.05;
            else if (taxableIncome <= 900000) tax = 15000 + (taxableIncome - 600000) * 0.10;
            else if (taxableIncome <= 1200000) tax = 45000 + (taxableIncome - 900000) * 0.15;
            else if (taxableIncome <= 1500000) tax = 90000 + (taxableIncome - 1200000) * 0.20;
            else tax = 150000 + (taxableIncome - 1500000) * 0.30;

            // Rebate u/s 87A for income up to 7L in new regime
            if (taxableIncome <= 700000) tax = 0;
        } else {
            // Old Regime (Simplified)
            if (taxableIncome <= 250000) tax = 0;
            else if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
            else if (taxableIncome <= 1000000) tax = 12500 + (taxableIncome - 500000) * 0.20;
            else tax = 112500 + (taxableIncome - 1000000) * 0.30;

            // Rebate u/s 87A for income up to 5L in old regime
            if (taxableIncome <= 500000) tax = 0;
        }

        // Cess 4%
        const cess = tax * 0.04;
        return Math.round(tax + cess);
    };

    return (
        <div className={styles.calculatorGrid}>
            <div className={styles.inputs}>
                <h3>Income Tax Estimator</h3>
                <div className={styles.regimeToggle}>
                    <button
                        className={regime === 'new' ? styles.activeRegime : ''}
                        onClick={() => setRegime('new')}
                    >
                        New Regime
                    </button>
                    <button
                        className={regime === 'old' ? styles.activeRegime : ''}
                        onClick={() => setRegime('old')}
                    >
                        Old Regime
                    </button>
                </div>

                <div className={styles.inputGroup}>
                    <label>Annual Income (₹)</label>
                    <input
                        type="range" min="300000" max="5000000" step="50000"
                        value={income} onChange={(e) => setIncome(Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(Number(e.target.value))}
                    />
                </div>
                <p className={styles.note}>*Includes Standard Deduction of ₹50,000</p>
            </div>

            <div className={styles.results}>
                <div className={`${styles.resultCard} ${styles.totalCard}`}>
                    <span>Estimated Tax</span>
                    <strong>₹{calculateTax().toLocaleString('en-IN')}</strong>
                </div>
                <div className={styles.resultCard}>
                    <span>Effective Tax Rate</span>
                    <strong>{((calculateTax() / income) * 100).toFixed(1)}%</strong>
                </div>
            </div>
        </div>
    );
}
