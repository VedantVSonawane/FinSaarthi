'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './onboarding.module.css';

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [language, setLanguage] = useState<'en' | 'hi'>('en');
    const [profile, setProfile] = useState({
        name: '',
        age: 25,
        income: 30000,
        location: '',
        goals: [] as string[],
        confidence: 3,
        worry: ''
    });

    // Step 1: Language Selection
    const renderLanguageSelection = () => (
        <div className={`${styles.stepContainer} animate-fade-in`}>
            <div className={styles.logoContainer}>
                <span className={styles.logoIcon}>💚</span>
                <h1 className={styles.logoText}>FinSaarthi</h1>
            </div>

            <div className={styles.languageGrid}>
                <button
                    className={styles.langCard}
                    onClick={() => { setLanguage('en'); setStep(2); }}
                >
                    <span className={styles.langIcon}>🇬🇧</span>
                    <span className={styles.langTitle}>Continue in English</span>
                    <span className={styles.langSub}>English</span>
                </button>

                <button
                    className={styles.langCard}
                    onClick={() => { setLanguage('hi'); setStep(2); }}
                >
                    <span className={styles.langIcon}>🇮🇳</span>
                    <span className={styles.langTitle}>हिन्दी में जारी रखें</span>
                    <span className={styles.langSub}>Hindi</span>
                </button>
            </div>

            <div className={styles.voiceHint}>
                <span className={styles.micIcon}>🎤</span>
                <p>{language === 'en' ? 'Tap for voice assistance' : 'आवाज़ सहायता के लिए टैप करें'}</p>
            </div>
        </div>
    );

    // Step 2: Conversational Profiling
    const renderProfiling = () => {
        const questions = {
            en: {
                intro: "Namaste! I'm FinSaarthi, your financial guide. To help you best, may I ask a few quick questions?",
                name: "What should I call you?",
                age: "How old are you?",
                income: "What is your monthly income?",
                goals: "What are your financial goals?",
                next: "Next",
                finish: "Finish"
            },
            hi: {
                intro: "नमस्ते! मैं फिनसारथी हूं, आपका वित्तीय मार्गदर्शक। आपकी बेहतर मदद के लिए, क्या मैं कुछ सवाल पूछ सकता हूं?",
                name: "मैं आपको क्या कहकर बुलाऊं?",
                age: "आपकी उम्र क्या है?",
                income: "आपकी मासिक आय क्या है?",
                goals: "आपके वित्तीय लक्ष्य क्या हैं?",
                next: "अगला",
                finish: "समाप्त"
            }
        };

        const t = questions[language];

        return (
            <div className={`${styles.stepContainer} animate-fade-in`}>
                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: '50%' }}></div>
                </div>

                <div className={styles.chatInterface}>
                    <div className={styles.botMessage}>
                        <div className={styles.avatar}>🤖</div>
                        <div className={styles.bubble}>
                            <p>{t.intro}</p>
                        </div>
                    </div>

                    <div className={styles.formContainer}>
                        <div className={styles.inputGroup}>
                            <label>{t.name}</label>
                            <input
                                type="text"
                                className="input"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                placeholder="e.g. Rahul Kumar"
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>{t.age}: {profile.age}</label>
                            <input
                                type="range"
                                min="18"
                                max="80"
                                value={profile.age}
                                onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
                                className={styles.rangeSlider}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>{t.income}: ₹{profile.income.toLocaleString()}</label>
                            <input
                                type="range"
                                min="5000"
                                max="200000"
                                step="1000"
                                value={profile.income}
                                onChange={(e) => setProfile({ ...profile, income: parseInt(e.target.value) })}
                                className={styles.rangeSlider}
                            />
                        </div>

                        <div className={styles.goalsGrid}>
                            {['Save/Invest', 'Get Loan', 'Learn Basics', 'Find Govt Schemes'].map((goal) => (
                                <button
                                    key={goal}
                                    className={`${styles.goalChip} ${profile.goals.includes(goal) ? styles.selected : ''}`}
                                    onClick={() => {
                                        const newGoals = profile.goals.includes(goal)
                                            ? profile.goals.filter(g => g !== goal)
                                            : [...profile.goals, goal];
                                        setProfile({ ...profile, goals: newGoals });
                                    }}
                                >
                                    {goal}
                                </button>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary btn-lg w-full"
                            onClick={() => setStep(3)}
                            disabled={!profile.name}
                        >
                            {t.next} →
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Step 3: Financial Health Check
    const renderHealthCheck = () => {
        const content = {
            en: {
                title: "Quick Financial Check",
                confidence: "How confident are you with investments?",
                worry: "What's your biggest financial worry?",
                worries: ["Emergency Expenses", "Debt Repayment", "Children's Education", "Retirement"],
                start: "Start My Journey"
            },
            hi: {
                title: "त्वरित वित्तीय जांच",
                confidence: "निवेश को लेकर आप कितने आश्वस्त हैं?",
                worry: "आपकी सबसे बड़ी वित्तीय चिंता क्या है?",
                worries: ["आपातकालीन खर्च", "कर्ज चुकाना", "बच्चों की शिक्षा", "सेवानिवृत्ति"],
                start: "मेरी यात्रा शुरू करें"
            }
        };

        const t = content[language];

        return (
            <div className={`${styles.stepContainer} animate-fade-in`}>
                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: '90%' }}></div>
                </div>

                <h2 className="text-center mb-6">{t.title}</h2>

                <div className={styles.healthCard}>
                    <label className={styles.label}>{t.confidence}</label>
                    <div className={styles.emojiScale}>
                        {[1, 2, 3, 4, 5].map((level) => (
                            <button
                                key={level}
                                className={`${styles.emojiBtn} ${profile.confidence === level ? styles.selected : ''}`}
                                onClick={() => setProfile({ ...profile, confidence: level })}
                            >
                                {['😟', '😕', '😐', '🙂', '😎'][level - 1]}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.healthCard}>
                    <label className={styles.label}>{t.worry}</label>
                    <div className={styles.worryGrid}>
                        {t.worries.map((worry) => (
                            <button
                                key={worry}
                                className={`${styles.worryBtn} ${profile.worry === worry ? styles.selected : ''}`}
                                onClick={() => setProfile({ ...profile, worry })}
                            >
                                {worry}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    className="btn btn-primary btn-lg w-full mt-8"
                    onClick={() => router.push('/')}
                >
                    {t.start} 🚀
                </button>
            </div>
        );
    };

    return (
        <div className={styles.page}>
            <div className="container-narrow">
                {step === 1 && renderLanguageSelection()}
                {step === 2 && renderProfiling()}
                {step === 3 && renderHealthCheck()}
            </div>
        </div>
    );
}
