'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './error.module.css';

function ErrorContent() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.icon}>⚠️</div>
                <h1 className={styles.title}>Authentication Error</h1>
                <p className={styles.message}>
                    {error === 'Configuration' && "There is a problem with the server configuration."}
                    {error === 'AccessDenied' && "You do not have permission to sign in."}
                    {error === 'Verification' && "The sign in link is no longer valid."}
                    {!error && "An unknown error occurred."}
                </p>
                <Link href="/auth/login" className={styles.button}>
                    Back to Login
                </Link>
            </div>
        </div>
    );
}

export default function AuthErrorPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ErrorContent />
        </Suspense>
    );
}
