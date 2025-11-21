'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './signup.module.css';
import Input from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';

// Validation Schema
const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState<'en' | 'hi'>('en');

    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema)
    });

    const content = {
        en: {
            title: "Start Your Journey",
            subtitle: "Join millions building financial freedom",
            name: "Full Name",
            email: "Email",
            phone: "Phone Number (Optional)",
            password: "Password",
            confirmPassword: "Confirm Password",
            signup: "Create Account",
            haveAccount: "Already have an account?",
            login: "Log in",
            or: "OR",
            continueWithGoogle: "Sign up with Google",
        },
        hi: {
            title: "अपनी यात्रा शुरू करें",
            subtitle: "लाखों लोगों के साथ वित्तीय स्वतंत्रता बनाएं",
            name: "पूरा नाम",
            email: "ईमेल",
            phone: "फोन नंबर (वैकल्पिक)",
            password: "पासवर्ड",
            confirmPassword: "पासवर्ड की पुष्टि करें",
            signup: "खाता बनाएं",
            haveAccount: "पहले से खाता है?",
            login: "लॉग इन करें",
            or: "या",
            continueWithGoogle: "Google से साइन अप करें",
        }
    };

    const t = content[language];

    const onSubmit = async (data: SignupFormData) => {
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    phone: data.phone || null,
                    password: data.password,
                    language,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Something went wrong');
            }

            showToast('Account created successfully! 🎉', 'success');
            router.push('/onboarding');
        } catch (error: any) {
            showToast(error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                {/* Language Toggle */}
                <button
                    className={styles.langToggle}
                    onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                >
                    {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
                </button>

                {/* Logo */}
                <div className={styles.logo}>
                    <span className={styles.logoIcon}>💰</span>
                    <h1 className={styles.logoText}>FinSaarthi</h1>
                </div>

                {/* Form Card */}
                <div className={styles.card}>
                    <h2>{t.title}</h2>
                    <p className={styles.subtitle}>{t.subtitle}</p>

                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <Input
                            label={t.name}
                            placeholder="Rahul Kumar"
                            {...register('name')}
                            error={errors.name?.message}
                            disabled={isLoading}
                        />

                        <Input
                            label={t.email}
                            type="email"
                            placeholder="your@email.com"
                            {...register('email')}
                            error={errors.email?.message}
                            disabled={isLoading}
                        />

                        <Input
                            label={t.phone}
                            type="tel"
                            placeholder="+91 98765 43210"
                            {...register('phone')}
                            error={errors.phone?.message}
                            disabled={isLoading}
                        />

                        <Input
                            label={t.password}
                            type="password"
                            placeholder="••••••••"
                            {...register('password')}
                            error={errors.password?.message}
                            disabled={isLoading}
                        />

                        <Input
                            label={t.confirmPassword}
                            type="password"
                            placeholder="••••••••"
                            {...register('confirmPassword')}
                            error={errors.confirmPassword?.message}
                            disabled={isLoading}
                        />

                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={isLoading}
                        >
                            {isLoading ? '⏳ Creating...' : `${t.signup} →`}
                        </button>
                    </form>

                    <div className={styles.divider}>
                        <span>{t.or}</span>
                    </div>

                    <button className={styles.googleBtn} disabled={isLoading}>
                        🔵 {t.continueWithGoogle}
                    </button>

                    <p className={styles.loginPrompt}>
                        {t.haveAccount} <Link href="/auth/login">{t.login}</Link>
                    </p>
                </div>

                {/* Footer */}
                <p className={styles.footer}>
                    By continuing, you agree to our Terms & Privacy Policy
                </p>
            </div>
        </div>
    );
}
