'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './login.module.css';
import Input from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                showToast('Invalid credentials', 'error');
            } else {
                showToast('Welcome back!', 'success');
                router.push('/dashboard');
                router.refresh();
            }
        } catch (error) {
            showToast('Something went wrong', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                {/* Left Side - Visual */}
                <div className={styles.visualSide}>
                    <div className={styles.visualContent}>
                        <div className={styles.logo}>💰 FinSaarthi</div>
                        <h1 className={styles.visualTitle}>
                            Your Journey to <br /> Financial Freedom
                        </h1>
                        <p className={styles.visualText}>
                            Join thousands of Indians mastering their money with AI-powered advice.
                        </p>
                    </div>
                    <div className={styles.blob}></div>
                </div>

                {/* Right Side - Form */}
                <div className={styles.formSide}>
                    <div className={styles.formContainer}>
                        <div className={styles.header}>
                            <h2>Welcome Back</h2>
                            <p>Please enter your details to sign in.</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="name@example.com"
                                {...register('email')}
                                error={errors.email?.message}
                                disabled={isLoading}
                            />

                            <div className={styles.passwordGroup}>
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                                    {...register('password')}
                                    error={errors.password?.message}
                                    disabled={isLoading}
                                />
                                <Link href="/auth/forgot-password" className={styles.forgotLink}>
                                    Forgot?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className={styles.submitBtn}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>

                        <div className={styles.divider}>
                            <span>or continue with</span>
                        </div>

                        <button className={styles.googleBtn} type="button">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" />
                            Google
                        </button>

                        <p className={styles.footer}>
                            Don't have an account? <Link href="/auth/signup">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
