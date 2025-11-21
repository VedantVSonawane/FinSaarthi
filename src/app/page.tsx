'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import styles from './landing.module.css';

export default function LandingPage() {
    const { data: session } = useSession();

    if (session) {
        redirect('/dashboard');
    }

    return (
        <div className={styles.page}>
            {/* Minimal Navbar */}
            <nav className={styles.nav}>
                <div className="container flex justify-between items-center">
                    <div className={styles.logo}>
                        <span className={styles.logoIcon}>💰</span>
                        <span className={styles.logoText}>FinSaarthi</span>
                    </div>
                    <div className={styles.navLinks}>
                        <Link href="/calculators" className={styles.loginLink}>Tools</Link>
                        <Link href="/auth/login" className={styles.loginLink}>Log In</Link>
                        <Link href="/auth/signup" className={styles.signupBtn}>
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className={styles.main}>
                <div className={styles.heroContainer}>
                    <div className={styles.heroContent}>
                        <span className={styles.badge}>🇮🇳 Bharat&apos;s Financial Companion</span>
                        <h1 className={styles.title}>
                            Master Your Money <br />
                            <span className={styles.gradientText}>In Your Language</span>
                        </h1>
                        <p className={styles.subtitle}>
                            AI-powered financial advice, government schemes, and expense tracking.
                            Simple, smart, and secure.
                        </p>

                        <div className={styles.ctaGroup}>
                            <Link href="/auth/signup" className={styles.primaryCta}>
                                Start Your Journey
                            </Link>
                            <Link href="/about" className={styles.secondaryCta}>
                                Learn More
                            </Link>
                        </div>

                        <div className={styles.trustBadges}>
                            <span>🔒 Secure & Private</span>
                            <span>•</span>
                            <span>🗣️ Hindi & English</span>
                            <span>•</span>
                            <span>🤖 AI Powered</span>
                        </div>
                    </div>

                    {/* Abstract Visual */}
                    <div className={styles.heroVisual}>
                        <div className={styles.blob1}></div>
                        <div className={styles.blob2}></div>
                        <div className={styles.glassCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}>📈</div>
                                <div>
                                    <div className={styles.cardTitle}>Monthly Savings</div>
                                    <div className={styles.cardSubtitle}>On track</div>
                                </div>
                            </div>
                            <div className={styles.cardAmount}>₹12,500</div>
                            <div className={styles.cardGraph}>
                                <div className={styles.bar} style={{ height: '40%' }}></div>
                                <div className={styles.bar} style={{ height: '60%' }}></div>
                                <div className={styles.bar} style={{ height: '30%' }}></div>
                                <div className={styles.bar} style={{ height: '80%' }}></div>
                                <div className={styles.bar} style={{ height: '50%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
