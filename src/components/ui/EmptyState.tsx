import Link from 'next/link';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: string;
    actionLabel?: string;
    actionLink?: string;
    onAction?: () => void;
}

export default function EmptyState({
    title,
    description,
    icon = '📭',
    actionLabel,
    actionLink,
    onAction
}: EmptyStateProps) {
    return (
        <div className={styles.container}>
            <div className={styles.icon}>{icon}</div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>

            {actionLabel && (
                <div className={styles.action}>
                    {actionLink ? (
                        <Link href={actionLink} className={styles.button}>
                            {actionLabel}
                        </Link>
                    ) : (
                        <button onClick={onAction} className={styles.button}>
                            {actionLabel}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
