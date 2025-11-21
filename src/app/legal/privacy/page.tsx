export default function PrivacyPage() {
    return (
        <div className="prose prose-lg">
            <h1>Privacy Policy</h1>
            <p className="text-gray-600 mb-8">Last updated: November 21, 2024</p>

            <h2>1. Introduction</h2>
            <p>
                Welcome to FinSaarthi. We respect your privacy and are committed to protecting your personal data.
                This privacy policy will inform you as to how we look after your personal data when you visit our website
                and tell you about your privacy rights and how the law protects you.
            </p>

            <h2>2. Data We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
            <ul className="list-disc pl-5 mb-4">
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                <li><strong>Financial Data:</strong> includes your income range, financial goals, and expense categories (stored securely).</li>
                <li><strong>Usage Data:</strong> includes information about how you use our website and services.</li>
            </ul>

            <h2>3. How We Use Your Data</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul className="list-disc pl-5 mb-4">
                <li>To provide the AI financial advisory services you requested.</li>
                <li>To manage your account and registration.</li>
                <li>To recommend relevant government schemes based on your profile.</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost,
                used or accessed in an unauthorized way, altered or disclosed.
            </p>

            <h2>5. Contact Us</h2>
            <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
                <a href="mailto:privacy@finsaarthi.in" className="text-primary"> privacy@finsaarthi.in</a>
            </p>
        </div>
    );
}
