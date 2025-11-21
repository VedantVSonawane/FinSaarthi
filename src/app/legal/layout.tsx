import Link from 'next/link';

export default function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white">
            <nav className="border-b border-gray-100 py-4">
                <div className="container flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold text-primary">FinSaarthi</Link>
                    <Link href="/" className="text-gray-600 hover:text-primary">← Back to Home</Link>
                </div>
            </nav>
            <main className="container py-12 max-w-3xl">
                {children}
            </main>
            <footer className="border-t border-gray-100 py-8 mt-12 text-center text-gray-500 text-sm">
                © 2024 FinSaarthi. All rights reserved.
            </footer>
        </div>
    );
}
