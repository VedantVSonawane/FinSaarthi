import Link from 'next/link';
import styles from './about.module.css';

export default function AboutPage() {
    return (
        <div className={styles.page}>
            <nav className={styles.nav}>
                <div className="container flex justify-between items-center">
                    <Link href="/" className={styles.logo}>FinSaarthi</Link>
                    <Link href="/" className={styles.backLink}>← Back to Home</Link>
                </div>
            </nav>

            <main className="container py-12">
                <div className={styles.hero}>
                    <h1>Empowering Bharat with Financial Freedom</h1>
                    <p className={styles.subtitle}>
                        We are on a mission to democratize financial literacy and access to government schemes for 500 million Indians.
                    </p>
                </div>

                <div className={styles.content}>
                    <section className={styles.section}>
                        <h2>Our Story</h2>
                        <p>
                            FinSaarthi was born from a simple observation: while financial products are exploding in India,
                            financial literacy remains low, especially in Tier 2 and Tier 3 cities. Millions of Indians miss out
                            on government benefits simply because they don't know they exist or how to apply.
                        </p>
                        <p>
                            We built FinSaarthi to bridge this gap using the power of AI and vernacular languages.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>Our Mission</h2>
                        <div className={styles.grid}>
                            <div className={styles.card}>
                                <h3>📚 Educate</h3>
                                <p>Simplify complex financial concepts into easy-to-understand language.</p>
                            </div>
                            <div className={styles.card}>
                                <h3>🤝 Connect</h3>
                                <p>Connect citizens with the government schemes they are eligible for.</p>
                            </div>
                            <div className={styles.card}>
                                <h3>💡 Empower</h3>
                                <p>Help families build wealth and financial security for generations.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
