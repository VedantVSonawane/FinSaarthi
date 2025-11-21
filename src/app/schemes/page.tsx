'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './schemes.module.css';

interface Scheme {
    id: number;
    title: string;
    category: string;
    matchScore: number;
    benefits: string[];
    description: string;
    deadline?: string;
}

const SCHEMES_DATA: Scheme[] = [
    {
        id: 1,
        title: "PM Kisan Samman Nidhi",
        category: "Farmers",
        matchScore: 95,
        benefits: ["₹6,000 per year", "Direct Bank Transfer", "No middlemen"],
        description: "Financial support for landholding farmer families.",
        deadline: "Apply by Dec 31"
    },
    {
        id: 2,
        title: "Sukanya Samriddhi Yojana",
        category: "Women",
        matchScore: 88,
        benefits: ["8.2% Interest Rate", "Tax Free Returns", "Girl Child Future"],
        description: "Small savings scheme for the girl child.",
    },
    {
        id: 3,
        title: "Mudra Loan - Shishu",
        category: "Business",
        matchScore: 75,
        benefits: ["Loan up to ₹50,000", "No Collateral", "Low Interest"],
        description: "Support for small business owners and startups.",
    },
    {
        id: 4,
        title: "National Scholarship Portal",
        category: "Students",
        matchScore: 92,
        benefits: ["Tuition Fee Waiver", "Maintenance Allowance", "Digital Access"],
        description: "Scholarships for meritorious students.",
        deadline: "Closing Soon"
    }
];

const CATEGORIES = ["All", "Farmers", "Women", "Students", "Business"];

export default function SchemesPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [compareList, setCompareList] = useState<number[]>([]);

    const filteredSchemes = SCHEMES_DATA.filter(scheme => {
        const matchesCategory = activeCategory === "All" || scheme.category === activeCategory;
        const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleCompare = (id: number) => {
        if (compareList.includes(id)) {
            setCompareList(prev => prev.filter(item => item !== id));
        } else {
            if (compareList.length < 2) {
                setCompareList(prev => [...prev, id]);
            } else {
                alert("You can only compare 2 schemes at a time.");
            }
        }
    };

    return (
        <div className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <div className="container">
                    <div className={styles.headerTop}>
                        <Link href="/" className={styles.backBtn}>← Back</Link>
                        <h1>Government Schemes</h1>
                        <div className={styles.profileIcon}>👤</div>
                    </div>

                    {/* Search & Filter */}
                    <div className={styles.controls}>
                        <input
                            type="text"
                            placeholder="Search schemes (e.g. 'loan', 'kisan')..."
                            className={styles.searchBar}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className={styles.categories}>
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    className={`${styles.catChip} ${activeCategory === cat ? styles.activeCat : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* Schemes Grid */}
            <main className="container py-6">
                <div className={styles.schemesGrid}>
                    {filteredSchemes.map(scheme => (
                        <div key={scheme.id} className={styles.schemeCard}>
                            <div className={styles.cardHeader}>
                                <span className={styles.categoryTag}>{scheme.category}</span>
                                <div className={styles.matchBadge}>
                                    <span className={styles.matchScore}>{scheme.matchScore}%</span> Match
                                </div>
                            </div>

                            <h3 className={styles.cardTitle}>{scheme.title}</h3>
                            <p className={styles.cardDesc}>{scheme.description}</p>

                            <ul className={styles.benefitsList}>
                                {scheme.benefits.map((benefit, idx) => (
                                    <li key={idx}>✓ {benefit}</li>
                                ))}
                            </ul>

                            {scheme.deadline && (
                                <div className={styles.deadline}>
                                    ⏳ {scheme.deadline}
                                </div>
                            )}

                            <div className={styles.cardActions}>
                                <button
                                    className={`${styles.compareBtn} ${compareList.includes(scheme.id) ? styles.comparing : ''}`}
                                    onClick={() => toggleCompare(scheme.id)}
                                >
                                    {compareList.includes(scheme.id) ? '✓ Added' : '+ Compare'}
                                </button>
                                <button className={styles.applyBtn}>Check Eligibility →</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Comparison Floating Bar */}
            {compareList.length > 0 && (
                <div className={styles.compareBar}>
                    <div className="container flex justify-between items-center">
                        <span>Comparing {compareList.length} schemes</span>
                        <div className="flex gap-3">
                            <button className={styles.clearBtn} onClick={() => setCompareList([])}>Clear</button>
                            <button className={styles.viewCompareBtn} disabled={compareList.length < 2}>
                                Compare Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
